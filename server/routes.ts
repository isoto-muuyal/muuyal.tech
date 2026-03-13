import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";
import { log } from "./vite";
import {
  appendAnalyticsEvent,
  getAnalyticsFilePath,
  getClientIp,
  getClientLocation,
  readAnalyticsCsv,
  readAnalyticsEvents,
  renderAdminHtml,
} from "./analytics";

const analyticsEventSchema = z.object({
  eventType: z.enum(["page_entered", "button_clicked", "section_visited"]),
  pagePath: z.string().min(1),
  sectionId: z.string().optional().default(""),
  buttonId: z.string().optional().default(""),
  buttonLabel: z.string().optional().default(""),
  referrer: z.string().optional().default(""),
});

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendContactNotification(payload: {
  name: string;
  email: string;
  company?: string | null;
  projectType?: string | null;
  message: string;
}) {
  const apiKey = process.env.MAILERSEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;
  const toEmail = process.env.TO_EMAIL;
  const fromName = process.env.FROM_NAME || "Website Contact";

  if (!apiKey || !fromEmail || !toEmail) {
    throw new Error("Missing MailerSend configuration");
  }

  const mailerSend = new MailerSend({ apiKey });
  const sender = new Sender(fromEmail, fromName);
  const recipients = [new Recipient(toEmail, toEmail)];
  const replyTo = new Recipient(payload.email, payload.name);

  const textBody = [
    "New contact form submission",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company || "Not provided"}`,
    `Project Type: ${payload.projectType || "Not provided"}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  const htmlBody = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(payload.company || "Not provided")}</p>
    <p><strong>Project Type:</strong> ${escapeHtml(payload.projectType || "Not provided")}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>
  `;

  const emailParams = new EmailParams()
    .setFrom(sender)
    .setTo(recipients)
    .setReplyTo(replyTo)
    .setSubject(`New Contact Form: ${payload.name}`)
    .setText(textBody)
    .setHtml(htmlBody);

  await mailerSend.email.send(emailParams);
}

function unauthorized(res: any) {
  res.set("WWW-Authenticate", 'Basic realm="Admin"');
  res.status(401).send("Authentication required");
}

function adminAuth(req: any, res: any, next: any) {
  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const path = req.path || req.originalUrl || "/admin";

  if (!adminUser || !adminPassword) {
    log(`Admin auth not configured for ${path}. Missing ADMIN_USER or ADMIN_PASSWORD.`, "auth");
    res.status(503).send("Admin credentials are not configured");
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Basic ")) {
    log(`Admin auth missing Basic header for ${path}.`, "auth");
    unauthorized(res);
    return;
  }

  const decoded = Buffer.from(authHeader.slice(6), "base64").toString("utf8");
  const separatorIndex = decoded.indexOf(":");
  const username = separatorIndex >= 0 ? decoded.slice(0, separatorIndex) : "";
  const password = separatorIndex >= 0 ? decoded.slice(separatorIndex + 1) : "";

  if (username !== adminUser || password !== adminPassword) {
    log(`Admin auth rejected invalid credentials for ${path}.`, "auth");
    unauthorized(res);
    return;
  }

  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/analytics", async (req, res) => {
    try {
      const payload = analyticsEventSchema.parse(req.body);
      await appendAnalyticsEvent({
        timestamp: new Date().toISOString(),
        eventType: payload.eventType,
        pagePath: payload.pagePath,
        sectionId: payload.sectionId,
        buttonId: payload.buttonId,
        buttonLabel: payload.buttonLabel,
        ipAddress: getClientIp(
          (req.headers["x-forwarded-for"] as string | undefined) || (req.headers["x-real-ip"] as string | undefined),
          req.socket.remoteAddress,
        ),
        location: getClientLocation(req.headers),
        userAgent: String(req.headers["user-agent"] || ""),
        referrer: payload.referrer,
      });
      res.status(204).end();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid analytics event" });
      } else {
        res.status(500).json({ success: false, message: "Failed to store analytics event" });
      }
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      await sendContactNotification(validatedData);
      res.json({ success: true, id: submission.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation failed", 
          errors: error.errors 
        });
      } else if (error instanceof Error && error.message === "Missing MailerSend configuration") {
        res.status(500).json({
          success: false,
          message: "Email service is not configured",
        });
      } else {
        console.error("Contact form submission failed:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact form" 
        });
      }
    }
  });

  // Get all contact submissions (for potential admin use)
  app.get("/api/contact-submissions", adminAuth, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch submissions" 
      });
    }
  });

  app.get("/admin", adminAuth, async (_req, res) => {
    try {
      const events = await readAnalyticsEvents();
      res.type("html").send(renderAdminHtml(events));
    } catch {
      res.status(500).send("Failed to load analytics");
    }
  });

  app.get("/admin/export", adminAuth, async (_req, res) => {
    try {
      const csv = await readAnalyticsCsv();
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="${getAnalyticsFilePath().split("/").pop()}"`);
      res.send(csv);
    } catch {
      res.status(500).send("Failed to export analytics");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

import fs from "fs";
import path from "path";
import { promisify } from "util";

const mkdir = promisify(fs.mkdir);
const appendFile = promisify(fs.appendFile);
const readFile = promisify(fs.readFile);
const access = promisify(fs.access);

export type AnalyticsEventType = "page_entered" | "button_clicked" | "section_visited";

export type AnalyticsEvent = {
  timestamp: string;
  eventType: AnalyticsEventType;
  pagePath: string;
  sectionId: string;
  buttonId: string;
  buttonLabel: string;
  ipAddress: string;
  location: string;
  userAgent: string;
  referrer: string;
};

const CSV_HEADERS = [
  "timestamp",
  "event_type",
  "page_path",
  "section_id",
  "button_id",
  "button_label",
  "ip_address",
  "location",
  "user_agent",
  "referrer",
] as const;

function csvEscape(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

function htmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function getAnalyticsFilePath() {
  return process.env.ANALYTICS_CSV_PATH || path.resolve(process.cwd(), "data", "visits.csv");
}

async function ensureAnalyticsFile() {
  const filePath = getAnalyticsFilePath();
  await mkdir(path.dirname(filePath), { recursive: true });

  try {
    await access(filePath, fs.constants.F_OK);
  } catch {
    await appendFile(filePath, `${CSV_HEADERS.join(",")}\n`, "utf8");
  }

  return filePath;
}

export async function appendAnalyticsEvent(event: AnalyticsEvent) {
  const filePath = await ensureAnalyticsFile();
  const row = [
    event.timestamp,
    event.eventType,
    event.pagePath,
    event.sectionId,
    event.buttonId,
    event.buttonLabel,
    event.ipAddress,
    event.location,
    event.userAgent,
    event.referrer,
  ]
    .map((value) => csvEscape(value || ""))
    .join(",");

  await appendFile(filePath, `${row}\n`, "utf8");
}

export async function readAnalyticsEvents(limit = 500) {
  const filePath = await ensureAnalyticsFile();
  const content = await readFile(filePath, "utf8");
  const lines = content.trim().split("\n").filter(Boolean);

  if (lines.length <= 1) {
    return [];
  }

  const rows = lines.slice(1).map(parseCsvLine);
  return rows.slice(-limit).reverse().map((row) => ({
    timestamp: row[0] || "",
    eventType: row[1] || "",
    pagePath: row[2] || "",
    sectionId: row[3] || "",
    buttonId: row[4] || "",
    buttonLabel: row[5] || "",
    ipAddress: row[6] || "",
    location: row[7] || "",
    userAgent: row[8] || "",
    referrer: row[9] || "",
  }));
}

export async function readAnalyticsCsv() {
  const filePath = await ensureAnalyticsFile();
  return readFile(filePath, "utf8");
}

export function renderAdminHtml(events: Awaited<ReturnType<typeof readAnalyticsEvents>>) {
  const rows = events
    .map(
      (event) => `
        <tr>
          <td>${htmlEscape(event.timestamp)}</td>
          <td>${htmlEscape(event.eventType)}</td>
          <td>${htmlEscape(event.pagePath)}</td>
          <td>${htmlEscape(event.sectionId)}</td>
          <td>${htmlEscape(event.buttonId)}</td>
          <td>${htmlEscape(event.buttonLabel)}</td>
          <td>${htmlEscape(event.ipAddress)}</td>
          <td>${htmlEscape(event.location)}</td>
          <td>${htmlEscape(event.referrer)}</td>
          <td>${htmlEscape(event.userAgent)}</td>
        </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>muuyal.tech Admin</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 24px; color: #111827; background: #f8fafc; }
      h1 { margin-bottom: 8px; }
      p { margin-top: 0; color: #475569; }
      a { color: #0f766e; }
      table { width: 100%; border-collapse: collapse; background: white; }
      th, td { border: 1px solid #e2e8f0; padding: 10px; text-align: left; vertical-align: top; font-size: 14px; }
      th { background: #e2e8f0; position: sticky; top: 0; }
      .wrap { overflow-x: auto; border: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <h1>Visitor Analytics</h1>
    <p>Showing the most recent ${events.length} events. <a href="/admin/export">Download CSV</a></p>
    <div class="wrap">
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Event</th>
            <th>Page</th>
            <th>Section</th>
            <th>Button Id</th>
            <th>Button Label</th>
            <th>IP</th>
            <th>Location</th>
            <th>Referrer</th>
            <th>User Agent</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </body>
</html>`;
}

export function getClientIp(forwardedFor: string | undefined, remoteAddress: string | undefined) {
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "";
  }
  return remoteAddress || "";
}

export function getClientLocation(headers: Record<string, string | string[] | undefined>) {
  const city = String(headers["x-vercel-ip-city"] || headers["x-city"] || "");
  const region = String(headers["x-vercel-ip-country-region"] || headers["x-region"] || "");
  const country =
    String(
      headers["x-vercel-ip-country"] ||
        headers["cloudfront-viewer-country"] ||
        headers["cf-ipcountry"] ||
        headers["x-country"] ||
        "",
    );

  return [city, region, country].filter(Boolean).join(", ") || "unknown";
}

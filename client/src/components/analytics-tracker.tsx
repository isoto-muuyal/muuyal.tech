import { useEffect, useMemo, useRef } from "react";
import { useLocation } from "wouter";

type AnalyticsEvent = {
  eventType: "page_entered" | "button_clicked" | "section_visited";
  pagePath: string;
  sectionId?: string;
  buttonId?: string;
  buttonLabel?: string;
  referrer?: string;
};

function postAnalytics(event: AnalyticsEvent) {
  const payload = JSON.stringify({
    ...event,
    referrer: document.referrer || "",
  });

  if (navigator.sendBeacon) {
    const blob = new Blob([payload], { type: "application/json" });
    navigator.sendBeacon("/api/analytics", blob);
    return;
  }

  void fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  });
}

function getButtonMetadata(element: HTMLElement) {
  const rawLabel =
    element.getAttribute("data-testid") ||
    element.getAttribute("aria-label") ||
    element.textContent ||
    element.id ||
    "";

  const compactLabel = rawLabel.replace(/\s+/g, " ").trim();

  return {
    buttonId: element.getAttribute("data-testid") || element.id || compactLabel,
    buttonLabel: compactLabel,
  };
}

export default function AnalyticsTracker() {
  const [location] = useLocation();
  const trackedSectionsRef = useRef<Set<string>>(new Set());
  const pagePath = useMemo(() => location || window.location.pathname, [location]);
  const isAdminPath = pagePath.startsWith("/admin");

  useEffect(() => {
    if (isAdminPath) {
      return;
    }
    trackedSectionsRef.current.clear();
    postAnalytics({
      eventType: "page_entered",
      pagePath,
    });
  }, [isAdminPath, pagePath]);

  useEffect(() => {
    if (isAdminPath) {
      return;
    }
    const sections = Array.from(document.querySelectorAll("section[id], div[id='home']"));
    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const target = entry.target as HTMLElement;
          const sectionId = target.id;
          if (!sectionId || trackedSectionsRef.current.has(sectionId)) {
            continue;
          }

          trackedSectionsRef.current.add(sectionId);
          postAnalytics({
            eventType: "section_visited",
            pagePath,
            sectionId,
          });
        }
      },
      { threshold: 0.45 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isAdminPath, pagePath]);

  useEffect(() => {
    if (isAdminPath) {
      return;
    }
    const clickHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const clickable = target?.closest("button, a, [role='button']") as HTMLElement | null;
      if (!clickable) {
        return;
      }

      const { buttonId, buttonLabel } = getButtonMetadata(clickable);
      postAnalytics({
        eventType: "button_clicked",
        pagePath,
        buttonId,
        buttonLabel,
      });
    };

    document.addEventListener("click", clickHandler, true);
    return () => document.removeEventListener("click", clickHandler, true);
  }, [isAdminPath, pagePath]);

  return null;
}

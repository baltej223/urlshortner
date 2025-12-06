"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const redirectUrl =
          window.location.protocol +
          "//" +
          window.location.hostname +
          ":" +
          window.location.port +
          "/api/getUrl" +
          window.location.pathname;

        // console.log("redirect:", redirectUrl);

        const res = await fetch(redirectUrl);
        const data = await res.json();

        // Here I can send the user data to my server, for analytics.
        await sendUserData(window.location.pathname);
        if (data.url) {
          router.push(data.url);
        } else {
          router.push("./");
        }
      } catch (error) {
        console.error("Error fetching URL:", error);
        router.push("./");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  return loading ? <p>Redirecting...</p> : null;
}

async function sendUserData(url) {
  const userData = {
    timestamp: new Date().toISOString(),
    ip: null,
    hostname: null,
    city: null,
    region: null,
    country: null,
    country_code: null,
    isp: null,
    org: null,
    key:url,
    userAgent: navigator.userAgent,
    browser: { name: "Unknown", version: "?" },
    os: { name: "Unknown", version: "?" },
    screen: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language || navigator.userLanguage || null,
    languages: navigator.languages ? Array.from(navigator.languages) : [],
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    cookieEnabled: navigator.cookieEnabled,
  };

  // ——— Browser & OS detection (sync) ———
  (function detectBrowser() {
    const ua = navigator.userAgent;
    let tem,
      M =
        ua.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i,
        ) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return { name: "IE", version: tem[1] || "" };
    }
    if (M[1] === "Chrome") {
      tem = ua.match(/\b(Edg|OPR|SamsungBrowser)\/(\d+)/i);
      if (tem != null) {
        return {
          name:
            tem[1] === "Edg"
              ? "Edge"
              : tem[1] === "OPR"
                ? "Opera"
                : "Samsung Internet",
          version: tem[2],
        };
      }
    }
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    userData.browser = {
      name: M[1] || navigator.appName || "Unknown",
      version: M[2] || "?",
    };
  })();

  (function detectOS() {
    const ua = navigator.userAgent;
    const platform = navigator.platform;

    if (/Win/i.test(platform)) {
      const v = ua.match(/Windows NT (\d+\.\d+)/);
      userData.os = { name: "Windows", version: v ? v[1] : "?" };
    } else if (/Mac/i.test(platform)) {
      const v = ua.match(/Mac OS X (\d+[._]\d+)/);
      userData.os = {
        name: "macOS",
        version: v ? v[1].replace("_", ".") : "?",
      };
    } else if (/iPhone|iPad|iPod/.test(ua)) {
      const v = ua.match(/OS (\d+[._]\d+)/);
      userData.os = { name: "iOS", version: v ? v[1].replace("_", ".") : "?" };
    } else if (/Android/.test(ua)) {
      const v = ua.match(/Android (\d+\.?\d?)/);
      userData.os = { name: "Android", version: v ? v[1] : "?" };
    } else if (/Linux/i.test(platform)) {
      userData.os = { name: "Linux", version: "?" };
    }
  })();

  // ——— Fetch IP + Geo (async, non-blocking) ———
  try {
    const res = await fetch("https://ipwho.is/");
    if (res.ok) {
      const data = await res.json();
      userData.ip = data.ip || null;
      userData.hostname = data.hostname || null;
      userData.city = data.city || null;
      userData.region = data.region || null;
      userData.country = data.country || null;
      userData.country_code = data.country_code || null;
      userData.isp = data.connection?.isp || null;
      userData.org = data.connection?.org || null;
    }
  } catch (err) {
    console.warn("IP lookup failed (blocked or down)", err);
    // All fields stay null — totally fine
  }
if (!url) return;
  // ——— SEND EVERYTHING TO YOUR BACKEND ———
  try {
    await fetch("/api/trkUsrDta", {
      // ← change this to your actual endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      keepalive: true, // CRITICAL: sends even if page is unloading
      mode: "no-cors", // optional: makes it harder to block
    });
  } catch (err) {
    // Silently fail — we don't want to annoy real users
    console.warn("Failed to send analytics", err);
  }
}

// ——— FIRE IMMEDIATELY (as early as possible) ———
sendUserData().catch(console.error);

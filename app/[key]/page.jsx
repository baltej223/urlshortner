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

        console.log("redirect:", redirectUrl);
        
        const res = await fetch(redirectUrl);
        const data = await res.json();

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
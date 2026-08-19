import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname !== "/") return;

    if (!hash || hash === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = decodeURIComponent(hash.slice(1));

    const frame = requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

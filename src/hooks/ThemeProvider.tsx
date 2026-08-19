import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { STORAGE_KEY, ThemeContext, applyTheme, getStoredTheme, getSystemTheme, type Theme } from "./theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme() ?? getSystemTheme());

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (!getStoredTheme()) {
        setTheme(getSystemTheme());
      }
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    const update = () => {
      applyTheme(nextTheme);
      localStorage.setItem(STORAGE_KEY, nextTheme);
      setTheme(nextTheme);
    };

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!document.startViewTransition || prefersReducedMotion) {
      update();
      return;
    }

    document.documentElement.dataset.themeTransition = nextTheme;
    const transition = document.startViewTransition(update);

    transition.finished.finally(() => {
      delete document.documentElement.dataset.themeTransition;
    });
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

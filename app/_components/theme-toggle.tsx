"use client";

import * as React from "react";

import { Button } from "@/registry/ui/button";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}
const isDark = () => document.documentElement.classList.contains("dark");

export function ThemeToggle() {
  const dark = React.useSyncExternalStore(subscribe, isDark, () => false);

  function toggle() {
    const next = !isDark();
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <Button variant="outline" size="sm" onClick={toggle}>
      {dark ? "Light theme" : "Dark theme"}
    </Button>
  );
}

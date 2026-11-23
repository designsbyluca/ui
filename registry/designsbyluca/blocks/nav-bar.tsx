"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/designsbyluca/ui/button";

/*
 * NavBar: the name on the left, two to four links in the middle, a link and
 * a default button on the right.
 *
 * - overMedia: over a hero photo, white text on a dark scrim.
 * - sticky: sticks to the top; with overMedia it turns solid after solidAfter px.
 * - floating: a glass bar with a hairline and a soft shadow, 12px below the
 *   top, radius-2xl. The secondary link becomes an outline button.
 * Below 900px the middle links are hidden: the page provides its own menu.
 */

interface NavLink {
  label: string;
  href?: string;
  /** Adds a + after the label (a menu opens). */
  menu?: boolean;
}

interface NavBarProps extends Omit<React.ComponentProps<"header">, "lang"> {
  brand: React.ReactNode;
  brandHref?: string;
  links?: NavLink[];
  secondary?: NavLink;
  cta?: NavLink;
  lang?: NavLink;
  overMedia?: boolean;
  sticky?: boolean;
  solidAfter?: number;
  floating?: boolean;
}

function NavBar({
  brand,
  brandHref = "/",
  links = [],
  secondary,
  cta,
  lang,
  overMedia = false,
  sticky = false,
  solidAfter = 80,
  floating = false,
  className,
  ...props
}: NavBarProps) {
  const [solid, setSolid] = React.useState(false);

  React.useEffect(() => {
    if (!(sticky && overMedia)) return;
    const update = () => setSolid(window.scrollY > solidAfter);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [sticky, overMedia, solidAfter]);

  const media = overMedia && !solid && !floating;

  return (
    <header
      data-slot="nav-bar"
      data-floating={floating || undefined}
      className={cn(
        "z-40 transition-[background-color,color,box-shadow] duration-(--dur-base) ease-standard",
        (sticky || floating) && "sticky top-0",
        overMedia && !floating && "absolute inset-x-0 top-0",
        overMedia && sticky && !floating && "fixed",
        floating ? "px-3 pt-3 md:px-5" : "",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "mx-auto flex w-full items-center gap-8",
          floating
            ? "max-w-[1400px] rounded-2xl border border-border bg-glass px-5 py-4 shadow-float backdrop-blur-xl md:px-6"
            : "max-w-[1440px] px-5 py-5 md:px-16 md:py-6",
          media && "bg-[linear-gradient(rgba(15,14,13,0.55),rgba(15,14,13,0))] text-ink-inverse",
          !media && !floating && "bg-background text-foreground",
          !media && !floating && solid && "shadow-[0_1px_0_var(--border)]"
        )}
      >
        <a href={brandHref} className="text-[16px] leading-5 font-medium tracking-[-0.02em] text-inherit no-underline">
          {brand}
        </a>

        <nav aria-label="Main" className="hidden flex-1 justify-center gap-8 min-[900px]:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href ?? "#"}
              className="text-[14px] leading-5 font-medium text-inherit underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-(--dur-fast) ease-standard hover:decoration-current"
            >
              {l.label}
              {l.menu && (
                <span aria-hidden="true" className="ml-2 font-normal">
                  +
                </span>
              )}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5 min-[900px]:ml-0">
          {lang && (
            <a
              href={lang.href ?? "#"}
              className="hidden text-[14px] leading-5 text-inherit no-underline min-[600px]:inline"
            >
              {lang.label}
            </a>
          )}
          {secondary &&
            (floating ? (
              <Button variant="outline" size="sm" href={secondary.href ?? "#"} className="hidden min-[600px]:inline-flex">
                {secondary.label}
              </Button>
            ) : (
              <a
                href={secondary.href ?? "#"}
                className="hidden text-[14px] leading-5 font-medium text-inherit underline decoration-transparent underline-offset-4 hover:decoration-current min-[600px]:inline"
              >
                {secondary.label}
              </a>
            ))}
          {cta && (
            <Button size="sm" onMedia={media} href={cta.href ?? "#"}>
              {cta.label}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export { NavBar, type NavBarProps, type NavLink };

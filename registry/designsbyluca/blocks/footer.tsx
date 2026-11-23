import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Footer: link columns, then copyright and legal links in muted-foreground.
 * Separated from the page by a border line. Pair it with
 * <Wordmark size="footer"> above for a larger close.
 */

interface FooterLink {
  label: string;
  href?: string;
}

interface FooterProps extends React.ComponentProps<"footer"> {
  brand?: React.ReactNode;
  columns?: { title: string; links: FooterLink[] }[];
  copyright?: React.ReactNode;
  legal?: FooterLink[];
}

function Footer({ brand, columns = [], copyright, legal = [], className, children, ...props }: FooterProps) {
  return (
    <footer data-slot="footer" className={cn("border-t border-border", className)} {...props}>
      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 pt-12 pb-16 md:px-16">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-8">
          {brand && <div className="text-[16px] leading-5 font-medium tracking-[-0.02em]">{brand}</div>}
          {columns.map((c) => (
            <div key={c.title}>
              <h2 className="m-0 mb-3 text-[14px] leading-5 font-medium text-muted-foreground">{c.title}</h2>
              <ul className="m-0 grid list-none gap-1 p-0">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href ?? "#"}
                      className="text-[14px] leading-6 text-foreground no-underline underline-offset-4 hover:underline"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {children}
        <div className="flex flex-wrap justify-between gap-4 text-[14px] leading-5 text-muted-foreground">
          {copyright && <span>{copyright}</span>}
          {legal.length > 0 && (
            <span className="flex flex-wrap gap-4">
              {legal.map((l) => (
                <a key={l.label} href={l.href ?? "#"} className="text-muted-foreground no-underline underline-offset-4 hover:underline">
                  {l.label}
                </a>
              ))}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}

export { Footer, type FooterProps, type FooterLink };

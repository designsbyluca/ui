import * as React from "react";
import tokens from "@/design-system/tokens.json";

import { Photo } from "@/app/_components/photo";
import { ThemeToggle } from "@/app/_components/theme-toggle";
import { ToastDemo } from "@/app/_components/toast-demo";
import { Alert, AlertDescription, AlertTitle } from "@/registry/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar";
import { Badge } from "@/registry/ui/badge";
import { Button } from "@/registry/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardMeta,
  CardTitle,
} from "@/registry/ui/card";
import { Checkbox } from "@/registry/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";
import { IconButton } from "@/registry/ui/icon-button";
import { Input } from "@/registry/ui/input";
import { Field, FieldError, FieldHint, Label, OptionRow } from "@/registry/ui/label";
import { Link } from "@/registry/ui/link";
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select";
import { Separator } from "@/registry/ui/separator";
import { Switch } from "@/registry/ui/switch";
import { Textarea } from "@/registry/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/ui/tooltip";

/* ---------- preview helpers (the export's sg-states / sg-state-label) ---------- */

function States({ min = 200, children }: { min?: number; children: React.ReactNode }) {
  return (
    <div
      className="grid items-start gap-x-8 gap-y-10 *:min-w-0"
      style={{ gridTemplateColumns: `repeat(auto-fill, minmax(min(${min}px, 100%), 1fr))` }}
    >
      {children}
    </div>
  );
}

function State({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="mb-4 block font-serif text-[12px] leading-4 tracking-[0.14em] text-muted-foreground uppercase">
        {label}
      </span>
      {children}
    </div>
  );
}

function Section({
  id,
  title,
  muted,
  children,
}: {
  id: string;
  title: string;
  muted: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-8 border-t border-border pt-16 pb-36">
      <h2
        id={`${id}-title`}
        className="m-0 mb-14 max-w-[18em] text-[40px] leading-[42px] font-[470] tracking-[-0.04em] md:text-[56px] md:leading-[56px]"
      >
        {title} <span className="text-ink-display-muted">{muted}</span>
      </h2>
      <div className="grid gap-16 *:min-w-0">{children}</div>
    </section>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return <h3 className="m-0 mb-6 text-[28px] leading-8 font-[470] tracking-[-0.025em]">{children}</h3>;
}

/* ---------- tokens ---------- */

const palette = tokens.color.tokens.filter((t) => !t.value.light.startsWith("{") && t.name !== "destructive-foreground");
const semantic = tokens.color.tokens.filter((t) => t.value.light.startsWith("{") || t.name === "destructive-foreground");
const typeStyles = tokens.type.groups.flatMap((g) => g.styles);

function Swatch({ name }: { name: string }) {
  return (
    <figure className="m-0">
      <div className="h-20 border border-border" style={{ background: `var(--${name})` }} />
      <figcaption className="mt-2 font-mono text-[12px] leading-4 text-muted-foreground">{name}</figcaption>
    </figure>
  );
}

/* ---------- icons: 18px, 1.25px square-capped stroke ---------- */

const icon = (d: string) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" aria-hidden="true">
    <path d={d} />
  </svg>
);
const PLUS = icon("M3 9h12M9 3v12");
const SHARE = icon("M7 4H4v10h10v-3M10 3h5v5M15 3L8 10");
const INFO = icon("M9 8v5M9 5.5v.5M9 16A7 7 0 1 0 9 2a7 7 0 0 0 0 14Z");

/* ---------- state helpers ---------- */

const variants = ["default", "outline", "secondary", "ghost", "destructive", "link"] as const;
const hoverClass: Record<(typeof variants)[number], string> = {
  default: "bg-primary-hover",
  outline: "border-foreground dark:bg-surface-100",
  secondary: "bg-surface-200",
  ghost: "bg-accent text-accent-foreground",
  destructive: "opacity-90",
  link: "border-b-2 pb-[3px]",
};
const labelFor = (v: (typeof variants)[number]) => (v === "destructive" ? "Delete project" : "Request a quote");
const focusClass = "outline-2 outline-offset-3 outline-ring";

const nav = [
  ["tokens", "Tokens"],
  ["button", "Button"],
  ["icon-button", "IconButton"],
  ["link", "Link"],
  ["input", "Input"],
  ["textarea", "Textarea"],
  ["select", "Select"],
  ["checkbox", "Checkbox"],
  ["radio-group", "RadioGroup"],
  ["switch", "Switch"],
  ["label", "Label"],
  ["badge", "Badge"],
  ["avatar", "Avatar"],
  ["card", "Card"],
  ["separator", "Separator"],
  ["alert", "Alert"],
  ["toast", "Toast"],
  ["tooltip", "Tooltip"],
  ["dialog", "Dialog"],
] as const;

const services = [
  ["website", "Website"],
  ["brand", "Brand"],
  ["app", "App"],
  ["care", "Care and hosting"],
] as const;

export default function Page() {
  return (
    <TooltipProvider>
      <div className="mx-auto max-w-[1296px] px-8 md:px-12">
        <header className="flex flex-wrap items-center justify-between gap-4 py-8">
          <span className="inline-flex items-center gap-3.5 font-serif text-[15px] leading-5 tracking-[0.14em] uppercase before:size-[7px] before:bg-mark before:content-['']">
            designsbyluca/ui
          </span>
          <ThemeToggle />
        </header>

        <div className="grid gap-8 pt-16 pb-36">
          <h1 className="m-0 max-w-[12em] text-[56px] leading-[56px] font-[470] tracking-[-0.04em] md:text-[120px] md:leading-[114px]">
            Quiet by default. <span className="text-ink-display-muted">Square by design.</span>
          </h1>
          <p className="m-0 max-w-[30em] text-[22px] leading-8 font-[420] tracking-[-0.01em] text-muted-foreground">
            Eighteen free components for shadcn/ui, with the tokens they stand on. Every state, light and dark.
          </p>
          <nav aria-label="Components" className="flex max-w-[56em] flex-wrap gap-x-6 gap-y-3 text-sm leading-5">
            {nav.map(([id, label]) => (
              <Link key={id} href={`#${id}`} variant="muted">
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ---------------- Tokens ---------------- */}
        <Section id="tokens" title="Tokens." muted="Warm off-white, stone, near-black and one ochre.">
          <div>
            <Sub>Base palette</Sub>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-x-4 gap-y-6">
              {palette.map((t) => (
                <Swatch key={t.name} name={t.name} />
              ))}
            </div>
          </div>
          <div>
            <Sub>shadcn/ui names and extensions</Sub>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-x-4 gap-y-6">
              {semantic.map((t) => (
                <Swatch key={t.name} name={t.name} />
              ))}
            </div>
          </div>
          <div>
            <Sub>Type</Sub>
            <div className="grid gap-10">
              {typeStyles
                .filter((s) => s.name !== "display-wordmark" && s.name !== "numeral")
                .map((s) => (
                  <div key={s.name} className="grid gap-2 border-b border-border pb-8">
                    <span className="font-mono text-[12px] leading-4 text-muted-foreground">
                      {s.name} · {s.fontSize} / {s.lineHeight}
                    </span>
                    <span
                      className={s.family === "serif" ? "font-serif" : "font-sans"}
                      style={{
                        // Large styles shrink on phones (tokens: "Mobile 56px"); ratios stay as specified.
                        fontSize: `min(${s.fontSize}, 15vw)`,
                        lineHeight: parseFloat(s.lineHeight) / parseFloat(s.fontSize),
                        fontWeight: s.fontWeight,
                        letterSpacing: `${parseFloat(s.letterSpacing) / parseFloat(s.fontSize)}em`,
                        textTransform: s.family === "serif" && s.name !== "letter" ? "uppercase" : undefined,
                      }}
                    >
                      {s.sample}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </Section>

        {/* ---------------- Button ---------------- */}
        <Section id="button" title="Button." muted="A verb as its label, 48px, square.">
          {variants.map((v) => (
            <div key={v}>
              <Sub>{v}</Sub>
              <States min={180}>
                <State label="Default">
                  <Button variant={v}>{labelFor(v)}</Button>
                </State>
                <State label="Hover">
                  <Button variant={v} className={hoverClass[v]}>
                    {labelFor(v)}
                  </Button>
                </State>
                <State label="Focus">
                  <Button variant={v} className={focusClass}>
                    {labelFor(v)}
                  </Button>
                </State>
                <State label="Disabled">
                  <Button variant={v} disabled>
                    {labelFor(v)}
                  </Button>
                </State>
              </States>
            </div>
          ))}
          <div>
            <Sub>Sizes, arrow, link</Sub>
            <States min={180}>
              <State label="Small, 44">
                <Button size="sm">View work</Button>
              </State>
              <State label="Default, 48">
                <Button>View work</Button>
              </State>
              <State label="Large, 56">
                <Button size="lg">View work</Button>
              </State>
              <State label="Arrow">
                <Button arrow>Read the case</Button>
              </State>
              <State label="As link">
                <Button href="#button" variant="outline">
                  Read the case
                </Button>
              </State>
            </States>
          </div>
          <div>
            <Sub>On media</Sub>
            <div className="relative h-80 overflow-hidden bg-surface-inverse md:h-[440px]">
              <Photo tone="dark" className="absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-4 p-8 md:p-12">
                <Button onMedia arrow>
                  Request a quote
                </Button>
                <Button onMedia variant="outline">
                  View work
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* ---------------- IconButton ---------------- */}
        <Section id="icon-button" title="IconButton." muted="One line icon, always with a name.">
          {(["outline", "ghost", "default"] as const).map((v) => (
            <div key={v}>
              <Sub>{v}</Sub>
              <States min={120}>
                <State label="Default">
                  <IconButton variant={v} aria-label="Add to request" icon={PLUS} />
                </State>
                <State label="Hover">
                  <IconButton variant={v} aria-label="Add to request" icon={PLUS} className={hoverClass[v]} />
                </State>
                <State label="Focus">
                  <IconButton variant={v} aria-label="Add to request" icon={PLUS} className={focusClass} />
                </State>
                <State label="Disabled">
                  <IconButton variant={v} aria-label="Add to request" icon={PLUS} disabled />
                </State>
                <State label="Small, 44">
                  <IconButton variant={v} size="sm" aria-label="Share" icon={SHARE} />
                </State>
              </States>
            </div>
          ))}
        </Section>

        {/* ---------------- Link ---------------- */}
        <Section id="link" title="Link." muted="A line below that thickens on hover.">
          <States min={180}>
            <State label="Default">
              <Link href="#link">View all work</Link>
            </State>
            <State label="Hover">
              <Link href="#link" className="border-b-2 pb-px">
                View all work
              </Link>
            </State>
            <State label="Focus">
              <Link href="#link" className="outline-2 outline-offset-4 outline-ring">
                View all work
              </Link>
            </State>
            <State label="Disabled">
              <Link aria-disabled="true">View all work</Link>
            </State>
            <State label="Arrow">
              <Link href="#link" arrow>
                Read the case
              </Link>
            </State>
            <State label="External">
              <Link href="https://ui.shadcn.com" external>
                shadcn/ui
              </Link>
            </State>
            <State label="Muted">
              <Link href="#link" variant="muted">
                Imprint
              </Link>
            </State>
            <State label="Muted, hover">
              <Link href="#link" variant="muted" className="border-b-current text-foreground">
                Imprint
              </Link>
            </State>
          </States>
        </Section>

        {/* ---------------- Input ---------------- */}
        <Section id="input" title="Input." muted="Lots of room and one line below.">
          {(["line", "boxed"] as const).map((variant) => {
            const boxed = variant === "boxed";
            const p = `${variant}-in`;
            return (
              <div key={variant}>
                <Sub>{boxed ? "Boxed" : "Line"}</Sub>
                <States min={240}>
                  <State label="Default">
                    <Field>
                      <Label htmlFor={`${p}-1`}>Name</Label>
                      <Input id={`${p}-1`} variant={variant} placeholder="Alex Berger" />
                    </Field>
                  </State>
                  <State label="Hover">
                    <Field>
                      <Label htmlFor={`${p}-2`}>Name</Label>
                      <Input
                        id={`${p}-2`}
                        variant={variant}
                        placeholder="Alex Berger"
                        className={boxed ? "border-input" : "border-b-foreground"}
                      />
                    </Field>
                  </State>
                  <State label="Focus">
                    <Field>
                      <Label htmlFor={`${p}-3`}>Name</Label>
                      <Input
                        id={`${p}-3`}
                        variant={variant}
                        defaultValue="Alex Berger"
                        className={boxed ? `border-foreground ${focusClass}` : "border-b-2 border-b-ring"}
                      />
                    </Field>
                  </State>
                  <State label="Disabled">
                    <Field disabled>
                      <Label htmlFor={`${p}-4`}>Name</Label>
                      <Input id={`${p}-4`} variant={variant} placeholder="Alex Berger" disabled />
                    </Field>
                  </State>
                  <State label="Error">
                    <Field>
                      <Label htmlFor={`${p}-5`}>Email</Label>
                      <Input
                        id={`${p}-5`}
                        variant={variant}
                        type="email"
                        defaultValue="alex@"
                        aria-invalid="true"
                        aria-describedby={`${p}-5-error`}
                      />
                      <FieldError id={`${p}-5-error`}>Enter a full email address.</FieldError>
                    </Field>
                  </State>
                </States>
              </div>
            );
          })}
        </Section>

        {/* ---------------- Textarea ---------------- */}
        <Section id="textarea" title="Textarea." muted="A fine frame, 144px to start.">
          <States min={300}>
            <State label="Default">
              <Field>
                <Label htmlFor="ta-1">Your project</Label>
                <Textarea id="ta-1" placeholder="A few sentences are enough." />
              </Field>
            </State>
            <State label="Hover">
              <Field>
                <Label htmlFor="ta-2">Your project</Label>
                <Textarea id="ta-2" placeholder="A few sentences are enough." className="border-input" />
              </Field>
            </State>
            <State label="Focus">
              <Field>
                <Label htmlFor="ta-3">Your project</Label>
                <Textarea
                  id="ta-3"
                  defaultValue="A new website for a physiotherapy practice in Potsdam."
                  className={`border-foreground ${focusClass}`}
                />
              </Field>
            </State>
            <State label="Disabled">
              <Field disabled>
                <Label htmlFor="ta-4">Your project</Label>
                <Textarea id="ta-4" placeholder="A few sentences are enough." disabled />
              </Field>
            </State>
            <State label="Error">
              <Field>
                <Label htmlFor="ta-5">Your project</Label>
                <Textarea id="ta-5" aria-invalid="true" aria-describedby="ta-5-error" />
                <FieldError id="ta-5-error">Tell me a little about the project.</FieldError>
              </Field>
            </State>
          </States>
        </Section>

        {/* ---------------- Select ---------------- */}
        <Section id="select" title="Select." muted="One choice from a short list.">
          {(["line", "boxed"] as const).map((variant) => {
            const p = `${variant}-sel`;
            const items = services.map(([value, label]) => (
              <SelectItem key={value} value={value} disabled={value === "app"}>
                {label}
              </SelectItem>
            ));
            return (
              <div key={variant}>
                <Sub>{variant === "boxed" ? "Boxed" : "Line"}</Sub>
                <States min={240}>
                  <State label="Placeholder">
                    <Field>
                      <Label htmlFor={`${p}-1`}>Service</Label>
                      <Select>
                        <SelectTrigger id={`${p}-1`} variant={variant}>
                          <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                        <SelectContent>{items}</SelectContent>
                      </Select>
                    </Field>
                  </State>
                  <State label="Chosen">
                    <Field>
                      <Label htmlFor={`${p}-2`}>Service</Label>
                      <Select defaultValue="website" name="service">
                        <SelectTrigger id={`${p}-2`} variant={variant}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>{items}</SelectContent>
                      </Select>
                    </Field>
                  </State>
                  <State label="Focus">
                    <Field>
                      <Label htmlFor={`${p}-3`}>Service</Label>
                      <Select defaultValue="brand">
                        <SelectTrigger
                          id={`${p}-3`}
                          variant={variant}
                          className={variant === "boxed" ? `border-foreground ${focusClass}` : "border-b-2 border-b-ring"}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>{items}</SelectContent>
                      </Select>
                    </Field>
                  </State>
                  <State label="Disabled">
                    <Field disabled>
                      <Label htmlFor={`${p}-4`}>Service</Label>
                      <Select disabled>
                        <SelectTrigger id={`${p}-4`} variant={variant}>
                          <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                        <SelectContent>{items}</SelectContent>
                      </Select>
                    </Field>
                  </State>
                  <State label="Error">
                    <Field>
                      <Label htmlFor={`${p}-5`}>Service</Label>
                      <Select>
                        <SelectTrigger id={`${p}-5`} variant={variant} aria-invalid="true" aria-describedby={`${p}-5-error`}>
                          <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                        <SelectContent>{items}</SelectContent>
                      </Select>
                      <FieldError id={`${p}-5-error`}>Choose one service.</FieldError>
                    </Field>
                  </State>
                </States>
              </div>
            );
          })}
        </Section>

        {/* ---------------- Checkbox ---------------- */}
        <Section id="checkbox" title="Checkbox." muted="A 20px square for yes or no.">
          <States min={200}>
            <State label="Unchecked">
              <OptionRow>
                <Checkbox id="cb-1" />
                <Label htmlFor="cb-1">Send me a copy</Label>
              </OptionRow>
            </State>
            <State label="Hover">
              <OptionRow>
                <Checkbox id="cb-2" className="border-muted-foreground" />
                <Label htmlFor="cb-2">Send me a copy</Label>
              </OptionRow>
            </State>
            <State label="Focus">
              <OptionRow>
                <Checkbox id="cb-3" className={focusClass} />
                <Label htmlFor="cb-3">Send me a copy</Label>
              </OptionRow>
            </State>
            <State label="Checked">
              <OptionRow>
                <Checkbox id="cb-4" defaultChecked />
                <Label htmlFor="cb-4">Send me a copy</Label>
              </OptionRow>
            </State>
            <State label="Indeterminate">
              <OptionRow>
                <Checkbox id="cb-5" checked="indeterminate" />
                <Label htmlFor="cb-5">All services</Label>
              </OptionRow>
            </State>
            <State label="Disabled">
              <OptionRow>
                <Checkbox id="cb-6" disabled />
                <Label htmlFor="cb-6" aria-disabled="true">
                  Send me a copy
                </Label>
              </OptionRow>
            </State>
            <State label="Disabled, checked">
              <OptionRow>
                <Checkbox id="cb-7" disabled defaultChecked />
                <Label htmlFor="cb-7" aria-disabled="true">
                  Send me a copy
                </Label>
              </OptionRow>
            </State>
            <State label="Error">
              <Field>
                <OptionRow>
                  <Checkbox id="cb-8" aria-invalid="true" aria-describedby="cb-8-error" />
                  <Label htmlFor="cb-8">I accept the terms</Label>
                </OptionRow>
                <FieldError id="cb-8-error">Please accept the terms.</FieldError>
              </Field>
            </State>
          </States>
        </Section>

        {/* ---------------- RadioGroup ---------------- */}
        <Section id="radio-group" title="RadioGroup." muted="Pick one: a circle with a dot.">
          <States min={220}>
            <State label="Default">
              <RadioGroup defaultValue="four" aria-label="Timeline">
                {[
                  ["two", "Two weeks"],
                  ["four", "Four weeks"],
                  ["later", "Later this year"],
                ].map(([v, l]) => (
                  <OptionRow key={v}>
                    <RadioGroupItem value={v} id={`rg-1-${v}`} />
                    <Label htmlFor={`rg-1-${v}`}>{l}</Label>
                  </OptionRow>
                ))}
              </RadioGroup>
            </State>
            <State label="Hover, focus">
              <RadioGroup defaultValue="four" aria-label="Timeline, focus example">
                <OptionRow>
                  <RadioGroupItem value="two" id="rg-2-two" className="border-muted-foreground" />
                  <Label htmlFor="rg-2-two">Two weeks</Label>
                </OptionRow>
                <OptionRow>
                  <RadioGroupItem value="four" id="rg-2-four" className={focusClass} />
                  <Label htmlFor="rg-2-four">Four weeks</Label>
                </OptionRow>
              </RadioGroup>
            </State>
            <State label="Disabled">
              <RadioGroup defaultValue="four" disabled aria-label="Timeline, disabled">
                <OptionRow>
                  <RadioGroupItem value="two" id="rg-3-two" />
                  <Label htmlFor="rg-3-two" aria-disabled="true">
                    Two weeks
                  </Label>
                </OptionRow>
                <OptionRow>
                  <RadioGroupItem value="four" id="rg-3-four" />
                  <Label htmlFor="rg-3-four" aria-disabled="true">
                    Four weeks
                  </Label>
                </OptionRow>
              </RadioGroup>
            </State>
            <State label="Error">
              <Field>
                <RadioGroup aria-label="Project size" aria-invalid="true" aria-describedby="rg-4-error">
                  <OptionRow>
                    <RadioGroupItem value="s" id="rg-4-s" />
                    <Label htmlFor="rg-4-s">One page</Label>
                  </OptionRow>
                  <OptionRow>
                    <RadioGroupItem value="m" id="rg-4-m" />
                    <Label htmlFor="rg-4-m">Several pages</Label>
                  </OptionRow>
                </RadioGroup>
                <FieldError id="rg-4-error">Choose a project size.</FieldError>
              </Field>
            </State>
            <State label="Horizontal">
              <RadioGroup defaultValue="de" orientation="horizontal" aria-label="Language">
                <OptionRow>
                  <RadioGroupItem value="de" id="rg-5-de" />
                  <Label htmlFor="rg-5-de">German</Label>
                </OptionRow>
                <OptionRow>
                  <RadioGroupItem value="en" id="rg-5-en" />
                  <Label htmlFor="rg-5-en">English</Label>
                </OptionRow>
              </RadioGroup>
            </State>
          </States>
        </Section>

        {/* ---------------- Switch ---------------- */}
        <Section id="switch" title="Switch." muted="On or off, at once.">
          <States min={200}>
            <State label="Off">
              <OptionRow>
                <Switch id="sw-1" />
                <Label htmlFor="sw-1">Email updates</Label>
              </OptionRow>
            </State>
            <State label="On">
              <OptionRow>
                <Switch id="sw-2" defaultChecked />
                <Label htmlFor="sw-2">Email updates</Label>
              </OptionRow>
            </State>
            <State label="Hover">
              <OptionRow>
                <Switch id="sw-3" className="border-muted-foreground" />
                <Label htmlFor="sw-3">Email updates</Label>
              </OptionRow>
            </State>
            <State label="Focus">
              <OptionRow>
                <Switch id="sw-4" className={focusClass} />
                <Label htmlFor="sw-4">Email updates</Label>
              </OptionRow>
            </State>
            <State label="Disabled">
              <OptionRow>
                <Switch id="sw-5" disabled />
                <Label htmlFor="sw-5" aria-disabled="true">
                  Email updates
                </Label>
              </OptionRow>
            </State>
            <State label="Disabled, on">
              <OptionRow>
                <Switch id="sw-6" disabled defaultChecked />
                <Label htmlFor="sw-6" aria-disabled="true">
                  Email updates
                </Label>
              </OptionRow>
            </State>
            <State label="Error">
              <Field>
                <OptionRow>
                  <Switch id="sw-7" aria-invalid="true" aria-describedby="sw-7-error" />
                  <Label htmlFor="sw-7">Accept cookies</Label>
                </OptionRow>
                <FieldError id="sw-7-error">Needed for the booking.</FieldError>
              </Field>
            </State>
          </States>
        </Section>

        {/* ---------------- Label ---------------- */}
        <Section id="label" title="Label." muted="The name of a control.">
          <States min={260}>
            <State label="Above an input">
              <Field>
                <Label htmlFor="lb-1">Company</Label>
                <Input id="lb-1" placeholder="Studio name" />
              </Field>
            </State>
            <State label="With hint">
              <Field>
                <Label htmlFor="lb-2">Website</Label>
                <Input id="lb-2" placeholder="example.com" aria-describedby="lb-2-hint" />
                <FieldHint id="lb-2-hint">Leave empty if you do not have one yet.</FieldHint>
              </Field>
            </State>
            <State label="Beside a control">
              <OptionRow>
                <Checkbox id="lb-3" defaultChecked />
                <Label htmlFor="lb-3">Send me a copy</Label>
              </OptionRow>
            </State>
            <State label="Disabled">
              <Field disabled>
                <Label htmlFor="lb-4">Company</Label>
                <Input id="lb-4" placeholder="Studio name" disabled />
              </Field>
            </State>
          </States>
        </Section>

        {/* ---------------- Badge ---------------- */}
        <Section id="badge" title="Badge." muted="Capitals, a fine line, sometimes the square.">
          <States min={160}>
            <State label="Default">
              <Badge>New</Badge>
            </State>
            <State label="Secondary">
              <Badge variant="secondary">Website</Badge>
            </State>
            <State label="Outline">
              <Badge variant="outline">2026</Badge>
            </State>
            <State label="Destructive">
              <Badge variant="destructive">Overdue</Badge>
            </State>
            <State label="Inverse">
              <Badge variant="inverse">Pro</Badge>
            </State>
            <State label="As link, focus">
              <Badge asChild variant="outline" className={focusClass}>
                <a href="#badge">Brand</a>
              </Badge>
            </State>
          </States>
        </Section>

        {/* ---------------- Avatar ---------------- */}
        <Section id="avatar" title="Avatar." muted="The one round element.">
          <States min={140}>
            <State label="Small, 32">
              <Avatar size="sm">
                <AvatarImage src="/avatar.svg" alt="Alex Berger" />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
            </State>
            <State label="Default, 44">
              <Avatar>
                <AvatarImage src="/avatar.svg" alt="Alex Berger" />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
            </State>
            <State label="Large, 64">
              <Avatar size="lg">
                <AvatarImage src="/avatar.svg" alt="Alex Berger" />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
            </State>
            <State label="Fallback">
              <Avatar>
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
            </State>
            <State label="Fallback, large">
              <Avatar size="lg">
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
            </State>
            <State label="Image fails">
              <Avatar>
                <AvatarImage src="/missing.jpg" alt="Mira Kessler" />
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
            </State>
          </States>
        </Section>

        {/* ---------------- Card ---------------- */}
        <Section id="card" title="Card." muted="A quiet surface, or image above and text below.">
          <States min={340}>
            <State label="Default">
              <Card>
                <CardHeader>
                  <CardTitle>A practice that feels like the room</CardTitle>
                  <CardDescription>Website and booking for a physiotherapy practice.</CardDescription>
                </CardHeader>
                <CardContent>Personal support from the first call. Online two weeks later.</CardContent>
                <CardFooter>
                  <Button variant="link" arrow>
                    Read the case
                  </Button>
                </CardFooter>
              </Card>
            </State>
            <State label="Outline, with action">
              <Card variant="outline">
                <CardHeader>
                  <CardTitle>Website</CardTitle>
                  <CardDescription>Design and build in one place.</CardDescription>
                  <CardAction>
                    <IconButton size="sm" variant="ghost" aria-label="Add to request" icon={PLUS} />
                  </CardAction>
                </CardHeader>
                <CardContent>Four weeks from the first sketch to a site people understand.</CardContent>
                <CardFooter>
                  <Button>Request a quote</Button>
                </CardFooter>
              </Card>
            </State>
            <State label="Editorial">
              <Card variant="editorial">
                <CardMedia>
                  <Photo />
                </CardMedia>
                <CardHeader>
                  <CardMeta>
                    <span>Case 04 · Website</span>
                    <span>2026</span>
                  </CardMeta>
                  <CardTitle>A practice that feels like the room</CardTitle>
                </CardHeader>
                <CardContent>Type carries the page. Images bring the colour.</CardContent>
                <CardFooter>
                  <Button variant="link" arrow>
                    Read the case
                  </Button>
                </CardFooter>
              </Card>
            </State>
          </States>
        </Section>

        {/* ---------------- Separator ---------------- */}
        <Section id="separator" title="Separator." muted="A 1px hairline.">
          <States min={300}>
            <State label="Horizontal">
              <div className="grid gap-4 text-base leading-[25px]">
                <p className="m-0">Design and build.</p>
                <Separator />
                <p className="m-0 text-muted-foreground">Care and hosting.</p>
              </div>
            </State>
            <State label="Vertical">
              <div className="flex h-5 items-center gap-4 text-sm leading-5">
                <span>Work</span>
                <Separator orientation="vertical" />
                <span>About</span>
                <Separator orientation="vertical" />
                <span>Contact</span>
              </div>
            </State>
            <State label="Not decorative">
              <div className="grid gap-4 text-base leading-[25px]">
                <p className="m-0">Section one</p>
                <Separator decorative={false} />
                <p className="m-0">Section two</p>
              </div>
            </State>
          </States>
        </Section>

        {/* ---------------- Alert ---------------- */}
        <Section id="alert" title="Alert." muted="The square, a title, one or two sentences.">
          <States min={340}>
            <State label="Default">
              <Alert>
                <AlertTitle>Booked for March</AlertTitle>
                <AlertDescription>New projects can start from April. Write now to reserve a slot.</AlertDescription>
              </Alert>
            </State>
            <State label="Destructive">
              <Alert variant="destructive">
                <AlertTitle>The form was not sent</AlertTitle>
                <AlertDescription>Check the two fields marked below and send it again.</AlertDescription>
              </Alert>
            </State>
            <State label="With icon">
              <Alert icon={INFO}>
                <AlertTitle>Closed over the holidays</AlertTitle>
                <AlertDescription>Requests from 22 December are answered from 5 January.</AlertDescription>
              </Alert>
            </State>
          </States>
        </Section>

        {/* ---------------- Toast ---------------- */}
        <Section id="toast" title="Toast." muted="A short note that leaves by itself.">
          <ToastDemo />
        </Section>

        {/* ---------------- Tooltip ---------------- */}
        <Section id="tooltip" title="Tooltip." muted="A short hint on hover or focus.">
          <States min={200}>
            <State label="Text trigger">
              <Tooltip>
                <TooltipTrigger>Care and hosting</TooltipTrigger>
                <TooltipContent>Updates, backups and small changes each month.</TooltipContent>
              </Tooltip>
            </State>
            <State label="On an IconButton">
              <Tooltip>
                <TooltipTrigger asChild>
                  <IconButton aria-label="Share" icon={SHARE} />
                </TooltipTrigger>
                <TooltipContent side="right">Share</TooltipContent>
              </Tooltip>
            </State>
            <State label="Open">
              <div className="pt-12">
                <Tooltip open>
                  <TooltipTrigger>Response time</TooltipTrigger>
                  <TooltipContent>Within two working days.</TooltipContent>
                </Tooltip>
              </div>
            </State>
            <State label="Bottom">
              <Tooltip>
                <TooltipTrigger>Timeline</TooltipTrigger>
                <TooltipContent side="bottom">Usually four weeks.</TooltipContent>
              </Tooltip>
            </State>
          </States>
        </Section>

        {/* ---------------- Dialog ---------------- */}
        <Section id="dialog" title="Dialog." muted="A short task, in a square window.">
          <div className="flex flex-wrap gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button arrow>Request a quote</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <span className="inline-flex items-center gap-3.5 font-serif text-[15px] leading-5 tracking-[0.14em] uppercase before:size-[7px] before:bg-mark before:content-['']">
                    Request
                  </span>
                  <DialogTitle>Tell me about your project</DialogTitle>
                  <DialogDescription>I answer within two working days.</DialogDescription>
                </DialogHeader>
                <Field>
                  <Label htmlFor="dlg-email">Email</Label>
                  <Input id="dlg-email" type="email" placeholder="you@studio.com" />
                </Field>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button>Send request</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete project</Button>
              </DialogTrigger>
              <DialogContent role="alertdialog" showCloseButton={false}>
                <DialogHeader>
                  <DialogTitle>Delete this project?</DialogTitle>
                  <DialogDescription>The project and its files are removed. This cannot be undone.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Keep project</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="destructive">Delete project</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <Sub>Open, in place</Sub>
            <Dialog open modal={false}>
              <DialogContent inline aria-describedby="dlg-inline-desc">
                <DialogHeader>
                  <span className="inline-flex items-center gap-3.5 font-serif text-[15px] leading-5 tracking-[0.14em] uppercase before:size-[7px] before:bg-mark before:content-['']">
                    Request
                  </span>
                  <DialogTitle>Tell me about your project</DialogTitle>
                  <DialogDescription id="dlg-inline-desc">I answer within two working days.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="ghost">Cancel</Button>
                  <Button>Send request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Section>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-10 text-sm leading-5 text-muted-foreground">
          <span>designsbyluca/ui · MIT licence</span>
          <Link href="https://ui.shadcn.com" variant="muted" external>
            Built for shadcn/ui
          </Link>
        </footer>
      </div>
    </TooltipProvider>
  );
}

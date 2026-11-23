import { CaseStory } from "@/registry/designsbyluca/blocks/case-story";
import { FeatureStack } from "@/registry/designsbyluca/blocks/feature-stack";
import { FeatureTiles } from "@/registry/designsbyluca/blocks/feature-tiles";
import { Footer } from "@/registry/designsbyluca/blocks/footer";
import { Hero } from "@/registry/designsbyluca/blocks/hero";
import { NavBar } from "@/registry/designsbyluca/blocks/nav-bar";
import { StatTiles } from "@/registry/designsbyluca/blocks/stat-tiles";
import { TestimonialRail } from "@/registry/designsbyluca/blocks/testimonial-rail";
import { Wordmark } from "@/registry/designsbyluca/blocks/wordmark";
import { Button } from "@/registry/designsbyluca/ui/button";
import { Kicker } from "@/registry/designsbyluca/ui/kicker";
import { Photo } from "@/registry/designsbyluca/ui/photo";

/* Two example pages built only from the blocks, one per tone. Each sets
   data-tone on its own root; on a real site it sits on <html>, and a page
   never mixes the two. All names, numbers and quotes are made up. */

function PageLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-border bg-surface-100">
      <p className="mx-auto m-0 max-w-[1440px] px-5 py-3 text-sm leading-5 text-muted-foreground md:px-16">{children}</p>
    </div>
  );
}

function Statement({ main, muted }: { main: string; muted: string }) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-36 md:px-16">
      <p className="m-0 max-w-[22em] text-pretty text-[32px] leading-[36px] font-[480] tracking-[-0.03em] md:text-[48px] md:leading-[52px]">
        {main} <span className="text-ink-display-muted">{muted}</span>
      </p>
    </section>
  );
}

function SectionHead({ title, muted, center }: { title: string; muted: string; center?: boolean }) {
  return (
    <h2
      className={
        "m-0 mb-12 max-w-[16em] text-[40px] leading-[42px] font-[480] tracking-[-0.03em] md:text-[48px] md:leading-[50px]" +
        (center ? " mx-auto text-center" : "")
      }
    >
      {title} <span className="text-ink-display-muted">{muted}</span>
    </h2>
  );
}

export function CalmPage() {
  return (
    <div id="calm" data-tone="calm" className="scroll-mt-16 bg-background text-foreground">
      <PageLabel>Calm tone, the default. An interior studio, built from the blocks: pills, sand, one orange.</PageLabel>
      <div className="relative">
        <NavBar
          overMedia
          brand="Kessler Studio"
          links={[{ label: "Work" }, { label: "Services" }, { label: "About" }]}
          secondary={{ label: "Journal" }}
          cta={{ label: "Request a quote" }}
        />
        <Hero
          image
          animate
          title="Rooms that feel"
          muted="like a deep breath."
          lead="Interior design for practices and small studios in Berlin, from the first sketch to the last lamp."
        >
          <Button onMedia>Request a quote</Button>
          <Button onMedia variant="outline">
            View work
          </Button>
        </Hero>
      </div>

      <Statement
        main="I plan rooms for practices, studios and small offices."
        muted="Calm to work in, durable, and finished on the agreed date."
      />

      <section className="mx-auto max-w-[1440px] px-5 md:px-16">
        <SectionHead title="What I do." muted="Four things, done properly." />
        <FeatureTiles
          items={[
            { title: "Planning", tone: "sand", text: "Floor plans, light and materials, settled before anything is ordered." },
            { title: "Furniture", tone: "sand", text: "Made to measure where it matters, bought well everywhere else." },
            { title: "First visit free", tone: "accent", text: "An hour on site, and you know what it would cost." },
            { title: "Handover", tone: "sand", text: "Every receipt, every supplier and a plan for repairs." },
          ]}
        />
      </section>

      <section className="relative isolate mt-36 flex min-h-[80svh] items-end overflow-hidden text-ink-inverse">
        <Photo tone="dark" label={false} className="absolute inset-0 -z-20" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(15,14,13,0.7),rgba(15,14,13,0)_55%)]"
        />
        <h2 className="mx-auto m-0 w-full max-w-[1440px] px-5 pb-16 text-[40px] leading-[42px] font-[480] tracking-[-0.03em] md:px-16 md:pb-20 md:text-[72px] md:leading-[72px]">
          Light first.
          <span className="block text-white/60">Furniture second.</span>
        </h2>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pt-36 md:px-16">
        <SectionHead title="One practice, start to finish." muted="Tap through." />
        <CaseStory
          inline
          duration={4000}
          label="Case story: a physiotherapy practice"
          slides={[
            { title: "Calm. Bright.", caption: "Physiotherapy practice, Berlin, 2026", media: <Photo tone="dark" label={false} /> },
            { text: "The old rooms were dark, loud and hard to clean." },
            { text: "Now the light comes first, and every surface can be wiped in a minute.", bg: "#2a2521" },
          ]}
        />
      </section>

      <section className="pt-36">
        <div className="mx-auto max-w-[1440px] px-5 md:px-16">
          <SectionHead title="What clients say." muted="In their words." center />
        </div>
        <TestimonialRail
          items={[
            { quote: "“The practice opened on the day we had planned, and it still looks new a year later.”", name: "Sample client", role: "Practice, Berlin" },
            { media: true },
            { quote: "“She listened first and drew second. That was new for us.”", name: "Sample client", role: "Studio, Leipzig" },
            { media: true },
          ]}
        />
      </section>

      <Footer
        className="mt-36"
        brand="Kessler Studio"
        columns={[
          { title: "Services", links: [{ label: "Planning" }, { label: "Furniture" }, { label: "Handover" }] },
          { title: "Studio", links: [{ label: "About" }, { label: "Journal" }, { label: "Contact" }] },
        ]}
        copyright="© 2026 Kessler Studio"
        legal={[{ label: "Legal notice" }, { label: "Privacy" }]}
      />
    </div>
  );
}

export function FactualPage() {
  return (
    <div id="factual" data-tone="factual" className="scroll-mt-16 border-t border-border bg-background text-foreground">
      <PageLabel>Factual tone. Scheduling software, built from the blocks: the name as hero, mono buttons, lime.</PageLabel>
      <div className="relative">
        <NavBar
          floating
          brand="Linden"
          links={[{ label: "Product", menu: true }, { label: "Customers" }, { label: "Pricing" }]}
          lang={{ label: "EN" }}
          secondary={{ label: "Sign in" }}
          cta={{ label: "Book a demo" }}
        />
        <Wordmark text="Linden" tagline="Scheduling for small clinics. Fewer calls, fewer gaps in the day.">
          <Kicker>Now in beta</Kicker>
          <span className="flex flex-wrap gap-4">
            <Button>Book a demo</Button>
            <Button variant="outline">See pricing</Button>
          </span>
        </Wordmark>

        <section className="mx-auto max-w-[1440px] px-5 pt-24 md:px-16">
          <Photo className="aspect-[16/9] rounded-surface" label="Product screenshot" />
        </section>

        <FeatureStack
          className="mt-24"
          top={96}
          items={[
            {
              kicker: "Booking",
              title: "Patients book themselves.",
              title2: "The phone stays quiet.",
              text: ["Open slots go online the moment you set your hours.", "Changes and cancellations work the same way."],
              actions: (
                <>
                  <Button>Book a demo</Button>
                  <Button variant="outline">How it works</Button>
                </>
              ),
            },
            {
              kicker: "Reminders",
              title: "A text the day before.",
              title2: "Fewer empty chairs.",
              text: "Reminders go out by text and email, in the patient's language.",
              actions: <Button variant="outline">See an example</Button>,
            },
            {
              kicker: "Waiting list",
              title: "A free slot never stays free.",
              title2: "The next person gets it.",
              text: "When someone cancels, the first person on the list is asked, then the next.",
              actions: <Button variant="outline">Learn more</Button>,
            },
          ]}
        />

        <section className="mx-auto max-w-[1440px] px-5 pt-24 pb-16 md:px-16">
          <SectionHead title="In use today." muted="Sample numbers for the demo." />
          <StatTiles
            scatter
            items={[
              { value: "38", label: "clinics in the beta", image: true },
              { value: "2 min", label: "to set up a new room" },
              { value: "−31 %", label: "missed appointments after three months" },
              { value: "24/7", label: "online booking", image: true },
            ]}
          />
        </section>

        <section className="pt-36">
          <div className="mx-auto max-w-[1440px] px-5 md:px-16">
            <SectionHead title="From the front desk." muted="Not from marketing." center />
          </div>
          <TestimonialRail
            rows
            items={[
              { quote: "“We used to spend the first hour of the day on the phone. Now we spend it with patients.”", name: "Sample user", role: "Physiotherapy" },
              { media: true },
              { quote: "“Set up on a Friday, fully booked online by Monday.”", name: "Sample user", role: "Dental practice" },
              { quote: "“The waiting list alone pays for it.”", name: "Sample user", role: "Speech therapy" },
              { media: true },
              { quote: "“Our patients over seventy book online too. That surprised us.”", name: "Sample user", role: "General practice" },
            ]}
          />
        </section>

        <Wordmark className="mt-36" text="Linden" size="footer" />
        <Footer
          brand="Linden"
          columns={[
            { title: "Product", links: [{ label: "Booking" }, { label: "Reminders" }, { label: "Waiting list" }] },
            { title: "Company", links: [{ label: "Customers" }, { label: "Pricing" }, { label: "Contact" }] },
          ]}
          copyright="© 2026 Linden"
          legal={[{ label: "Legal notice" }, { label: "Privacy" }]}
        />
      </div>
    </div>
  );
}

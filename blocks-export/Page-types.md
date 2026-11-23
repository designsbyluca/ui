# Page types

Which blocks make up a page.

## Portfolio home

`NavBar` → `Hero` (animate, two lines, the second grey) with `VideoToggle` and `ScrollHint` → content in `sg-sheet`, sliding over the hero → `ProjectEntry`, alternating normal and `secondary`, each in `Reveal`; a case link with `thumb` opens a `CaseStory` → unfinished projects with `comingSoon` → `ContactDock floating` → a plain `Footer`.

## Product home

`AnnouncementBar` (optional) → `NavBar floating` → `Wordmark` with a tagline → `CardFan` with 3–5 images → `ScrollFillText` (two or three sentences, the end in `tail`) → `MediaFrame` with a screenshot and a button pair → `FeatureStack` (2–4 services, each with a `Kicker`) → a large photo with a white `headline` → `BlurList strike` (problems that go away) → centred `SectionTitle` + `TestimonialRail` → `SectionTitle` + `StatTiles scatter` → two `AudienceCard` → `Wordmark size="footer"` → `Footer`.

## Service page

`NavBar` → `Hero` with `headline-xl`, the second sentence grey, a cut-out photo → `FeatureTiles` (one tile near-black) → narrative sections: text and a button on the left, a large mockup on `surface-100` on the right → testimonials → `Footer`. Fixed at the bottom: `ContactDock floating` with `field`.

## Request

Only the name at the top, no navigation. A centred `headline-xl` title → `StepForm` (Rent / Buy / Consulting / Other, then contact fields) → one client quote in `ink-muted` below.

## Letter / About

`AnnouncementBar` (optional) → centred title → `Letter` with a signature → `StatRow` → centred two-tone `SectionTitle` → testimonials → `Accordion` (FAQ) → `ContactDock floating` with a person and "First call".

## Values / How I work

One sentence large and centred on an empty surface → `Letter` in a column → `NumberedPoints` with portraits between the points → `ListGroup` (e.g. services with a `Tag`).

## Manifesto

A dark page (`surface-inverse`): a two-line title, a photo, numbered text in large type with the second line grey → `ReadingDock floating`.

## Article / News

Date in `ink-muted`, title `headline-xl`, a large photo → two columns: meta lines with hairlines on the left (contact, download button), text in `article` on the right.

## Legal notice / Privacy

Two-tone `SectionTitle as="h1"` → a short intro → details in two quiet `card` surfaces → for privacy, long sections with `section-title` and `body`.

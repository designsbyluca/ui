# Stein & Grotesk – ursprüngliche Stilbeschreibung (Referenz)

Dies ist die ursprüngliche Beschreibung des Stils, bevor er umgebaut wurde. Sie gilt wieder als Maßstab für den Look. Es werden Haltung und Maße der Referenzen übernommen, keine Logos, Texte oder Bilder der Marken.

Referenzen:
- **buena.com**: warme Stein-Neutraltöne, ruhige Grotesk, weiße Pills über großen Fotos, eine editoriale Serif in Versalien
- **lenz.studio**: riesige, eng gesetzte Grotesk-Headlines, Schwarz/Weiß, eine Aussage pro Bildschirm, Bilder als Hauptsache
- **arbio.com**: sachlichere Tech-Variante – riesiger Name als Hero, Mono-Buttons in Versalien, ein limettengrüner Kicker, viel scroll-gebundene Bewegung

## Grundhaltung

- **Wenig, aber groß.** Eine Aussage pro Bildschirm. Headlines in `display-xl`, die zweite Zeile in `ink-display-muted`.
- **Neutral zuerst.** Farbe kommt aus Fotos und Projekten, nicht aus der UI. Palette: Weiß, warmes Stein-Grau (`surface-100`, `surface-200`), Sand (`sand`), warmes Fast-Schwarz (`ink`). Dazu genau ein lautes Orange (`signal`) – sparsam, wie bei Leistungs-Kacheln.
- **Bilder tragen.** Große Fotos und Videos, randlos (`radius-none`) oder als Kachel mit `radius-md`. Text über Fotos immer in `ink-inverse`, mit dunklem Verlauf am Bildrand für Kontrast.
- **Luft.** Abschnitte mit `space-6` trennen, Seitenrand `space-5`.

## Zwei Tonlagen

- **Ruhig (Standard):** Pills, `signal`-Orange, große Grotesk. Für Portfolios, Dienstleister, Praxen, Kreative.
- **Sachlich:** `Wordmark`-Hero, Mono-Buttons (`Button variant="mono"`), `Kicker` auf `highlight` (Limette), `FeatureStack`, `StatTiles`, schwebende `NavBar floating`. Für Startups, Software, Tech-nahe Firmen.

Pro Seite eine Tonlage. Nicht mischen: keine Pills neben Mono-Buttons, kein `signal` neben `highlight`.

## Farbe

| Token | Wofür |
|---|---|
| `surface-000` | Seite |
| `surface-100` | ruhige Flächen, Formularfelder, Auswahl-Kacheln |
| `surface-200` | Info-Karten, Tag-Rahmen |
| `sand` | Leistungs-Kacheln, Mockup-Hintergründe |
| `cream` | Ankündigungsleiste |
| `surface-inverse` | dunkle Bühne (Hero, Showreel) |
| `ink` / `ink-muted` | Text / Sekundärtext |
| `ink-display-muted` | graue Headline-Zeile, nur ab 24px |
| `stone` | Deko, nie Text auf Weiß |
| `signal` / `on-signal` | orange Akzent-Kachel / Text darauf |
| `link-signal` | orange Textlink (dunkler, lesbar) |
| `dot` | gelber Punkt vor Zwischentiteln |
| `go` | grüner Abschluss im Lese-Dock |
| `highlight` / `on-highlight` | Limetten-Fläche für Kicker / Text darauf (nur sachliche Tonlage) |
| `ink-unread` | noch nicht gelesene Wörter im ScrollFillText |
| `glass` | schwebende Docks |
| `hairline` | Trennlinien |

Kontrast: `ink` und `ink-muted` erfüllen 4,5:1 auf `surface-000` und `surface-100`. `ink-display-muted` nur für große Schrift. Auf `sand` nur `ink`. Auf `signal` nie Weiß, sondern `on-signal`. Auf `highlight` nur `on-highlight`.

## Typografie

Eine neutrale Grotesk (`sans`, Inter Tight) für fast alles. Nebenrollen: eine feine Display-Serif (`serif`, Cormorant Garamond) nur für editoriale Titel in Versalien, eine Text-Serif (`serif-text`, Newsreader) nur für den persönlichen Brief, eine Mono (`mono`, JetBrains Mono) für kleine Unterzeilen in Versalien – in der sachlichen Tonlage auch für Buttons, Kicker und Zahlen.

Große Schrift eng (`display-wordmark` und `headline` −3 %, `display-xl` −4 %), kleine leicht gesperrt (`label`). Gewicht 450–500, nie Bold.

## Formen

- Buttons und Tags sind Pills (`radius-pill`) – außer in der sachlichen Tonlage: Mono-Buttons mit `radius-sm`, Kicker mit `radius-xs`.
  - Primär: weiße Pill mit `ink`-Text, auf Fotos und dunklen Flächen.
  - Sekundär: transparente Pill mit 1px Rahmen in `ink-inverse` (auf dunkel) bzw. `hairline` (auf hell).
- Leistungs-Kacheln eckig (`radius-none`), Medien-Kacheln und Docks `radius-md` (sachlich: `radius-xl`; schwebende NavBar `radius-2xl`), Formularkarten `radius-lg`, Tags `radius-sm`.
- Schatten nur für Schwebendes. Alles andere flach.
- Links im Text: unterstrichen, Farbe `ink`.

## Ikonografie

Kaum Icons. Feine Linien-Icons (1,5px), Pfeil ↗ für externe Links. Keine Emoji, keine gefüllten Icon-Kreise.

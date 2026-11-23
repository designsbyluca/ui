import type * as React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** shadcn/ui variants. default = near-black fill (off-white in dark), outline = 1px line, secondary = quiet fill, link = underlined text. Legacy names: primary and mono → default, mono-secondary → outline. */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'primary' | 'mono' | 'mono-secondary';
  /** default 48px, sm 44px, lg 56px, icon 48×48 */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  /** adds → after the label; it moves 3px on hover */
  arrow?: boolean;
  /** render the single child element instead of a <button> (shadcn/ui Slot) */
  asChild?: boolean;
  /** on photos or video: fixed white in both themes */
  onMedia?: boolean;
  /** renders a link instead of a button */
  href?: string;
}
export declare function Button(props: ButtonProps): React.ReactElement;
export interface NavLink { label: string; href?: string; /** shows a + (opens a menu the page provides) */ menu?: boolean }
export interface NavBarProps {
  brand: React.ReactNode; brandHref?: string;
  links?: NavLink[];
  /** small link to the left of the CTA (outline button when floating) */
  secondary?: NavLink;
  cta?: NavLink;
  /** over a photo: white text, dark scrim */
  overMedia?: boolean;
  /** sticks to the top; with overMedia it turns solid after scrolling */
  sticky?: boolean;
  /** scroll distance in px before it turns solid (default 40) */
  solidAfter?: number;
  /** floating bar with square, sticks 12px below the top */
  floating?: boolean;
  /** legacy, no effect */
  mono?: boolean;
  /** language switch, e.g. { label: 'EN' } */
  lang?: NavLink;
}
export declare function NavBar(props: NavBarProps): React.ReactElement;
export interface HeroProps {
  title: React.ReactNode;
  /** second line in ink-display-muted */
  muted?: React.ReactNode;
  lead?: React.ReactNode;
  dark?: boolean;
  align?: 'left' | 'center';
  /** staggered entrance on load: lines rise 16px (900ms, delay-1 to delay-3) */
  animate?: boolean;
  /** e.g. buttons; the last stagger step with animate */
  children?: React.ReactNode;
}
export declare function Hero(props: HeroProps): React.ReactElement;
export interface ProjectEntryProps {
  /** image URL or your own element (e.g. <video>) */
  media?: string | React.ReactNode; alt?: string;
  text: React.ReactNode;
  href?: string; linkLabel?: string;
  comingSoon?: boolean; soonLabel?: string;
  /** round case link with a rotating ring: image URL or null (placeholder) */
  thumb?: string | null;
  /** opens e.g. a CaseStory instead of a link */
  onPlay?: () => void;
  /** right-aligned, text in ink-display-muted */
  secondary?: boolean;
}
export declare function ProjectEntry(props: ProjectEntryProps): React.ReactElement;
export interface FooterProps {
  columns?: { title: string; links: NavLink[] }[];
  copyright?: string;
  legal?: NavLink[];
}
export declare function Footer(props: FooterProps): React.ReactElement;
export interface RevealProps {
  children?: React.ReactNode;
  /** stagger 1–3 → delay-1 … delay-3 */
  delay?: 1 | 2 | 3;
  /** replay every time it scrolls in (default: once) */
  repeat?: boolean;
  threshold?: number;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}
export declare function Reveal(props: RevealProps): React.ReactElement;
export interface ScrollHintProps { label?: string; /** CSS selector of the target; otherwise one screen height */ target?: string }
export declare function ScrollHint(props: ScrollHintProps): React.ReactElement;
export interface VideoToggleProps { playing?: boolean; /** 0–1, video progress */ progress?: number; onToggle?: () => void }
export declare function VideoToggle(props: VideoToggleProps): React.ReactElement;
/** Alias of Badge, kept for older pages. */
export declare const Tag: typeof Badge;
export interface AnnouncementBarProps { text: React.ReactNode; linkLabel?: string; href?: string }
export declare function AnnouncementBar(props: AnnouncementBarProps): React.ReactElement;
export interface SectionTitleProps { title: React.ReactNode; muted?: React.ReactNode; align?: 'left' | 'center'; as?: 'h1' | 'h2' | 'h3' }
export declare function SectionTitle(props: SectionTitleProps): React.ReactElement;
export interface FeatureTile { title: string; text?: string; tone?: 'sand' | 'stone' | 'signal' }
export declare function FeatureTiles(props: { items: FeatureTile[]; columns?: number }): React.ReactElement;
export declare function StatRow(props: { items: { value: string; label: string }[] }): React.ReactElement;
export declare function Accordion(props: { items: { q: string; a: React.ReactNode; open?: boolean }[] }): React.ReactElement;
export interface ContactDockProps {
  name?: string; role?: string; avatar?: string;
  title?: React.ReactNode; subtitle?: React.ReactNode;
  /** turns the dock into an input line */
  field?: { label: string; placeholder?: string; type?: string; name?: string };
  cta?: { label: string; href?: string; onClick?: () => void };
  /** fixed at the bottom centre */
  floating?: boolean; ariaLabel?: string;
}
export declare function ContactDock(props: ContactDockProps): React.ReactElement;
export interface StepFormProps {
  steps: { question: string; options: (string | { label: string; icon?: React.ReactNode })[] }[];
  /** optional last step with contact fields */
  fields?: { label: string; type?: string; name?: string; required?: boolean }[];
  fieldsTitle?: string; submitLabel?: string; doneTitle?: string; doneText?: string;
  onSubmit?: (answers: Record<number, string>) => void;
}
export declare function StepForm(props: StepFormProps): React.ReactElement;
export declare function ListGroup(props: { groups: { label?: string; items: { title: string; tag?: string; href?: string }[] }[] }): React.ReactElement;
export declare function NumberedPoints(props: { items: { title: string; text: string }[]; start?: number }): React.ReactElement;
export declare function Letter(props: { children?: React.ReactNode; signature?: React.ReactNode }): React.ReactElement;
export interface CaseSlide { title?: string; text?: string; caption?: string; media?: string | React.ReactNode; alt?: string; bg?: string }
export interface CaseStoryProps { slides: CaseSlide[]; onClose?: () => void; inline?: boolean; autoplay?: boolean; duration?: number; loop?: boolean; start?: number; label?: string }
export declare function CaseStory(props: CaseStoryProps): React.ReactElement;
export interface ReadingDockProps { secondary?: { label: string; href?: string }; cta?: { label: string; href?: string }; progress?: number; floating?: boolean }
export declare function ReadingDock(props: ReadingDockProps): React.ReactElement;
export interface Action { label: string; href?: string; onClick?: () => void; variant?: ButtonProps['variant'] }
/** Label with the accent square, above a title */
export declare function Kicker(props: { children: React.ReactNode }): React.ReactElement;
export interface WordmarkProps {
  /** one word, e.g. the name */
  text: string;
  /** tagline to the right of the word, on its baseline */
  tagline?: React.ReactNode;
  /** hero = h1 at the top; footer = fitted to the width above the footer */
  size?: 'hero' | 'footer';
  /** repeats the first letter n times in front (footer only) */
  echo?: number;
  as?: string;
}
export declare function Wordmark(props: WordmarkProps): React.ReactElement;
export interface FeatureStackItem {
  kicker?: string; title: string; title2?: string;
  /** one paragraph or several */
  text?: string | string[];
  actions?: Action[];
  media?: string | React.ReactNode; alt?: string;
}
export interface FeatureStackProps {
  items: FeatureStackItem[];
  /** distance of the sticky sections from the top in px (e.g. NavBar height) */
  top?: number;
  /** height per section, default 100vh */
  height?: number | string;
}
export declare function FeatureStack(props: FeatureStackProps): React.ReactElement;
export interface ScrollFillTextProps {
  text: string;
  /** last words, filled in ink-display-muted instead of ink */
  tail?: string;
  /** 0..1: fixed fill instead of scroll */
  progress?: number;
  as?: string;
}
export declare function ScrollFillText(props: ScrollFillTextProps): React.ReactElement;
export interface BlurListProps {
  items: string[];
  /** active and past lines are struck through (problems that go away) */
  strike?: boolean;
  /** 0..1: fixed state instead of scroll */
  progress?: number;
  /** scroll distance per line in vh, default 60 */
  step?: number;
  /** height of the sticky stage, default 100vh */
  stageHeight?: number | string;
}
export declare function BlurList(props: BlurListProps): React.ReactElement;
export interface CardFanProps {
  /** image URLs or elements; 3–5 */
  items: (string | React.ReactNode | { src: string; alt?: string })[];
  /** 0 = row, 1 = fanned stack; follows scroll when omitted */
  progress?: number;
  width?: number; height?: number;
  /** rotation per card in degrees (default 4 = tilt) */
  tilt?: number;
  /** offset in the stack in px (default 56 = fan-overlap) */
  overlap?: number;
}
export declare function CardFan(props: CardFanProps): React.ReactElement;
export interface MediaFrameProps {
  /** screenshot URL or element inside the window */
  media?: string | React.ReactNode; alt?: string;
  children?: React.ReactNode;
  /** photo, heavily blurred, as the background; otherwise a flat muted surface */
  background?: string;
  /** show the whole window instead of cropping at the bottom */
  whole?: boolean;
  actions?: Action[];
}
export declare function MediaFrame(props: MediaFrameProps): React.ReactElement;
export interface StatTilesProps {
  items: { value: string; label: string; media?: string; alt?: string }[];
  /** staggered layout with gaps */
  scatter?: boolean;
}
export declare function StatTiles(props: StatTilesProps): React.ReactElement;
export type RailItem = { quote: React.ReactNode; name: string; role?: string; initials?: string; avatar?: string } | { media: string | React.ReactNode; alt?: string };
export interface TestimonialRailProps {
  items?: RailItem[];
  /** several rows, alternating direction */
  rows?: RailItem[][];
  /** duration of one pass in ms (default dur-marquee) */
  duration?: number;
  label?: string;
}
export declare function TestimonialRail(props: TestimonialRailProps): React.ReactElement;
export interface AudienceCardProps {
  title: React.ReactNode; text?: React.ReactNode;
  action?: Action;
  media?: string | React.ReactNode; alt?: string;
  /** Bild links */
  reverse?: boolean;
}
export declare function AudienceCard(props: AudienceCardProps): React.ReactElement;
/* ---------- Base components (Free, shadcn/ui-compatible) ---------- */
type Div = React.HTMLAttributes<HTMLDivElement>;
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** default = line with the ochre square, secondary = quiet fill, outline = line only, destructive = red. inverse (extension) = near-black fill. */
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'inverse';
  asChild?: boolean;
}
export declare function Badge(props: BadgeProps): React.ReactElement;
export interface IconButtonProps extends Omit<ButtonProps, 'size'> {
  /** the icon element (16px line icon) */
  icon?: React.ReactNode;
  /** required: what the button does */
  'aria-label': string;
  size?: 'icon' | 'sm';
}
export declare function IconButton(props: IconButtonProps): React.ReactElement;
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'muted';
  /** opens in a new tab and adds ↗ */
  external?: boolean;
  /** adds → for "continue" links */
  arrow?: boolean;
  asChild?: boolean;
}
export declare function Link(props: LinkProps): React.ReactElement;
export declare function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>): React.ReactElement;
/** One line below by default; variant="boxed" (extension) draws a fine frame. Error: aria-invalid="true". Disabled: disabled. */
export declare function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { variant?: 'line' | 'boxed' }): React.ReactElement;
export declare function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>): React.ReactElement;
export interface SelectProps {
  value?: string; defaultValue?: string; onValueChange?: (value: string) => void;
  open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void;
  disabled?: boolean; name?: string; children?: React.ReactNode;
}
export declare function Select(props: SelectProps): React.ReactElement;
export declare function SelectTrigger(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'line' | 'boxed' }): React.ReactElement;
export declare function SelectValue(props: { placeholder?: React.ReactNode }): React.ReactElement;
export declare function SelectContent(props: Div): React.ReactElement;
export declare function SelectItem(props: { value: string; disabled?: boolean; children?: React.ReactNode; className?: string }): React.ReactElement;
export interface CheckboxProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean | 'indeterminate'; defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
export declare function Checkbox(props: CheckboxProps): React.ReactElement;
export interface RadioGroupProps extends Omit<Div, 'onChange' | 'defaultValue'> {
  value?: string; defaultValue?: string; onValueChange?: (value: string) => void;
  disabled?: boolean; name?: string; orientation?: 'vertical' | 'horizontal';
}
export declare function RadioGroup(props: RadioGroupProps): React.ReactElement;
export declare function RadioGroupItem(props: { value: string; id?: string; disabled?: boolean; className?: string; 'aria-label'?: string }): React.ReactElement;
export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean; defaultChecked?: boolean; onCheckedChange?: (checked: boolean) => void;
}
export declare function Switch(props: SwitchProps): React.ReactElement;
export declare function Avatar(props: { size?: 'sm' | 'default' | 'lg'; className?: string; children?: React.ReactNode }): React.ReactElement;
export declare function AvatarImage(props: React.ImgHTMLAttributes<HTMLImageElement>): React.ReactElement | null;
export declare function AvatarFallback(props: { className?: string; children?: React.ReactNode }): React.ReactElement | null;
/** default = quiet surface without border; outline = fine frame; editorial = image above, text below, no surface (extensions). */
export declare function Card(props: Div & { variant?: 'default' | 'outline' | 'editorial' }): React.ReactElement;
/** image area of an editorial card, 4:3 */
export declare function CardMedia(props: { src?: string; alt?: string; children?: React.ReactNode; className?: string }): React.ReactElement;
/** serif-capital meta line above the title, e.g. 'Case 04 · Website' and '2026' */
export declare function CardMeta(props: Div): React.ReactElement;
export declare function CardHeader(props: Div): React.ReactElement;
export declare function CardTitle(props: Div): React.ReactElement;
export declare function CardDescription(props: Div): React.ReactElement;
/** top-right slot in the header, e.g. a Badge or an IconButton */
export declare function CardAction(props: Div): React.ReactElement;
export declare function CardContent(props: Div): React.ReactElement;
export declare function CardFooter(props: Div): React.ReactElement;
export declare function Separator(props: { orientation?: 'horizontal' | 'vertical'; decorative?: boolean; className?: string }): React.ReactElement;
export interface AlertProps extends Div {
  variant?: 'default' | 'destructive';
  /** replaces the square mark, e.g. a 16px line icon */
  icon?: React.ReactNode;
}
export declare function Alert(props: AlertProps): React.ReactElement;
export declare function AlertTitle(props: Div): React.ReactElement;
export declare function AlertDescription(props: Div): React.ReactElement;
export interface ToastOptions { id?: string | number; description?: React.ReactNode; duration?: number; action?: { label: string; onClick?: () => void } }
/** Sonner-style: call toast('Saved'), toast.success(...), toast.error(...), toast.dismiss(id). */
export declare const toast: ((message: React.ReactNode, options?: ToastOptions) => string | number) & {
  success(message: React.ReactNode, options?: ToastOptions): string | number;
  error(message: React.ReactNode, options?: ToastOptions): string | number;
  dismiss(id?: string | number): void;
};
export interface ToasterProps {
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-center';
  /** render in place instead of fixed (previews, docs) */
  inline?: boolean;
}
/** Mount once near the root. Toast is an alias of Toaster. */
export declare function Toaster(props: ToasterProps): React.ReactElement;
export declare const Toast: typeof Toaster;
export declare function TooltipProvider(props: { delayDuration?: number; children?: React.ReactNode }): React.ReactElement;
export declare function Tooltip(props: { open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; delayDuration?: number; children?: React.ReactNode }): React.ReactElement;
export declare function TooltipTrigger(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }): React.ReactElement;
export declare function TooltipContent(props: { side?: 'top' | 'right' | 'bottom' | 'left'; className?: string; children?: React.ReactNode }): React.ReactElement | null;
export declare function Dialog(props: { open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; children?: React.ReactNode }): React.ReactElement;
export declare function DialogTrigger(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }): React.ReactElement;
export interface DialogContentProps extends Div {
  /** hide the × button */
  showCloseButton?: boolean;
  /** render in place instead of over the page (previews, docs) */
  inline?: boolean;
  /** 'alertdialog' for confirmations */
  role?: string;
}
export declare function DialogContent(props: DialogContentProps): React.ReactElement | null;
export declare function DialogHeader(props: Div): React.ReactElement;
export declare function DialogTitle(props: Div): React.ReactElement;
export declare function DialogDescription(props: Div): React.ReactElement;
export declare function DialogFooter(props: Div): React.ReactElement;
export declare function DialogClose(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }): React.ReactElement;
declare global { interface Window { DesignsByLuca: { Button: typeof Button; NavBar: typeof NavBar; Hero: typeof Hero; ProjectEntry: typeof ProjectEntry; Footer: typeof Footer; Reveal: typeof Reveal; ScrollHint: typeof ScrollHint; VideoToggle: typeof VideoToggle; AnnouncementBar: typeof AnnouncementBar; SectionTitle: typeof SectionTitle; FeatureTiles: typeof FeatureTiles; StatRow: typeof StatRow; Accordion: typeof Accordion; ContactDock: typeof ContactDock; StepForm: typeof StepForm; ListGroup: typeof ListGroup; Tag: typeof Tag; NumberedPoints: typeof NumberedPoints; Letter: typeof Letter; CaseStory: typeof CaseStory; ReadingDock: typeof ReadingDock; Kicker: typeof Kicker; Wordmark: typeof Wordmark; FeatureStack: typeof FeatureStack; ScrollFillText: typeof ScrollFillText; BlurList: typeof BlurList; CardFan: typeof CardFan; MediaFrame: typeof MediaFrame; StatTiles: typeof StatTiles; TestimonialRail: typeof TestimonialRail; AudienceCard: typeof AudienceCard; Badge: typeof Badge; IconButton: typeof IconButton; Link: typeof Link; Label: typeof Label; Input: typeof Input; Textarea: typeof Textarea; Select: typeof Select; SelectTrigger: typeof SelectTrigger; SelectValue: typeof SelectValue; SelectContent: typeof SelectContent; SelectItem: typeof SelectItem; Checkbox: typeof Checkbox; RadioGroup: typeof RadioGroup; RadioGroupItem: typeof RadioGroupItem; Switch: typeof Switch; Avatar: typeof Avatar; AvatarImage: typeof AvatarImage; AvatarFallback: typeof AvatarFallback; Card: typeof Card; CardMedia: typeof CardMedia; CardMeta: typeof CardMeta; CardHeader: typeof CardHeader; CardTitle: typeof CardTitle; CardDescription: typeof CardDescription; CardAction: typeof CardAction; CardContent: typeof CardContent; CardFooter: typeof CardFooter; Separator: typeof Separator; Alert: typeof Alert; AlertTitle: typeof AlertTitle; AlertDescription: typeof AlertDescription; Toaster: typeof Toaster; Toast: typeof Toast; toast: typeof toast; Tooltip: typeof Tooltip; TooltipProvider: typeof TooltipProvider; TooltipTrigger: typeof TooltipTrigger; TooltipContent: typeof TooltipContent; Dialog: typeof Dialog; DialogTrigger: typeof DialogTrigger; DialogContent: typeof DialogContent; DialogHeader: typeof DialogHeader; DialogTitle: typeof DialogTitle; DialogDescription: typeof DialogDescription; DialogFooter: typeof DialogFooter; DialogClose: typeof DialogClose } } }

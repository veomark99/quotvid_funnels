import type { ReactNode } from "react";

export type FunnelSlug = "pinterest" | "youtube";

export interface FunnelVisualCard {
  dayLabel: string;
  statLabel: string;
  /**
   * Hero mosaic mp4 (muted, loop): absolute URLs (e.g. media CDN) or `/assets/...`.
   * With `NEXT_PUBLIC_FUNNEL_VIDEO_CDN_BASE`, `/assets/foo.mp4` resolves to `{base}/foo.mp4`.
   */
  videoSrc?: string;
}

export interface FunnelBonusPublic {
  icon: string;
  tag: string;
  title: string;
  description: string;
  priceOldLabel: string;
}

export interface FunnelFormBonusRow {
  name: string;
  valueFree: string;
}

export interface FunnelContentModel {
  metaTitle: string;
  metaDescription: string;

  urgencyStrong: string;
  urgencyRest: string;

  eyebrow: string;

  heroTitleLeading: ReactNode;
  heroTitleItalic: string;

  heroSub: string;

  proofBullets: ReadonlyArray<{ icon: string; text: string }>;

  nicheFieldLabel: string;
  nichePlaceholder: string;
  nicheOptions: readonly string[];

  goalPlaceholder: string;
  goalOptions: readonly string[];

  chipOptions: readonly string[];

  formBonusRows: Readonly<FunnelFormBonusRow[]>;

  bonusesRibbon: string;
  bonusesHeadingLeading: ReactNode;
  bonusesHeadingItalic: string;
  bonusesSub: string;
  bonusesPublic: Readonly<FunnelBonusPublic[]>;
  bonusTotalFraction: string;
  bonusBadgeCta: string;

  ctas: Readonly<[string, string, string]>;

  visualChrome: Readonly<{ barUrl: string; statusLine: string }>;
  visualCards: Readonly<FunnelVisualCard[]>;
  heroVisualPinsClassSuffix: "" | " pin-yt";

  problemLabel: string;
  problemBlocks: ReadonlyArray<
    ReadonlyArray<{ text: string; dim?: boolean; gold?: boolean }>
  >;

  solutionEyebrow: string;
  solutionTitleLeading: ReactNode;
  solutionTitleItalic: string;
  solutionBody: ReactNode;

  stepsEyebrow: string;
  stepsTitle: string;
  steps: ReadonlyArray<{ title: string; body: string }>;

  midBannerTitleLeading: ReactNode;
  midBannerTitleItalic: string;
  midBannerSub: string;

  outcomeEyebrow: string;
  outcomeTitle: string;
  outcomeBullets: readonly string[];

  trustTitle: string;
  trustItems: readonly string[];

  finalBannerTitleLeading: ReactNode;
  finalBannerTitleItalic: string;
  finalBannerSub: string;

  submitButtonLabel: string;
  formMicro: ReactNode;

  successTitle: string;
  successBody1: string;
  successBody2: string;
  successHighlight: string;
  successSpamNote: string;
}

export const funnelPinterestContent = {
  metaTitle: "QuotVid — Free Pinterest Automation Trial",
  metaDescription:
    "5-day Pinterest video automation trial with QuotVid — no credit card.",

  urgencyStrong: "Limited Offer:",
  urgencyRest:
    "Free trial + 4 exclusive bonuses — available for a limited time only",

  eyebrow: "Free 5-Day Pinterest Automation Trial",

  heroTitleLeading: <>Get Your Pinterest Videos</>,
  heroTitleItalic: "Automatically",

  heroSub:
    "QuotVid creates and posts videos to your Pinterest every day — without you doing anything.",

  proofBullets: [
    { icon: "★", text: "No credit card required" },
    { icon: "✓", text: "5 free days, starts on connection" },
    { icon: "🔒", text: "Official Pinterest API only" },
  ] as const,

  nicheFieldLabel: "Your Pinterest niche",
  nichePlaceholder: "Select your niche…",
  nicheOptions: [
    "AI & Tech",
    "Business & Startups",
    "Marketing & Growth",
    "Productivity",
    "Personal Finance",
    "Health & Fitness",
    "Education",
    "Entertainment",
    "Lifestyle",
    "Other",
  ] as const,

  goalPlaceholder: "What do you want to achieve?",
  goalOptions: [
    "Grow Followers",
    "Build Credibility",
    "Drive Engagement",
    "Brand Awareness",
    "Generate Leads",
    "Educate",
    "Entertain",
    "Sell Products",
  ] as const,

  chipOptions: [
    "Motivational",
    "Educational",
    "Bold",
    "Friendly",
    "Witty",
    "Direct",
    "Analytical",
    "Raw",
  ] as const,

  formBonusRows: [
    { name: "5-Day Pinterest Automation", valueFree: "FREE" },
    { name: "Niche Starter Video Pack", valueFree: "$29 free" },
    { name: "Pinterest Growth Cheatsheet", valueFree: "$15 free" },
    { name: "Weekly Analytics Digest", valueFree: "$9/mo free" },
    { name: "Viral Hook Swipe File", valueFree: "$12 free" },
  ] as const,

  bonusesRibbon: "🎁 Exclusive Free Bonuses",
  bonusesHeadingLeading: <>Sign up today and get</>,
  bonusesHeadingItalic: "everything",
  bonusesSub:
    "When you start your free trial right now, you unlock these 4 bonuses — bundled automatically with your account.",

  bonusesPublic: [
    {
      icon: "🎬",
      tag: "Bonus #1",
      title: "Niche Starter Video Pack",
      description:
        "10 pre-built video templates perfectly tuned to your niche — ready to post from day one with zero design work.",
      priceOldLabel: "$29 value",
    },
    {
      icon: "⚡",
      tag: "Bonus #2",
      title: "Pinterest Growth Cheatsheet",
      description:
        "The 7 settings most creators miss that triple reach — board SEO, keyword placement, optimal post timing.",
      priceOldLabel: "$15 value",
    },
    {
      icon: "🔔",
      tag: "Bonus #3",
      title: "Weekly Analytics Digest",
      description:
        "Auto-generated weekly email showing your top pins, saves, and reach growth — so you always know what's working.",
      priceOldLabel: "$9/mo value",
    },
    {
      icon: "🔥",
      tag: "Bonus #4",
      title: "Viral Hook Swipe File",
      description:
        "50 proven opening hooks used by top Pinterest creators to stop the scroll — plug any of them directly into your next video.",
      priceOldLabel: "$12 value",
    },
  ] as const,

  bonusTotalFraction: "$65+ in free bonuses",
  bonusBadgeCta: "Yours free today →",

  ctas: [
    "Claim My Free Trial + Bonuses",
    "Start My Free Trial Now",
    "Yes — Automate My Pinterest Free",
  ] as const,

  visualChrome: {
    barUrl: "pinterest.com / your-profile",
    statusLine: "Auto-posting active",
  },
  visualCards: [
    {
      dayLabel: "Day 1 · Dedication",
      statLabel: "♥ 142 saves",
      videoSrc: "https://media.quotvid.com/videos/49/426.mp4",
    },
    {
      dayLabel: "Day 2 · Build in silence",
      statLabel: "♥ 98 saves",
      videoSrc: "https://media.quotvid.com/videos/49/768.mp4",
    },
    {
      dayLabel: "Day 3 · Freedom",
      statLabel: "♥ 211 saves",
      videoSrc: "https://media.quotvid.com/videos/49/777.mp4",
    },
    {
      dayLabel: "Day 4 · Modern mindset",
      statLabel: "♥ 76 saves",
      videoSrc: "https://media.quotvid.com/videos/49/827.mp4",
    },
  ] as const,
  heroVisualPinsClassSuffix: "" as const,

  problemLabel: "Why you're stuck",
  problemBlocks: [
    [
      { text: "You know daily posting grows your Pinterest." },
      { text: "But you haven't posted in weeks.", dim: true },
    ],
    [
      { text: "Not because you're lazy —", dim: true },
      { text: "because it takes time you just don't have." },
    ],
    [
      { text: "So your profile stays quiet.", dim: true },
      { text: "Your reach stays flat.", dim: true },
      { text: "And nothing ever changes.", gold: true },
    ],
  ] as const,

  solutionEyebrow: "The fix",
  solutionTitleLeading: <>What if your Pinterest</>,
  solutionTitleItalic: "ran itself?",
  solutionBody: (
    <>
      No schedule. No reminders. No burnout.
      <br />
      QuotVid generates niche-specific videos and posts them for you — every single day.
    </>
  ),

  stepsEyebrow: "How it works",
  stepsTitle: "Three steps, then you're done",
  steps: [
    {
      title: "Enter your details",
      body: "Tell us your niche and goal. Takes 60 seconds. No password required.",
    },
    {
      title: "Connect Pinterest",
      body: "One-time OAuth. Your 5-day free trial starts the moment you connect.",
    },
    {
      title: "We post daily",
      body: "One custom video generated and published to your board every single day.",
    },
  ] as const,

  midBannerTitleLeading: <>Sounds good?</>,
  midBannerTitleItalic: "Let's start.",
  midBannerSub:
    "Your first video will be ready within minutes of signing up. No waiting. No setup headache.",

  outcomeEyebrow: "What you get",
  outcomeTitle: "Everything included in your free trial",
  outcomeBullets: [
    "Daily Pinterest video — generated for your niche",
    "Auto-posted every day for 5 days",
    "Niche Starter Video Pack (10 templates)",
    "Pinterest Growth Cheatsheet",
    "Weekly Analytics Digest",
    "Viral Hook Swipe File (50 hooks)",
    "Zero effort. No editing. No uploading.",
  ] as const,

  trustTitle: "Your account is 100% safe",
  trustItems: [
    "Official Pinterest API only — no hacks",
    "We never read your DMs or contacts",
    "We never store your login credentials",
    "Disconnect anytime from Pinterest settings",
    "Content tailored to your niche — not generic",
    "Trial starts on connection, not signup",
  ] as const,

  finalBannerTitleLeading: <>Ready to</>,
  finalBannerTitleItalic: "stop doing it manually?",
  finalBannerSub:
    "Join creators who've already handed their Pinterest to QuotVid. Your page won't post itself — until now.",

  submitButtonLabel: "🎁 Claim Free Trial + All Bonuses →",
  formMicro: (
    <>
      We&apos;ll email you a secure one-click link. No password needed.
      <br />
      Trial starts only when you connect your Pinterest.
    </>
  ),

  successTitle: "You're in — check your inbox",
  successBody1:
    "We've sent you a secure one-click access link. Your bonuses will be waiting inside your dashboard.",
  successBody2:
    "Connect your Pinterest and your first video starts generating immediately.",
  successHighlight: "Your Pinterest automation + all bonuses start today.",
  successSpamNote: "Can't find the email? Check your spam or promotions folder.",
} satisfies FunnelContentModel;

export const funnelYoutubeContent = {
  metaTitle: "QuotVid — Free YouTube Automation Trial",
  metaDescription:
    "5-day YouTube Shorts automation trial with QuotVid — no credit card.",

  urgencyStrong: "Limited Offer:",
  urgencyRest:
    "Free trial + 4 exclusive bonuses — available for a limited time only",

  eyebrow: "Free 5-Day YouTube Automation Trial",

  heroTitleLeading: <>Get Your YouTube Shorts</>,
  heroTitleItalic: "Posted For You",

  heroSub:
    "QuotVid creates and publishes Shorts to your channel every day — without you doing anything.",

  proofBullets: [
    { icon: "★", text: "No credit card required" },
    { icon: "✓", text: "5 free days, starts on connection" },
    { icon: "🔒", text: "Official YouTube API only" },
  ] as const,

  nicheFieldLabel: "Your channel niche",
  nichePlaceholder: "Select your niche…",
  nicheOptions: funnelPinterestContent.nicheOptions,

  goalPlaceholder: funnelPinterestContent.goalPlaceholder,
  goalOptions: funnelPinterestContent.goalOptions,

  chipOptions: funnelPinterestContent.chipOptions,

  formBonusRows: [
    { name: "5-Day YouTube Automation", valueFree: "FREE" },
    { name: "Niche Starter Video Pack", valueFree: "$29 free" },
    { name: "YouTube Shorts Growth Cheatsheet", valueFree: "$15 free" },
    { name: "Weekly Analytics Digest", valueFree: "$9/mo free" },
    { name: "Viral Hook Swipe File", valueFree: "$12 free" },
  ] as const,

  bonusesRibbon: "🎁 Exclusive Free Bonuses",
  bonusesHeadingLeading: <>Sign up today and get</>,
  bonusesHeadingItalic: "everything",
  bonusesSub:
    "When you start your free trial right now, you unlock these 4 bonuses — bundled automatically with your account.",

  bonusesPublic: [
    {
      icon: "🎬",
      tag: "Bonus #1",
      title: "Niche Starter Video Pack",
      description:
        "10 pre-built Shorts templates tuned to your niche — ready to publish from day one with zero editing.",
      priceOldLabel: "$29 value",
    },
    {
      icon: "⚡",
      tag: "Bonus #2",
      title: "YouTube Shorts Growth Cheatsheet",
      description:
        "The checklist top channels use — titles, hooks, hashtags, retention beats, and the best publishing windows.",
      priceOldLabel: "$15 value",
    },
    {
      icon: "🔔",
      tag: "Bonus #3",
      title: "Weekly Analytics Digest",
      description:
        "A weekly breakdown of what's working across your uploads — retention, CTR, and growth trends at a glance.",
      priceOldLabel: "$9/mo value",
    },
    {
      icon: "🔥",
      tag: "Bonus #4",
      title: "Viral Hook Swipe File",
      description:
        "50 opening lines that grab attention fast — paste them straight into your next Short.",
      priceOldLabel: "$12 value",
    },
  ] as const,

  bonusTotalFraction: "$65+ in free bonuses",
  bonusBadgeCta: "Yours free today →",

  ctas: [
    "Claim My Free Trial + Bonuses",
    "Start My Free Trial Now",
    "Yes — Automate My YouTube Free",
  ] as const,

  visualChrome: {
    barUrl: "youtube.com / your-channel",
    statusLine: "Auto-publishing active",
  },
  visualCards: [
    {
      dayLabel: "Short 1 · Dedication",
      statLabel: "▶ 12k views",
      videoSrc: "https://media.quotvid.com/videos/49/426.mp4",
    },
    {
      dayLabel: "Short 2 · Build in silence",
      statLabel: "▶ 8.4k views",
      videoSrc: "https://media.quotvid.com/videos/49/768.mp4",
    },
    {
      dayLabel: "Short 3 · Freedom",
      statLabel: "▶ 19k views",
      videoSrc: "https://media.quotvid.com/videos/49/777.mp4",
    },
    {
      dayLabel: "Short 4 · Modern mindset",
      statLabel: "▶ 5.2k views",
      videoSrc: "https://media.quotvid.com/videos/49/827.mp4",
    },
  ] as const,

  heroVisualPinsClassSuffix: " pin-yt" as const,

  problemLabel: "Why you're stuck",
  problemBlocks: [
    [
      { text: "You know daily uploads grow your channel." },
      { text: "But you haven't published in weeks.", dim: true },
    ],
    [
      { text: "Not because you're lazy —", dim: true },
      { text: "because editing and posting eat your time." },
    ],
    [
      { text: "So your channel stays quiet.", dim: true },
      { text: "Your momentum stalls.", dim: true },
      { text: "And nothing compounds.", gold: true },
    ],
  ] as const,

  solutionEyebrow: "The fix",
  solutionTitleLeading: <>What if your YouTube Shorts pipeline</>,
  solutionTitleItalic: "ran itself?",
  solutionBody: (
    <>
      No burnout. No last-minute scrambling.
      <br />
      QuotVid generates niche-specific Shorts and publishes them for you — every single day.
    </>
  ),

  stepsEyebrow: "How it works",
  stepsTitle: "Three steps, then you're done",
  steps: [
    {
      title: "Enter your details",
      body: "Tell us your niche and goal. Takes 60 seconds. No password required.",
    },
    {
      title: "Connect YouTube",
      body: "One-time OAuth. Your 5-day free trial starts the moment you connect.",
    },
    {
      title: "We publish daily",
      body: "One custom Short generated and published to your channel every single day.",
    },
  ] as const,

  midBannerTitleLeading: <>Sounds good?</>,
  midBannerTitleItalic: "Let's start.",
  midBannerSub:
    "Your first Short can be queued within minutes of signing up. No waiting. No editing marathon.",

  outcomeEyebrow: "What you get",
  outcomeTitle: "Everything included in your free trial",
  outcomeBullets: [
    "Daily YouTube Short — generated for your niche",
    "Auto-published every day for 5 days",
    "Niche Starter Video Pack (10 templates)",
    "YouTube Shorts Growth Cheatsheet",
    "Weekly Analytics Digest",
    "Viral Hook Swipe File (50 hooks)",
    "Zero editing marathons. No manual uploads.",
  ] as const,

  trustTitle: "Your account is 100% safe",
  trustItems: [
    "Official YouTube API — no shady automation",
    "We never access private messages",
    "We never store your login password",
    "Disconnect access anytime from Google / YouTube settings",
    "Content tailored to your niche — not generic",
    "Trial starts on connection, not signup",
  ] as const,

  finalBannerTitleLeading: <>Ready to</>,
  finalBannerTitleItalic: "hand off the grind?",
  finalBannerSub:
    "Give your channel consistent daily uploads without sacrificing your evenings. QuotVid handles the repetition.",

  submitButtonLabel: "🎁 Claim Free Trial + All Bonuses →",
  formMicro: (
    <>
      We&apos;ll email you a secure one-click link. No password needed.
      <br />
      Trial starts only when you connect your YouTube channel.
    </>
  ),

  successTitle: "You're in — check your inbox",
  successBody1:
    "We've sent you a secure one-click access link. Your bonuses will be waiting inside your dashboard.",
  successBody2:
    "Connect your YouTube channel and your first Short starts generating immediately.",
  successHighlight: "Your YouTube automation + all bonuses start today.",
  successSpamNote: "Can't find the email? Check your spam or promotions folder.",
} satisfies FunnelContentModel;

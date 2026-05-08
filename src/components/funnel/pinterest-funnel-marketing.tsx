"use client";

import type { ReactNode } from "react";

interface PinterestMarketingProps {
  onOpenPrimaryCta: () => void;
}

function SecondaryCta({
  children,
  onOpenPrimaryCta,
}: {
  children: ReactNode;
  onOpenPrimaryCta: () => void;
}) {
  return (
    <button
      type="button"
      className="qf-secondary-cta"
      onClick={onOpenPrimaryCta}
    >
      {children}
    </button>
  );
}

export function PinterestScarcitySection({
  onOpenPrimaryCta,
}: PinterestMarketingProps) {
  return (
    <section className="qf-section qf-scarcity-section" aria-labelledby="qf-scarcity-heading">
      <div className="qf-container qf-scarcity-inner">
        <div className="qf-urgency-card">
          <div className="qf-urgency-icon" aria-hidden>
            ⏰
          </div>
          <h2 id="qf-scarcity-heading" className="qf-scarcity-h2">
            Limited Time Offer — Act Fast
          </h2>
          <p className="qf-scarcity-lead">
            Only <strong>50 trial spots</strong> available this month.
          </p>
          <p className="qf-scarcity-body">
            After that, Pinterest automation moves to{" "}
            <span className="qf-strike">$29/month</span> paid plans only.
          </p>
          <p className="qf-scarcity-cta-line">
            Lock in your free 5-day trial before spots fill.
          </p>
          <div className="qf-spots-wrap">
            <div className="qf-progress-bar">
              <div className="qf-progress-fill" />
            </div>
            <p className="qf-spots-text">
              👥 <strong>37 spots claimed today</strong> · 13 remaining
            </p>
          </div>
          <SecondaryCta onOpenPrimaryCta={onOpenPrimaryCta}>
            Claim My Free Trial Before It&apos;s Gone
          </SecondaryCta>
        </div>
      </div>
    </section>
  );
}

export function PinterestTrendSection() {
  return (
    <section className="qf-section qf-trend-section" aria-labelledby="qf-trend-heading">
      <div className="qf-container qf-trend-wide">
        <div className="qf-trend-header">
          <span className="qf-emoji-large" aria-hidden>
            📊
          </span>
          <h2 id="qf-trend-heading" className="qf-trend-h2">
            Pinterest Is Exploding Right Now
            <br />
            <span className="qf-trend-sub">(And You&apos;re Missing Out)</span>
          </h2>
        </div>
        <div className="qf-stats-grid">
          <div className="qf-stat-card">
            <h3>465M+</h3>
            <p>Monthly active users</p>
            <span className="qf-stat-badge qf-stat-growth">↑ 11% year-over-year</span>
          </div>
          <div className="qf-stat-card">
            <h3>3×</h3>
            <p>More engagement on video pins vs static images</p>
            <span className="qf-stat-badge qf-stat-highlight">Video is king</span>
          </div>
          <div className="qf-stat-card">
            <h3>33%</h3>
            <p>More referral traffic than Facebook</p>
            <span className="qf-stat-badge qf-stat-highlight">Better ROI</span>
          </div>
          <div className="qf-stat-card">
            <h3>85%</h3>
            <p>Of users plan purchases on Pinterest</p>
            <span className="qf-stat-badge qf-stat-highlight">High buyer intent</span>
          </div>
        </div>
        <div className="qf-trend-insight">
          <p className="qf-insight-lead">
            <strong>But here&apos;s the problem:</strong>
          </p>
          <p>Consistency beats quality on Pinterest.</p>
          <p>One viral pin won&apos;t grow your account.</p>
          <p>
            <strong>Daily posting will.</strong>
          </p>
          <p className="qf-insight-cta">
            That&apos;s exactly what QuotVid does for you.
          </p>
        </div>
      </div>
    </section>
  );
}

export function PinterestPainSection() {
  return (
    <section className="qf-section qf-pain-section" aria-labelledby="qf-pain-h2">
      <div className="qf-container qf-narrow qf-pain-inner">
        <h2 id="qf-pain-h2">You Know Daily Posting Grows Your Pinterest</h2>
        <h3 className="qf-pain-sub">But you haven&apos;t posted in weeks.</h3>
        <p className="qf-pain-intro">Not because you&apos;re lazy.</p>
        <p className="qf-pain-because">
          <strong>Because:</strong>
        </p>
        <ul className="qf-pain-list">
          <li>You&apos;re juggling 10 other things in your business</li>
          <li>Creating videos takes 30+ minutes each</li>
          <li>You forget to post consistently</li>
          <li>You run out of content ideas constantly</li>
          <li>Video editing burns you out</li>
          <li>Scheduling tools still require manual work</li>
        </ul>
        <div className="qf-consequence">
          <p>
            So your profile stays <strong>quiet</strong>.
          </p>
          <p>
            Your reach stays <strong>flat</strong>.
          </p>
          <p>
            Your competitors keep <strong>growing</strong>.
          </p>
          <p className="qf-pain-emphasis">
            And you watch other creators blow up while you stay stuck.
          </p>
        </div>
        <p className="qf-pain-question">
          <strong>Sound familiar?</strong>
        </p>
      </div>
    </section>
  );
}

export function PinterestSocialProofSection({
  onOpenPrimaryCta,
}: PinterestMarketingProps) {
  return (
    <section className="qf-section qf-social-section" aria-labelledby="qf-social-heading">
      <div className="qf-container qf-social-wide">
        <div className="qf-section-header qf-center">
          <h2 id="qf-social-heading">Real Results From Real Pinterest Creators</h2>
          <p className="qf-subtitle">
            See what happens when you let QuotVid run your Pinterest
          </p>
        </div>
        <div className="qf-testimonials-grid">
          <article className="qf-testimonial-card">
            <div className="qf-quote-icon" aria-hidden>
              “
            </div>
            <p className="qf-testimonial-text">
              I went from posting once a week to daily without lifting a finger.
              My saves tripled in the first month. QuotVid is the only reason my
              Pinterest actually grows now.
            </p>
            <div className="qf-testimonial-author">
              <div className="qf-author-avatar">SM</div>
              <div>
                <p className="qf-author-name">Sarah M.</p>
                <p className="qf-author-title">Lifestyle Creator</p>
              </div>
            </div>
            <div className="qf-testimonial-stats">
              <span className="qf-pill-stat">↑ 312% saves</span>
              <span className="qf-pill-stat">2.4k followers gained</span>
            </div>
          </article>
          <article className="qf-testimonial-card">
            <div className="qf-quote-icon" aria-hidden>
              “
            </div>
            <p className="qf-testimonial-text">
              QuotVid saved me 10+ hours every week. My Pinterest finally grows
              while I sleep. I wish I&apos;d found this 6 months ago—I&apos;d have 10x the
              audience by now.
            </p>
            <div className="qf-testimonial-author">
              <div className="qf-author-avatar qf-avatar-2">MT</div>
              <div>
                <p className="qf-author-name">Mike T.</p>
                <p className="qf-author-title">Business Coach</p>
              </div>
            </div>
            <div className="qf-testimonial-stats">
              <span className="qf-pill-stat">10 hrs/week saved</span>
              <span className="qf-pill-stat">Daily posting streak: 47 days</span>
            </div>
          </article>
          <article className="qf-testimonial-card">
            <div className="qf-quote-icon" aria-hidden>
              “
            </div>
            <p className="qf-testimonial-text">
              I was skeptical about automation, but the videos actually look good.
              People engage with them like I made them myself. Game-changer for
              solopreneurs.
            </p>
            <div className="qf-testimonial-author">
              <div className="qf-author-avatar qf-avatar-3">JL</div>
              <div>
                <p className="qf-author-name">Jessica L.</p>
                <p className="qf-author-title">Digital Marketer</p>
              </div>
            </div>
            <div className="qf-testimonial-stats">
              <span className="qf-pill-stat">↑ 156% engagement</span>
              <span className="qf-pill-stat">Zero manual work</span>
            </div>
          </article>
        </div>
        <div className="qf-aggregate-stats">
          <div>
            <h3>12,000+</h3>
            <p>Videos generated</p>
          </div>
          <div>
            <h3>2.4M</h3>
            <p>Total saves on automated pins</p>
          </div>
          <div>
            <h3>400+</h3>
            <p>Hours saved per creator</p>
          </div>
        </div>
        <SecondaryCta onOpenPrimaryCta={onOpenPrimaryCta}>
          Join 2,000+ Creators Using QuotVid
        </SecondaryCta>
      </div>
    </section>
  );
}

export function PinterestFeaturesSection({
  onOpenPrimaryCta,
}: PinterestMarketingProps) {
  return (
    <section className="qf-section qf-features-section" aria-labelledby="qf-features-heading">
      <div className="qf-container qf-features-wide">
        <h2 id="qf-features-heading" className="qf-features-h2 qf-center">
          Everything You Get
          <br />
          <span className="qf-features-inline-sub">
            (No Hidden Costs, No Upsells)
          </span>
        </h2>
        <div className="qf-features-grid">
          <div className="qf-feature-card">
            <div className="qf-feature-icon" aria-hidden>
              🎬
            </div>
            <h3>AI-Generated Videos</h3>
            <p>
              Niche-specific quote videos created daily using advanced AI. No
              templates—every video is unique to your brand voice.
            </p>
          </div>
          <div className="qf-feature-card">
            <div className="qf-feature-icon" aria-hidden>
              ⚡
            </div>
            <h3>Smart Scheduling</h3>
            <p>
              We post at optimal times for your niche automatically. Your audience
              sees content when they&apos;re most active.
            </p>
          </div>
          <div className="qf-feature-card">
            <div className="qf-feature-icon" aria-hidden>
              🔍
            </div>
            <h3>Pinterest SEO</h3>
            <p>
              Every pin includes keyword-optimized titles and descriptions.
              Designed to rank in Pinterest search results.
            </p>
          </div>
          <div className="qf-feature-card">
            <div className="qf-feature-icon" aria-hidden>
              📊
            </div>
            <h3>Analytics Dashboard</h3>
            <p>
              See which videos drive the most saves, clicks, and engagement. Know
              what&apos;s working in real-time.
            </p>
          </div>
          <div className="qf-feature-card">
            <div className="qf-feature-icon" aria-hidden>
              📌
            </div>
            <h3>Multi-Board Support</h3>
            <p>
              Auto-post to multiple Pinterest boards for maximum reach.{" "}
              <span className="qf-badge-soon">Coming Soon</span>
            </p>
          </div>
          <div className="qf-feature-card">
            <div className="qf-feature-icon" aria-hidden>
              🎨
            </div>
            <h3>Custom Branding</h3>
            <p>
              Add your logo, colors, and custom fonts to match your brand.{" "}
              <span className="qf-badge-pro">Pro Plan</span>
            </p>
          </div>
        </div>
        <SecondaryCta onOpenPrimaryCta={onOpenPrimaryCta}>
          Yes — Automate My Pinterest Free
        </SecondaryCta>
      </div>
    </section>
  );
}

const FAQ_ITEMS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Do I need to create videos myself?",
    a: "Nope. QuotVid generates them automatically based on your niche and goals. You literally do nothing after connecting your Pinterest account.",
  },
  {
    q: "Will this spam my Pinterest account?",
    a: "No. We post 1 video per day during your trial (5 total videos). Pinterest actually rewards consistent daily posting with higher reach—this is the ideal frequency.",
  },
  {
    q: "What if I don't like the videos?",
    a: "After your trial, you can upgrade to our Pro plan to customize style, fonts, colors, and even write custom prompts. Trial videos are designed to work for 80% of creators—Pro customization handles the other 20%.",
  },
  {
    q: "Can I use this for multiple Pinterest accounts?",
    a: "Not during the trial. Each trial is limited to one Pinterest account. Our Pro plan supports up to 3 accounts.",
  },
  {
    q: "Is this against Pinterest's terms of service?",
    a: "Absolutely not. We use Pinterest's official API with OAuth authentication. You're 100% compliant and safe. We never do anything that could get your account flagged.",
  },
  {
    q: "When does my trial start?",
    a: "Your 5-day trial starts the moment you connect your Pinterest account—not when you sign up. This means you get the full 5 days of automation after connection.",
  },
  {
    q: "What happens after the trial ends?",
    a: "You'll receive an email with options to upgrade to a paid plan or continue with our limited free plan (1 manual video per day, no auto-posting). Your trial videos stay on your Pinterest—we never delete your content.",
  },
];

export function PinterestFaqSection({
  onOpenPrimaryCta,
}: PinterestMarketingProps) {
  return (
    <section className="qf-section qf-faq-section" aria-labelledby="qf-faq-heading">
      <div className="qf-container qf-narrow">
        <h2 id="qf-faq-heading" className="qf-center">
          Common Questions
        </h2>
        <div className="qf-faq-list">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="qf-faq-item">
              <summary>{item.q}</summary>
              <div className="qf-faq-answer">
                <p>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
        <SecondaryCta onOpenPrimaryCta={onOpenPrimaryCta}>
          Start My 5-Day Free Trial Now
        </SecondaryCta>
      </div>
    </section>
  );
}

export function PinterestGuaranteeStrip() {
  return (
    <section
      className="qf-section qf-guarantee-section"
      aria-labelledby="qf-guarantee-heading"
    >
      <div className="qf-container qf-narrow">
        <div className="qf-guarantee-card">
          <h2 id="qf-guarantee-heading" className="qf-guarantee-h">
            Risk-free trial
          </h2>
          <p className="qf-guarantee-body">
            No credit card to start. Official Pinterest API only. Disconnect anytime
            from Pinterest settings. We never hold your content hostage—you keep every
            pin you publish.
          </p>
        </div>
      </div>
    </section>
  );
}

export function PinterestFounderSection() {
  return (
    <section className="qf-section qf-founder-section" aria-labelledby="qf-founder-heading">
      <div className="qf-container qf-narrow">
        <div className="qf-founder-card">
          <div className="qf-founder-visual">
            <div className="qf-founder-avatar" aria-hidden>
              QV
            </div>
          </div>
          <div className="qf-founder-content">
            <h3 id="qf-founder-heading">Why We Built QuotVid</h3>
            <p>
              We built QuotVid because manual Pinterest posting doesn&apos;t scale.
              Creators were losing hours every week to editing and scheduling—time
              better spent on their business.
            </p>
            <p>
              The goal is simple: your niche, your schedule, your account—running on
              autopilot with content that still feels human.
            </p>
            <p className="qf-founder-cta">
              <strong>
                If you&apos;re done babysitting the upload button, this is for you.
              </strong>
            </p>
            <p className="qf-founder-sig">— The QuotVid team</p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type { FunnelContentModel, FunnelSlug } from "@/funnels/funnel-models";
import { FunnelVideoMosaic } from "@/components/funnel/FunnelVideoMosaic";
import {
  PinterestFaqSection,
  PinterestFeaturesSection,
  PinterestFounderSection,
  PinterestGuaranteeStrip,
  PinterestPainSection,
  PinterestScarcitySection,
  PinterestSocialProofSection,
  PinterestTrendSection,
} from "@/components/funnel/pinterest-funnel-marketing";

const CTA_IDS = ["cta1", "cta2", "cta3"] as const;

function IconClock() {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle
        cx="7"
        cy="7"
        r="6"
        stroke="rgba(255,255,255,0.8)"
        strokeWidth={1.2}
      />
      <path
        d="M7 4v3.5l2 1.5"
        stroke="white"
        strokeWidth={1.2}
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCtaArrow() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3 3l8 8M11 3l-8 8"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconLockSmall() {
  return (
    <svg width={11} height={11} viewBox="0 0 11 11" fill="none" aria-hidden>
      <rect
        x="1.5"
        y="4.5"
        width={8}
        height={5}
        rx={1}
        stroke="#8896A8"
        strokeWidth={1}
      />
      <path
        d="M3.5 4.5V3a2 2 0 014 0v1.5"
        stroke="#8896A8"
        strokeWidth={1}
      />
    </svg>
  );
}

/** Inline spinner for submit button while funnel POST is in flight */
function SubmitSpinner() {
  return (
    <span className="qf-submit-spinner" aria-hidden />
  );
}

function IconShieldGold() {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 2L4 4.5v5c0 4 2.8 7.7 6 9C16.2 17.2 18 13.5 18 9.5v-5L10 2z"
        stroke="#B7781A"
        strokeWidth={1.4}
        fill="rgba(226,161,40,0.08)"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function flashField(el: HTMLElement) {
  const prevBorder = el.style.borderColor;
  const prevShadow = el.style.boxShadow;
  el.style.borderColor = "#DC2626";
  el.style.boxShadow = "0 0 0 3px rgba(220,38,38,0.15)";
  setTimeout(() => {
    el.style.borderColor = prevBorder;
    el.style.boxShadow = prevShadow;
  }, 2500);
}

interface FunnelCtaBlockProps {
  model: FunnelContentModel;
  funnelSlug: FunnelSlug;
  ctaIndex: 0 | 1 | 2;
  openCtaId: string | null;
  onToggleCta: (nextId: string) => void;
  submissionLocked: boolean;
  onSubmitSuccess: () => void;
}

function FunnelCtaBlock({
  model,
  funnelSlug,
  ctaIndex,
  openCtaId,
  onToggleCta,
  submissionLocked,
  onSubmitSuccess,
}: FunnelCtaBlockProps) {
  const ctaDomId = CTA_IDS[ctaIndex];
  const labelClosed = model.ctas[ctaIndex];

  const [email, setEmail] = useState("");
  const [niche, setNiche] = useState("");
  const [goal, setGoal] = useState("");
  const [chipsSel, setChipsSel] = useState(() => new Set<string>());
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showSignInLink, setShowSignInLink] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const nicheRef = useRef<HTMLSelectElement>(null);
  const goalRef = useRef<HTMLSelectElement>(null);

  const formIdBase = useId();
  const emailId = `${formIdBase}-email`;
  const nicheId = `${formIdBase}-niche`;
  const goalId = `${formIdBase}-goal`;

  /** Success keeps the panel expanded; collapse other panels after a global lock */
  const panelIsOpen =
    success ||
    (openCtaId === ctaDomId && !success && !submissionLocked);

  /** Grey "Close Form" only while this panel is the active open slot (or after success) */
  const showCloseAppearance =
    success ||
    (openCtaId === ctaDomId && !success && !submissionLocked);

  /** After first successful submit anywhere, freeze all CTAs (matches original locking) */
  const ctaButtonDisabled = submissionLocked || success || isSubmitting;

  useEffect(() => {
    const shouldFocus =
      openCtaId === ctaDomId && !submissionLocked && !success;
    if (!shouldFocus) return;
    const t = window.setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      emailRef.current?.focus();
    }, 120);
    return () => window.clearTimeout(t);
  }, [openCtaId, ctaDomId, submissionLocked, success]);

  const toggleChip = useCallback((t: string) => {
    setChipsSel((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }, []);

  const handleCtaClick = () => {
    if (ctaButtonDisabled) return;
    onToggleCta(ctaDomId);
  };

  const handleSubmit = async () => {
    const trimmed = email.trim();
    const at = trimmed.indexOf("@");
    if (!trimmed || at <= 0) {
      if (emailRef.current) flashField(emailRef.current);
      emailRef.current?.focus();
      return;
    }
    const local = trimmed.slice(0, at);
    if (local.includes("+")) {
      if (emailRef.current) flashField(emailRef.current);
      emailRef.current?.focus();
      return;
    }
    if (!niche && nicheRef.current) {
      flashField(nicheRef.current);
      return;
    }
    if (!goal && goalRef.current) {
      flashField(goalRef.current);
      return;
    }

    setApiError(null);
    setShowSignInLink(false);
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/funnel/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          platform: funnelSlug,
          niche,
          primary_goal: goal,
          content_tones: [...chipsSel],
        }),
      });
      const data = await res.json() as Record<string, unknown>;

      if (!res.ok) {
        const detail = data.detail as Record<string, string> | string | undefined;
        const code =
          typeof detail === "object" && detail !== null ? detail.code : undefined;
        const msg =
          typeof detail === "object" && detail !== null
            ? (detail.message ?? "Something went wrong. Please try again.")
            : (typeof detail === "string" ? detail : "Something went wrong. Please try again.");
        setApiError(msg);
        if (code === "user_exists") setShowSignInLink(true);
        return;
      }

      setSuccess(true);
      onSubmitSuccess();
    } catch {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /** Losers fade after someone completes a submission (winner stays full contrast) */
  const dimOthers = submissionLocked && !success;

  return (
    <div className="cta-block">
      <button
        type="button"
        className={`btn-cta ${showCloseAppearance ? "active-open" : ""} ${dimOthers ? "qf-cta-dimmed" : ""}`}
        data-cta={ctaDomId}
        disabled={ctaButtonDisabled}
        aria-expanded={panelIsOpen}
        onClick={handleCtaClick}
      >
        {showCloseAppearance ? (
          <>
            Close Form <IconClose />
          </>
        ) : (
          <>
            {labelClosed} <IconCtaArrow />
          </>
        )}
      </button>

      <div className="btn-sub">
        <IconLockSmall />
        No spam. Unsubscribe anytime.
      </div>

      <div
        ref={panelRef}
        className={`inline-form-panel ${panelIsOpen ? "open" : ""}`}
        id={`panel-${ctaDomId}`}
      >
        <div className="form-card">
          {!success ? (
            <div className="form-inner-state">
              <div className="form-bonuses">
                <div className="form-bonuses-title">✦ You&apos;re unlocking</div>
                {model.formBonusRows.map((row) => (
                  <div key={row.name} className="form-bonus-item">
                    <span className="fbi-check">✓</span>
                    <span className="fbi-name">{row.name}</span>
                    <span className="fbi-val">{row.valueFree}</span>
                  </div>
                ))}
              </div>

              <div className="field-group">
                <label htmlFor={emailId}>Email address</label>
                <input
                  ref={emailRef}
                  id={emailId}
                  type="email"
                  className="f-email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="field-group">
                <label htmlFor={nicheId}>{model.nicheFieldLabel}</label>
                <select
                  ref={nicheRef}
                  id={nicheId}
                  className="f-niche"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                >
                  <option value="" disabled>
                    {model.nichePlaceholder}
                  </option>
                  {model.nicheOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label htmlFor={goalId}>Primary goal</label>
                <select
                  ref={goalRef}
                  id={goalId}
                  className="f-goal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option value="" disabled>
                    {model.goalPlaceholder}
                  </option>
                  {model.goalOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="chips-label">Content tone (pick any)</span>
                <div className="chips" role="group" aria-label="Content tone">
                  {model.chipOptions.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`chip ${chipsSel.has(c) ? "selected" : ""}`}
                      aria-pressed={chipsSel.has(c)}
                      onClick={() => toggleChip(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className={`btn-submit${isSubmitting ? " btn-submit--loading" : ""}`}
                onClick={() => { void handleSubmit(); }}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                <span className="btn-submit-inner">
                  {isSubmitting ? (
                    <>
                      <SubmitSpinner />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <span>{model.submitButtonLabel}</span>
                  )}
                </span>
              </button>
              {apiError && (
                <div className="qf-form-api-error" style={{ marginTop: 8, textAlign: "center" }}>
                  <p className="qf-form-api-error-msg">{apiError}</p>
                  {showSignInLink && (
                    <a
                      href={`${process.env.NEXT_PUBLIC_APP_URL ?? "https://app.quotvid.com"}/auth/signin`}
                      className="qf-form-signin-link"
                    >
                      Sign in to your account →
                    </a>
                  )}
                </div>
              )}
              <p className="form-micro">{model.formMicro}</p>
              <p className="form-legal">
                By continuing you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>
              </p>
            </div>
          ) : (
            <div className="success-state show">
              <div className="success-icon">✓</div>
              <h2>{model.successTitle}</h2>
              <p>{model.successBody1}</p>
              <p>{model.successBody2}</p>
              <p className="s-hi">{model.successHighlight}</p>
              <p className="s-note">{model.successSpamNote}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export interface AcquisitionFunnelProps {
  model: FunnelContentModel;
  funnelSlug: FunnelSlug;
}

export function AcquisitionFunnel({ model, funnelSlug }: AcquisitionFunnelProps) {
  const [openCtaId, setOpenCtaId] = useState<string | null>(null);
  const [submissionLocked, setSubmissionLocked] = useState(false);
  const motionRootRef = useRef<HTMLDivElement>(null);

  const isPinterest = funnelSlug === "pinterest";

  useEffect(() => {
    const root = motionRootRef.current;
    if (!root) return;
    if (typeof window.matchMedia !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = root.querySelectorAll<HTMLElement>("[data-qf-reveal]");
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("qf-revealed");
          io.unobserve(entry.target);
        }
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggleCta = useCallback((id: string) => {
    setOpenCtaId((prev) => (prev === id ? null : id));
  }, []);

  const lockAfterSuccess = useCallback(() => {
    setSubmissionLocked(true);
  }, []);

  const openPrimaryCta = useCallback(() => {
    const anchor = document.getElementById("funnel-cta-anchor");
    anchor?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      document
        .querySelector<HTMLButtonElement>('button[data-cta="cta1"]')
        ?.click();
    }, 280);
  }, []);

  return (
    <div ref={motionRootRef}>
      <div className="urgency-bar">
        <IconClock />
        <strong>{model.urgencyStrong}</strong>
        <span>{model.urgencyRest}</span>
      </div>

      <div className={isPinterest ? "hero hero--pinterest" : "hero"}>
        <div className="logo-wrap fu fu1">
          <Image
            src="/assets/quotvid_black_logo.svg"
            alt="QuotVid"
            width={500}
            height={155}
            priority
            className="h-11 w-auto max-w-[min(100%,280px)] object-contain object-left"
          />
        </div>

        <div className="eyebrow fu fu2">
          <span className="eyebrow-dot" />
          {model.eyebrow}
        </div>

        <h1 className="fu fu3">
          {model.heroTitleLeading}
          <br />
          <em>{model.heroTitleItalic}</em>
        </h1>

        <p className="hero-sub fu fu4">{model.heroSub}</p>

        <div className="hero-proof-row fu fu4">
          {model.proofBullets.map((p) => (
            <div key={p.text} className="pip">
              <div className="pip-icon">{p.icon}</div>
              {p.text}
            </div>
          ))}
        </div>

        <div id="funnel-cta-anchor" className="qf-cta-anchor fu fu5">
          <FunnelCtaBlock
            model={model}
            funnelSlug={funnelSlug}
            ctaIndex={0}
            openCtaId={openCtaId}
            onToggleCta={toggleCta}
            submissionLocked={submissionLocked}
            onSubmitSuccess={lockAfterSuccess}
          />
        </div>

      </div>

      {!isPinterest && (
        <section className="qf-yt-preview-section fu fu6" aria-label="Example Shorts on your channel">
          <div className="qf-yt-preview-inner">
            <div className={`hero-visual hero-visual--youtube-mosaic${model.heroVisualPinsClassSuffix}`}>
              <div className="visual-bar visual-bar--yt-dark">
                <div className="visual-bar-dot" style={{ background: "#FF5F57" }} />
                <div className="visual-bar-dot" style={{ background: "#FFBD2E" }} />
                <div className="visual-bar-dot" style={{ background: "#28C840" }} />
                <span className="qf-visual-bar-url">
                  {model.visualChrome.barUrl}
                </span>
                <span className="qf-visual-bar-status qf-visual-bar-status--yt">
                  <span className="qf-visual-bar-status-dot qf-visual-bar-status-dot--yt" aria-hidden />
                  {model.visualChrome.statusLine}
                </span>
              </div>
              <FunnelVideoMosaic
                visualCards={model.visualCards}
                heroVisualPinsClassSuffix={model.heroVisualPinsClassSuffix}
                carouselAriaLabel="Swipe to see example Shorts on your channel"
              />
            </div>
          </div>
        </section>
      )}

      {isPinterest && (
        <>
          <PinterestScarcitySection onOpenPrimaryCta={openPrimaryCta} />
          <div
            className={`hero-visual hero-visual--pinterest-mosaic fu fu6${model.heroVisualPinsClassSuffix}`}
          >
            <div className="visual-bar">
              <div className="visual-bar-dot" style={{ background: "#FF5F57" }} />
              <div className="visual-bar-dot" style={{ background: "#FFBD2E" }} />
              <div className="visual-bar-dot" style={{ background: "#28C840" }} />
              <span className="qf-visual-bar-url">{model.visualChrome.barUrl}</span>
              <span className="qf-visual-bar-status">
                <span className="qf-visual-bar-status-dot" aria-hidden />
                {model.visualChrome.statusLine}
              </span>
            </div>
            <FunnelVideoMosaic
              visualCards={model.visualCards}
              heroVisualPinsClassSuffix={model.heroVisualPinsClassSuffix}
              carouselAriaLabel="Swipe to browse example Pins on your profile"
            />
          </div>
        </>
      )}

      <hr />

      {isPinterest ? (
        <PinterestPainSection />
      ) : (
      <div className="problem-bg" data-qf-reveal>
        <div className="problem-inner">
          <div className="label">{model.problemLabel}</div>
          {model.problemBlocks.map((block, bi) => (
            <div key={bi}>
              {block.map((line, li) => (
                <div
                  key={`${bi}-${li}`}
                  className={`problem-line${line.dim ? " dim" : ""}${line.gold ? " accent-gold" : ""}`}
                >
                  {line.text}
                </div>
              ))}
              {bi < model.problemBlocks.length - 1 ? (
                <div className="problem-break" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
      )}

      {isPinterest && (
        <>
          <hr />
          <PinterestTrendSection />
        </>
      )}

      <div className="section tight" style={{ textAlign: "center" }} data-qf-reveal>
        <div className="label center">{model.solutionEyebrow}</div>
        <div className="h2 center">
          {model.solutionTitleLeading}
          <br />
          <em>{model.solutionTitleItalic}</em>
        </div>
        <p className="body center">{model.solutionBody}</p>
      </div>

      <hr />

      <div className="section" data-qf-reveal>
        <div className="label">{model.stepsEyebrow}</div>
        <div className="h2">{model.stepsTitle}</div>
        <div className="steps">
          {model.steps.map((step, idx) => (
            <div key={step.title} className="step-card">
              <div className="step-num">
                {(idx + 1).toString().padStart(2, "0")}
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>

        <div className="cta-banner">
          <h3>
            {model.midBannerTitleLeading} <em>{model.midBannerTitleItalic}</em>
          </h3>
          <p>{model.midBannerSub}</p>
          <FunnelCtaBlock
            model={model}
            funnelSlug={funnelSlug}
            ctaIndex={1}
            openCtaId={openCtaId}
            onToggleCta={toggleCta}
            submissionLocked={submissionLocked}
            onSubmitSuccess={lockAfterSuccess}
          />
        </div>
      </div>

      {isPinterest && (
        <PinterestSocialProofSection onOpenPrimaryCta={openPrimaryCta} />
      )}

      <hr />

      <div className="bonuses-bg" data-qf-reveal>
        <div className="bonus-header">
          <div className="bonus-ribbon">{model.bonusesRibbon}</div>
          <div className="h2 center">
            {model.bonusesHeadingLeading}
            <br />
            <em>{model.bonusesHeadingItalic}</em> for free
          </div>
          <p className="body center">{model.bonusesSub}</p>
        </div>
        <div className="bonus-grid">
          {model.bonusesPublic.map((b) => (
            <div key={b.title} className="bonus-card">
              <div className="bonus-icon">{b.icon}</div>
              <div className="bonus-tag">{b.tag}</div>
              <h3>{b.title}</h3>
              <p>{b.description}</p>
              <div className="bonus-value">
                <span className="bonus-price-old">{b.priceOldLabel}</span>
                <span className="bonus-price-free">FREE</span>
              </div>
            </div>
          ))}
        </div>
        <div className="bonus-total-bar">
          <div>
            <div className="label-sm">Total bonus value</div>
            <div className="total">{model.bonusTotalFraction}</div>
          </div>
          <div className="free-badge">{model.bonusBadgeCta}</div>
        </div>
      </div>

      {isPinterest && <PinterestFeaturesSection onOpenPrimaryCta={openPrimaryCta} />}

      <div className="section tight" data-qf-reveal>
        <div className="label">{model.outcomeEyebrow}</div>
        <div className="h2">{model.outcomeTitle}</div>
        <ul className="outcome-list">
          {model.outcomeBullets.map((txt) => (
            <li key={txt}>
              <span className="oi">✓</span>
              {txt}
            </li>
          ))}
        </ul>

        <div className="trust-block">
          <h3>
            <IconShieldGold /> {model.trustTitle}
          </h3>
          <div className="trust-items">
            {model.trustItems.map((txt) => (
              <div key={txt} className="trust-item">
                <span className="tcheck">✓</span>
                {txt}
              </div>
            ))}
          </div>
        </div>

        {isPinterest && (
          <>
            <PinterestFaqSection onOpenPrimaryCta={openPrimaryCta} />
            <PinterestFounderSection />
            <PinterestGuaranteeStrip />
          </>
        )}

        <div className="cta-banner" style={{ marginTop: 40 }}>
          <h3>
            {model.finalBannerTitleLeading}{" "}
            <em>{model.finalBannerTitleItalic}</em>
          </h3>
          <p>{model.finalBannerSub}</p>
          <FunnelCtaBlock
            model={model}
            funnelSlug={funnelSlug}
            ctaIndex={2}
            openCtaId={openCtaId}
            onToggleCta={toggleCta}
            submissionLocked={submissionLocked}
            onSubmitSuccess={lockAfterSuccess}
          />
        </div>
      </div>
    </div>
  );
}

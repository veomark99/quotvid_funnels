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
import { resolveFunnelVideoSrc } from "@/lib/funnel-video";

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
  const ctaButtonDisabled = submissionLocked || success;

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

  const handleSubmit = () => {
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

    const tones = [...chipsSel];
    console.debug("[funnel submit]", {
      funnelSlug,
      email: trimmed,
      niche,
      goal,
      tones,
    });

    setSuccess(true);
    onSubmitSuccess();
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

              <button type="button" className="btn-submit" onClick={handleSubmit}>
                {model.submitButtonLabel}
              </button>
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

  const toggleCta = useCallback((id: string) => {
    setOpenCtaId((prev) => (prev === id ? null : id));
  }, []);

  const lockAfterSuccess = useCallback(() => {
    setSubmissionLocked(true);
  }, []);

  return (
    <>
      <div className="urgency-bar">
        <IconClock />
        <strong>{model.urgencyStrong}</strong>
        <span>{model.urgencyRest}</span>
      </div>

      <div className="hero">
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

        <div className="fu fu5">
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

        <div className={`hero-visual fu fu6${model.heroVisualPinsClassSuffix}`}>
          <div className="visual-bar">
            <div className="visual-bar-dot" style={{ background: "#FF5F57" }} />
            <div className="visual-bar-dot" style={{ background: "#FFBD2E" }} />
            <div className="visual-bar-dot" style={{ background: "#28C840" }} />
            <span
              style={{
                marginLeft: 10,
                fontSize: 12,
                color: "var(--text-muted)",
              }}
            >
              {model.visualChrome.barUrl}
            </span>
            <span
              style={{
                marginLeft: "auto",
                fontSize: 11,
                color: "var(--green)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--green)",
                  display: "inline-block",
                }}
              />
              {model.visualChrome.statusLine}
            </span>
          </div>
          <div className="visual-pins">
            {model.visualCards.map((c, i) => {
              const videoUrl = resolveFunnelVideoSrc(c.videoSrc);
              const hasVideo = Boolean(videoUrl);
              return (
                <div key={i} className="pin">
                  <div
                    className={
                      hasVideo ? "pin-img pin-img--video" : "pin-img"
                    }
                  >
                    {hasVideo ? (
                      <>
                        <video
                          className="pin-video"
                          src={videoUrl}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          aria-hidden
                        />
                        <div className="pin-img-content">
                          <div className="pin-auto">✦ Auto</div>
                          <div className="pin-label">{c.dayLabel}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="pin-auto">✦ Auto</div>
                        <div className="pin-label">{c.dayLabel}</div>
                      </>
                    )}
                  </div>
                  <div className="pin-footer">
                    <div className="pin-stat">{c.statLabel}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <hr />

      <div className="problem-bg">
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

      <div className="section tight" style={{ textAlign: "center" }}>
        <div className="label center">{model.solutionEyebrow}</div>
        <div className="h2 center">
          {model.solutionTitleLeading}
          <br />
          <em>{model.solutionTitleItalic}</em>
        </div>
        <p className="body center">{model.solutionBody}</p>
      </div>

      <hr />

      <div className="section">
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

      <hr />

      <div className="bonuses-bg">
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

      <div className="section tight">
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
    </>
  );
}

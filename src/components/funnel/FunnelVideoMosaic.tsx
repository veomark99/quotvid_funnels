"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FunnelVisualCard } from "@/funnels/funnel-models";
import { resolveFunnelVideoSrc } from "@/lib/funnel-video";

function PinSlide({
  c,
  hasVideo,
  videoUrl,
}: {
  c: FunnelVisualCard;
  hasVideo: boolean;
  videoUrl?: string;
}) {
  return (
    <div className="pin">
      <div
        className={hasVideo ? "pin-img pin-img--video" : "pin-img"}
      >
        {hasVideo && videoUrl ? (
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
}

interface FunnelVideoMosaicProps {
  visualCards: readonly FunnelVisualCard[];
  heroVisualPinsClassSuffix: string;
}

export function FunnelVideoMosaic({
  visualCards,
  heroVisualPinsClassSuffix,
}: FunnelVideoMosaicProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const updateActive = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>(".qf-carousel-slide");
    if (!slide) return;
    const slideW = slide.offsetWidth;
    const gap = 16;
    const scroll = track.scrollLeft;
    const idx = Math.round(scroll / Math.max(slideW + gap, 1));
    setActiveDot(Math.min(visualCards.length - 1, Math.max(0, idx)));
  }, [visualCards.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateActive();
    track.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      track.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [updateActive]);

  return (
    <>
      <div
        className={`visual-pins visual-pins--desktop${heroVisualPinsClassSuffix}`}
      >
        {visualCards.map((c, i) => {
          const videoUrl = resolveFunnelVideoSrc(c.videoSrc);
          const hasVideo = Boolean(videoUrl);
          return (
            <PinSlide
              key={i}
              c={c}
              hasVideo={hasVideo}
              videoUrl={videoUrl}
            />
          );
        })}
      </div>

      <div className={`qf-video-carousel${heroVisualPinsClassSuffix}`}>
        <div
          ref={trackRef}
          className="qf-carousel-track"
          role="region"
          aria-label="Example Pinterest videos"
        >
          {visualCards.map((c, i) => {
            const videoUrl = resolveFunnelVideoSrc(c.videoSrc);
            const hasVideo = Boolean(videoUrl);
            return (
              <div
                key={i}
                className="qf-carousel-slide"
              >
                <PinSlide
                  c={c}
                  hasVideo={hasVideo}
                  videoUrl={videoUrl}
                />
              </div>
            );
          })}
        </div>
        <div className="qf-carousel-dots" aria-hidden>
          {visualCards.map((_, i) => (
            <span
              key={i}
              className={`qf-dot ${i === activeDot ? "qf-dot--active" : ""}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { FunnelVisualCard } from "@/funnels/funnel-models";
import { resolveFunnelVideoSrc } from "@/lib/funnel-video";
import {
  PinterestPinVideoChrome,
  YoutubeShortsVideoChrome,
} from "@/components/funnel/FunnelVideoPlatformChrome";

type FunnelVideoPlatformId = "youtube" | "pinterest";

function PinSlide({
  c,
  hasVideo,
  videoUrl,
  platform,
}: {
  c: FunnelVisualCard;
  hasVideo: boolean;
  videoUrl?: string;
  platform: FunnelVideoPlatformId;
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
            {platform === "youtube" ? (
              <YoutubeShortsVideoChrome />
            ) : (
              <PinterestPinVideoChrome />
            )}
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
  /** e.g. "Example YouTube Shorts" — used for carousel region accessibility */
  carouselAriaLabel?: string;
}

export function FunnelVideoMosaic({
  visualCards,
  heroVisualPinsClassSuffix,
  carouselAriaLabel = "Example videos",
}: FunnelVideoMosaicProps) {
  const platform: FunnelVideoPlatformId =
    heroVisualPinsClassSuffix.includes("pin-yt") ? "youtube" : "pinterest";
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
              platform={platform}
            />
          );
        })}
      </div>

      <div className={`qf-video-carousel${heroVisualPinsClassSuffix}`}>
        <div
          ref={trackRef}
          className="qf-carousel-track"
          role="region"
          aria-label={carouselAriaLabel}
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
                  platform={platform}
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

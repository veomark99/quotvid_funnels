"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
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
      <div className={hasVideo ? "pin-img pin-img--video" : "pin-img"}>
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

function syncInViewVideos(
  viewport: HTMLElement | null,
  slideNodes: HTMLElement[],
  inViewIndices: readonly number[],
) {
  if (!viewport) return;
  const inView = new Set(inViewIndices);
  viewport.querySelectorAll<HTMLVideoElement>("video.pin-video").forEach((v) => {
    void v.pause();
  });
  slideNodes.forEach((slide, i) => {
    if (!inView.has(i)) return;
    slide.querySelectorAll<HTMLVideoElement>("video.pin-video").forEach((v) => {
      void v.play().catch(() => {
        /* autoplay blocked */
      });
    });
  });
}

interface FunnelVideoMosaicProps {
  visualCards: readonly FunnelVisualCard[];
  heroVisualPinsClassSuffix: string;
  /** e.g. "Example YouTube Shorts" — used for carousel region accessibility */
  carouselAriaLabel?: string;
}

const MOBILE_MQ = "(max-width: 768px)";

export function FunnelVideoMosaic({
  visualCards,
  heroVisualPinsClassSuffix,
  carouselAriaLabel = "Example videos",
}: FunnelVideoMosaicProps) {
  const platform: FunnelVideoPlatformId =
    heroVisualPinsClassSuffix.includes("pin-yt") ? "youtube" : "pinterest";

  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "x",
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
    dragFree: false,
  });

  const [activeDot, setActiveDot] = useState(0);

  const onCarouselSettle = useCallback(() => {
    if (!emblaApi) return;
    const slides = emblaApi.slideNodes();
    const viewport = emblaApi.rootNode() as HTMLElement | null;
    setActiveDot(emblaApi.selectedScrollSnap());
    syncInViewVideos(viewport, slides, emblaApi.slidesInView());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onCarouselSettle();
    emblaApi.on("select", onCarouselSettle);
    emblaApi.on("reInit", onCarouselSettle);
    emblaApi.on("slidesInView", onCarouselSettle);
    return () => {
      emblaApi.off("select", onCarouselSettle);
      emblaApi.off("reInit", onCarouselSettle);
      emblaApi.off("slidesInView", onCarouselSettle);
    };
  }, [emblaApi, onCarouselSettle]);

  useEffect(() => {
    if (!emblaApi || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia(MOBILE_MQ);
    const applyAlign = () => {
      emblaApi.reInit({ align: mq.matches ? "center" : "start" });
    };
    applyAlign();
    mq.addEventListener("change", applyAlign);
    return () => mq.removeEventListener("change", applyAlign);
  }, [emblaApi]);

  useEffect(() => {
    let cancelled = false;
    window.requestAnimationFrame(() => {
      if (cancelled) return;
      emblaApi?.reInit();
    });
    return () => {
      cancelled = true;
    };
  }, [emblaApi, visualCards.length]);

  const slidesMarkup = visualCards.map((c, i) => {
    const videoUrl = resolveFunnelVideoSrc(c.videoSrc);
    const hasVideo = Boolean(videoUrl);
    return (
      <div key={i} className="qf-carousel-slide">
        <PinSlide
          c={c}
          hasVideo={hasVideo}
          videoUrl={videoUrl}
          platform={platform}
        />
      </div>
    );
  });

  return (
    <div className={`qf-video-carousel${heroVisualPinsClassSuffix}`}>
      <div
        ref={emblaRef}
        className="qf-carousel-viewport"
        role="region"
        aria-roledescription="carousel"
        aria-label={carouselAriaLabel}
        aria-live="polite"
      >
        <div className="qf-carousel-container">{slidesMarkup}</div>
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
  );
}

"use client";

/**
 * Decorative platform UI on funnel preview videos (not interactive).
 * YouTube: Shorts-style right rail + thin progress bar + mini brand chip.
 * Pinterest: Save pill + overflow dots (typical pin chrome).
 */

function IconThumbUp() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
    </svg>
  );
}

function IconThumbDown() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
    </svg>
  );
}

function IconComment() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
    </svg>
  );
}

function IconRemix() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 4V1L8 5l4 4V6c2.76 0 5 2.24 5 5 0 1.25-.46 2.41-1.23 3.31l1.43 1.43C17.93 13.93 19 13.06 19 11c0-3.87-3.13-7-7-7zm0 14c-2.76 0-5-2.24-5-5 0-1.25.46-2.41 1.23-3.31L6.79 8.26C6.07 9.37 5.61 10.63 5.61 11c0 3.87 3.13 7 7 7v3l4-4-4-4v3z" />
    </svg>
  );
}

const YT_ACTIONS: ReadonlyArray<{
  key: string;
  label: string;
  Icon: typeof IconThumbUp;
}> = [
  { key: "like", label: "Like", Icon: IconThumbUp },
  { key: "dislike", label: "Dislike", Icon: IconThumbDown },
  { key: "comments", label: "0", Icon: IconComment },
  { key: "share", label: "Share", Icon: IconShare },
  { key: "remix", label: "Remix", Icon: IconRemix },
];

export function YoutubeShortsVideoChrome(): React.JSX.Element {
  return (
    <div className="qf-yt-shorts-chrome" aria-hidden>
      <div className="qf-yt-shorts-brand">
        <span className="qf-yt-shorts-brand-mark">▶</span>
        <span className="qf-yt-shorts-brand-name">QuotVid</span>
      </div>

      <div className="qf-yt-shorts-rail">
        {YT_ACTIONS.map(({ key, label, Icon }) => (
          <div key={key} className="qf-yt-shorts-action">
            <span className="qf-yt-shorts-action-btn">
              <Icon />
            </span>
            <span className="qf-yt-shorts-action-label">{label}</span>
          </div>
        ))}
        <div className="qf-yt-shorts-avatar" aria-hidden />
      </div>

      <div className="qf-yt-shorts-progress">
        <span className="qf-yt-shorts-progress-fill" />
      </div>
    </div>
  );
}

export function PinterestPinVideoChrome(): React.JSX.Element {
  return (
    <div className="qf-pin-video-chrome" aria-hidden>
      <span className="qf-pin-video-chrome-more">⋯</span>
      <span className="qf-pin-save-pill">Save</span>
    </div>
  );
}

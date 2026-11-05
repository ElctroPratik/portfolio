"use client";

import { useEffect, useRef, useState, useId } from "react";
import { motion } from "framer-motion";
import { CUSTOM_EASE } from "@/lib/animations";
import { VideoProject } from "@/data/videos";
import { loadYouTubeAPI } from "@/lib/youtube";

interface Props {
  video: VideoProject;
  index: number;
}

// ── Helpers ──────────────────────────────────────────────────
function fmt(secs: number): string {
  if (!secs || isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ── Icons ─────────────────────────────────────────────────────
const PlayIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);
const PauseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);
const VolumeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);
const MuteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);
const FullscreenIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);
const EyeIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const InstaIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

// ── Component ─────────────────────────────────────────────────
export default function VideoCard({ video, index }: Props) {
  const uid    = useId().replace(/:/g, "");
  const domId  = `yt-${uid}`;

  const playerRef  = useRef<any>(null);
  const pollRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const seekBarRef = useRef<HTMLDivElement>(null);

  // facade: don't load iframe until user clicks play
  const [activated, setActivated] = useState(false);
  const [ready,     setReady]     = useState(false);
  const [playing,   setPlaying]   = useState(false);
  const [muted,     setMuted]     = useState(false);
  const [current,   setCurrent]   = useState(0);
  const [duration,  setDuration]  = useState(0);
  const [dragging,  setDragging]  = useState(false);

  const progress     = duration > 0 ? (current / duration) * 100 : 0;
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;

  // ── Init YouTube player ONLY after first click ────────────
  useEffect(() => {
    if (!activated) return;
    let destroyed = false;

    loadYouTubeAPI(() => {
      if (destroyed) return;
      playerRef.current = new (window as any).YT.Player(domId, {
        videoId: video.youtubeId,
        playerVars: {
          autoplay:       1,
          controls:       0,   // ← hide all YouTube UI
          modestbranding: 1,
          rel:            0,
          showinfo:       0,
          iv_load_policy: 3,
          disablekb:      0,
          fs:             0,
          playsinline:    1,
          origin:         typeof window !== "undefined" ? window.location.origin : "",
        },
        events: {
          onReady: (e: any) => {
            if (destroyed) return;
            setReady(true);
            e.target.playVideo();
          },
          onStateChange: (e: any) => {
            if (destroyed) return;
            const S = (window as any).YT.PlayerState;
            if (e.data === S.PLAYING) { setPlaying(true);  startPoll(); }
            else                      { setPlaying(false); stopPoll();
              if (e.data === S.ENDED) setCurrent(0);
            }
          },
        },
      });
    });

    return () => {
      destroyed = true;
      stopPoll();
      playerRef.current?.destroy?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activated]);

  // ── Poll ──────────────────────────────────────────────────
  const startPoll = () => {
    stopPoll();
    pollRef.current = setInterval(() => {
      const p = playerRef.current;
      if (!p?.getCurrentTime) return;
      setCurrent(p.getCurrentTime());
      setDuration(p.getDuration() || 0);
    }, 250);
  };
  const stopPoll = () => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
  };

  // ── Controls ──────────────────────────────────────────────
  const togglePlay = () => {
    if (!playerRef.current || !ready) return;
    playing ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };
  const toggleMute = () => {
    if (!playerRef.current || !ready) return;
    if (muted) { playerRef.current.unMute(); setMuted(false); }
    else        { playerRef.current.mute();  setMuted(true);  }
  };

  const seekTo = (clientX: number) => {
    if (!playerRef.current || !duration || !seekBarRef.current) return;
    const rect = seekBarRef.current.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const time = pct * duration;
    playerRef.current.seekTo(time, true);
    setCurrent(time);
  };

  const handleBarClick  = (e: React.MouseEvent<HTMLDivElement>) => seekTo(e.clientX);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => { if (dragging) seekTo(e.clientX); };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => { if (dragging) seekTo(e.touches[0].clientX); };

  const handleFullscreen = () => {
    // Try native fullscreen on the iframe wrapper
    const el = document.getElementById(domId + "-wrap");
    if (el?.requestFullscreen) el.requestFullscreen();
    else window.open(`https://www.youtube.com/watch?v=${video.youtubeId}`, "_blank");
  };

  // ── Render ────────────────────────────────────────────────
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: CUSTOM_EASE }}
      className="flex flex-col bg-[#151515] shadow-2xl"
    >
      {/* ── 16:9 Video Area ─────────────────────────── */}
      <div
        id={domId + "-wrap"}
        className="relative w-full bg-black overflow-hidden"
        style={{ aspectRatio: "16/9" }}
      >
        {!activated ? (
          /* ── FACADE: custom thumbnail + play button ── */
          <>
            {/* Thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailUrl}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* Subtle dark overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Custom play button */}
            <button
              onClick={() => setActivated(true)}
              className="absolute inset-0 flex items-center justify-center group cursor-pointer"
              aria-label={`Play ${video.title}`}
            >
              <span className="relative flex items-center justify-center w-16 h-16 bg-[#E44339] rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-200">
                <span className="ml-1">
                  <PlayIcon size={22} />
                </span>
              </span>
            </button>
          </>
        ) : (
          /* ── ACTIVE: YouTube iframe (controls=0, no branding) ── */
          <>
            <div id={domId} className="absolute inset-0 w-full h-full" />

            {/* Spinner while buffering */}
            {!ready && (
              <div className="absolute inset-0 bg-[#111] flex items-center justify-center z-10 pointer-events-none">
                <div className="w-6 h-6 border-2 border-[#E44339] border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* Cover the YouTube logo that appears bottom-right on hover */}
            <div className="absolute bottom-0 right-0 w-24 h-10 bg-[#151515] z-10 pointer-events-none" />
          </>
        )}
      </div>

      {/* ── Custom Controls Bar (always visible below video) ── */}
      <div className="bg-[#0d0d0d] px-4 pt-3 pb-3 select-none">

        {/* Progress bar */}
        <div
          ref={seekBarRef}
          className="w-full h-[3px] bg-[#272727] cursor-pointer mb-3 relative group"
          onClick={handleBarClick}
          onMouseDown={() => setDragging(true)}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setDragging(true)}
          onTouchEnd={() => setDragging(false)}
          onTouchMove={handleTouchMove}
        >
          <div
            className="h-full bg-[#E44339] relative transition-none"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-[#E44339] rounded-full scale-0 group-hover:scale-100 transition-transform duration-150" />
          </div>
        </div>

        {/* Button row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">

            {/* Play / Pause — if not activated, clicking here also activates */}
            <button
              onClick={() => { if (!activated) setActivated(true); else togglePlay(); }}
              className="text-white hover:text-[#E44339] transition-colors duration-150 flex-shrink-0"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <PauseIcon /> : <PlayIcon size={18} />}
            </button>

            {/* Mute */}
            <button
              onClick={toggleMute}
              disabled={!ready}
              className="text-[#666] hover:text-white transition-colors duration-150 disabled:opacity-30 flex-shrink-0"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <MuteIcon /> : <VolumeIcon />}
            </button>

            {/* Timestamp */}
            <span className="font-mono text-[9px] tracking-[0.1em] text-[#555] tabular-nums">
              {fmt(current)}&nbsp;/&nbsp;{fmt(duration)}
            </span>
          </div>

          {/* Fullscreen */}
          <button
            onClick={handleFullscreen}
            disabled={!ready}
            className="text-[#444] hover:text-white transition-colors duration-150 disabled:opacity-30 flex-shrink-0"
            aria-label="Fullscreen"
          >
            <FullscreenIcon />
          </button>
        </div>
      </div>

      {/* ── Video Info ──────────────────────────────── */}
      <div className="bg-[#151515] border-t border-[#1e1e1e] px-4 pt-3.5 pb-4 flex flex-col gap-2.5">

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {video.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[8px] sm:text-[9px] tracking-[0.18em] text-[#E44339] border border-[#E44339]/30 px-2 py-[3px] uppercase"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <p className="font-display font-bold text-white text-[14px] sm:text-[15px] tracking-[-0.01em] leading-tight">
          {video.title}
        </p>

        {/* Stats + Instagram */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-1.5 text-[#555]">
            <EyeIcon />
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.14em] text-[#555]">
              ~{video.views} VIEWS
            </span>
          </div>

          <a
            href={video.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] tracking-[0.12em] text-[#555] hover:text-[#E44339] transition-colors duration-150"
          >
            <InstaIcon />
            WATCH ON INSTA
          </a>
        </div>
      </div>
    </motion.article>
  );
}

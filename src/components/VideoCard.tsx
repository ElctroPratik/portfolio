"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoProject } from "@/data/videos";
import { CUSTOM_EASE } from "@/lib/animations";

interface Props {
  video: VideoProject;
  index: number;
}

function fmtTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function VideoCard({ video, index }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Handle play / pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
      setHasStarted(true);
    }
  };

  const handleStartPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasStarted(true);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current.requestFullscreen().catch(() => {});
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = pos * duration;
    setCurrentTime(pos * duration);
  };

  // Fade out controls during active playback
  const triggerControls = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2400);
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: CUSTOM_EASE }}
      className="group relative flex flex-col bg-[#151515] border-2 border-[#151515] shadow-[6px_6px_0px_#151515] overflow-hidden"
    >
      {/* ── 16:9 VIDEO CONTAINER ── */}
      <div
        ref={containerRef}
        className="relative w-full aspect-video bg-black overflow-hidden select-none cursor-pointer"
        onMouseEnter={() => {
          setIsHovered(true);
          triggerControls();
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          if (isPlaying) setShowControls(false);
        }}
        onMouseMove={triggerControls}
        onClick={togglePlay}
      >
        {/* HTML5 Native Video Stream (Zero YouTube/Cloudinary branding) */}
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.thumbnailUrl}
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          onTimeUpdate={() => {
            if (videoRef.current) {
              setCurrentTime(videoRef.current.currentTime);
            }
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
            }
          }}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => {
            setIsBuffering(false);
            setIsPlaying(true);
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            setHasStarted(false);
            setShowControls(true);
          }}
        />

        {/* ── RESTING BADGES (Shown when idle & not hovering) ── */}
        {!hasStarted && !isHovered && (
          <>
            {/* Top-Left: Primary Tag */}
            <div className="absolute top-3 left-3 z-10">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold bg-[#E44339] text-white px-2.5 py-1 shadow-md">
                {video.tags[0]}
              </span>
            </div>

            {/* Top-Right: High-Impact Views Badge */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-[#151515]/90 border border-white/10 px-3 py-1 backdrop-blur-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#E44339] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.16em] uppercase font-bold text-white">
                {video.views} VIEWS
              </span>
            </div>

            {/* Center Play Button in Resting State */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#E44339] text-white flex items-center justify-center shadow-2xl pl-1 transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6,3 20,12 6,21" />
                </svg>
              </div>
            </div>
          </>
        )}

        {/* ── ATTENTION-GRABBING RESULTS HOVER OVERLAY (Full Screen) ── */}
        <AnimatePresence>
          {!hasStarted && isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 z-20 bg-[#151515]/92 backdrop-blur-md p-5 sm:p-6 flex flex-col justify-between"
            >
              {/* Header row in overlay */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="font-mono text-[10px] tracking-[0.22em] text-[#E44339] uppercase font-bold">
                  [ VERIFIED PERFORMANCE ]
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] text-[#777777]">
                  PROJECT // {video.number}
                </span>
              </div>

              {/* Center Content: Giant Views Result */}
              <div className="flex flex-col items-center justify-center text-center my-auto py-2">
                <span className="font-mono text-[11px] tracking-[0.28em] text-white/60 uppercase font-medium mb-1">
                  TOTAL CLIENT REACH
                </span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display font-black text-5xl sm:text-6xl text-[#E44339] tracking-[-0.04em] leading-none">
                    {video.views}
                  </span>
                  <span className="font-mono text-base font-bold text-white/80 tracking-wide">
                    VIEWS
                  </span>
                </div>
                <p className="font-body text-[12px] sm:text-[13px] text-[#F2F0E9]/80 max-w-sm mt-2 leading-snug">
                  {video.description}
                </p>

                {/* Tags in overlay */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[8px] sm:text-[9px] tracking-[0.16em] uppercase text-white bg-white/10 px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons row in overlay */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleStartPlay}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#E44339] hover:bg-white hover:text-[#151515] text-white font-display font-bold text-[11px] sm:text-[12px] tracking-[0.14em] py-2.5 px-4 uppercase transition-colors shadow-lg cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6,3 20,12 6,21" />
                  </svg>
                  PLAY VIDEO
                </button>

                <a
                  href={video.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 bg-[#202020] hover:bg-[#333] text-white/90 font-mono text-[10px] tracking-[0.14em] py-2.5 px-3.5 border border-white/10 transition-colors uppercase shrink-0"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  INSTA ↗
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── BUFFERING SPINNER ── */}
        {isBuffering && hasStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-30 pointer-events-none">
            <div className="w-8 h-8 border-3 border-[#E44339] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* ── SLEEK FLOATING PLAYER CONTROLS (Active Playback) ── */}
        {hasStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showControls ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-6 pb-2.5 px-3.5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrubber Progress Bar */}
            <div
              className="w-full h-1.5 hover:h-2 bg-white/20 cursor-pointer relative group mb-2.5 transition-all"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-[#E44339] relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
              </div>
            </div>

            {/* Controls Button Row */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="p-1 hover:text-[#E44339] transition-colors"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6,3 20,12 6,21" />
                    </svg>
                  )}
                </button>

                {/* Mute/Unmute */}
                <button
                  onClick={toggleMute}
                  className="p-1 hover:text-[#E44339] transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  )}
                </button>

                {/* Time Display */}
                <span className="font-mono text-[10px] tracking-wider text-white/80 tabular-nums">
                  {fmtTime(currentTime)} / {fmtTime(duration)}
                </span>
              </div>

              {/* Right: Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-1 hover:text-[#E44339] transition-colors"
                aria-label="Fullscreen"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* ── CARD FOOTER (Editorial & Clean) ── */}
      <div className="bg-[#151515] p-4 sm:p-5 flex flex-col gap-2.5 border-t border-white/10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#777777] uppercase block mb-0.5">
              CUT // {video.number}
            </span>
            <h3 className="font-display font-bold text-white text-[16px] sm:text-[18px] tracking-[-0.01em] uppercase leading-tight">
              {video.title}
            </h3>
          </div>

          {/* Results Badge */}
          <div className="shrink-0 flex items-center gap-1.5 bg-[#E44339]/15 border border-[#E44339]/40 px-2.5 py-1">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.14em] text-[#E44339] font-bold">
              {video.views} VIEWS
            </span>
          </div>
        </div>

        {/* Footer meta row: Tags + Watch on Instagram */}
        <div className="flex items-center justify-between pt-1 border-t border-white/5">
          <div className="flex flex-wrap gap-1.5">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[8px] sm:text-[9px] tracking-[0.16em] uppercase text-[#777777]"
              >
                #{tag.replace(/\s+/g, "")}
              </span>
            ))}
          </div>

          <a
            href={video.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-white/70 hover:text-[#E44339] transition-colors uppercase font-medium"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            WATCH REEL ↗
          </a>
        </div>
      </div>
    </motion.article>
  );
}

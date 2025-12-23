import React, { useEffect } from "react";
import moment from "moment";

const STORY_DURATION = 5000; // 5s / story

const StoryViewer = ({ stories, currentIndex, setCurrentIndex, onClose }) => {
  const story = stories[currentIndex];

  const isImage = story.media_type === "image";
  const isVideo = story.media_type === "video";
  const isText = story.media_type === "text" || (!isImage && !isVideo);

  // ⏱ Auto next story
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < stories.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        onClose(); // hết story → quay về feed
      }
    }, STORY_DURATION);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* ❌ Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white z-50"
      >
        ✕
      </button>

      <div className="relative w-full max-w-md h-[90vh] rounded-xl overflow-hidden bg-black">

        {/* 🔵 PROGRESS BAR */}
        <div className="absolute top-2 left-2 right-2 z-20 flex gap-1">
          {stories.map((_, i) => (
            <div key={i} className="flex-1 h-1 bg-white/30 rounded overflow-hidden">
              {i === currentIndex && (
                <div
                  key={currentIndex} // 🔥 QUAN TRỌNG: reset animation
                  className="h-full bg-white animate-story-progress"
                />
              )}
              {i < currentIndex && (
                <div className="h-full bg-white" />
              )}
            </div>
          ))}
        </div>

        {/* 👤 USER INFO */}
        <div className="absolute top-5 left-4 z-20 flex items-center gap-3">
          <img
            src={story.user?.profile_picture}
            className="w-9 h-9 rounded-full border border-white"
          />
          <div>
            <p className="text-white text-sm font-semibold">
              {story.user?.full_name}
            </p>
            <p className="text-white/70 text-xs">
              {moment(story.createdAt).fromNow()}
            </p>
          </div>
        </div>

        {/* MEDIA */}
        {isImage && (
          <img
            src={story.media_url}
            className="w-full h-full object-cover"
          />
        )}

        {isVideo && (
          <video
            src={story.media_url}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        )}

        {isText && (
          <div
            className="w-full h-full flex items-center justify-center text-white text-lg font-semibold px-6 text-center"
            style={{ background: story.background_color || "#4f46e5" }}
          >
            {story.content}
          </div>
        )}

        {/* 👉 TAP ZONES */}
        <div
          className="absolute inset-y-0 left-0 w-1/2 z-30"
          onClick={() =>
            setCurrentIndex((i) => Math.max(i - 1, 0))
          }
        />
        <div
          className="absolute inset-y-0 right-0 w-1/2 z-30"
          onClick={() =>
            currentIndex < stories.length - 1
              ? setCurrentIndex((i) => i + 1)
              : onClose()
          }
        />
      </div>
    </div>
  );
};

export default StoryViewer;

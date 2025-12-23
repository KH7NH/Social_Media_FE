import React, { useEffect, useState } from "react";
import { dummyStoriesData } from "../assets/assets";
import { Plus, Play } from "lucide-react";
import moment from "moment";
import StoryModal from "./StoryModal";
import StoryViewer from "./StoryViewer";

const StoriesBar = () => {
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 👇 Story viewer state
  const [viewStories, setViewStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchStories = async () => {
    setStories(dummyStoriesData);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const openStoryViewer = (index) => {
    setViewStories(stories);
    setCurrentIndex(index);
  };

  const closeStoryViewer = () => {
    setViewStories([]);
    setCurrentIndex(0);
  };

  return (
    <div className="w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4">
      <div className="flex gap-4 pb-5">
        {/* ➕ Add Story */}
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="rounded-lg shadow-sm min-w-[120px] h-40 border-2 border-dashed border-[oklch(55.6%_0_0)]
          bg-gradient-to-b from-indigo-50 to-white hover:shadow-lg transition active:scale-95"
        >
          <div className="h-full flex flex-col items-center justify-center">
            <div className="size-10 bg-gradient-to-r from-[oklch(55.6%_0_0)] to-[oklch(14.1%_0.005_285.823)] rounded-full flex items-center justify-center mb-2">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-slate-600">Create Story</p>
          </div>
        </button>

        {/* 📖 Story cards */}
        {stories.map((story, index) => {
          const isImage = story.media_type === "image";
          const isVideo = story.media_type === "video";
          const isText = story.media_type === "text" || (!isImage && !isVideo);

          return (
            <button
              key={story._id}
              type="button"
              onClick={() => openStoryViewer(index)}
              className="relative min-w-[120px] h-40 rounded-lg overflow-hidden shadow-sm
              hover:shadow-lg transition active:scale-95"
              style={{
                background: isText
                  ? story.background_color || "#4f46e5"
                  : undefined,
              }}
            >
              {/* Media */}
              {isImage && (
                <img
                  src={story.media_url}
                  alt="story"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

              {isVideo && (
                <div className="absolute inset-0 bg-black/30" />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />

              {/* Avatar */}
              <img
                src={story.user?.profile_picture}
                alt={story.user?.full_name}
                className="absolute top-3 left-3 size-8 rounded-full ring-2 ring-white z-10"
              />

              {/* Video icon */}
              {isVideo && (
                <div className="absolute top-3 right-3 z-10 bg-white/20 p-1 rounded-full">
                  <Play className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Text */}
              {!!story.content && (
                <p className="absolute top-14 left-3 right-3 text-xs text-white line-clamp-3 z-10">
                  {story.content}
                </p>
              )}

              {/* Time */}
              <p className="absolute bottom-2 right-2 text-[10px] text-white/80 z-10">
                {moment(story.createdAt).fromNow()}
              </p>
            </button>
          );
        })}
      </div>

      {/* ➕ Create story modal */}
      {showModal && (
        <StoryModal
          setShowModal={setShowModal}
          fetchStories={fetchStories}
        />
      )}

      {/* 👁 Story Viewer */}
      {viewStories.length > 0 && (
        <StoryViewer
          stories={viewStories}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={closeStoryViewer}
        />
      )}
    </div>
  );
};

export default StoriesBar;

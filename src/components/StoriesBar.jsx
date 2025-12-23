import React, { useEffect, useState } from "react";
import { dummyStoriesData } from "../assets/assets";
import { Plus, Play } from "lucide-react";
import moment from "moment";
import StoryModal from "./StoryModal";

const StoriesBar = () => {
  const [stories, setStories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewStory, setViewStory] = useState(null);

  const fetchStories = async () => {
    setStories(dummyStoriesData)
  }
  useEffect(() => {
    fetchStories()
  }, [])

  return (
    <div className="w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4">
      <div className="flex gap-4 pb-5">
        {/* Add Story Card */}
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="rounded-lg shadow-sm min-w-[120px] max-w-[120px] h-40 cursor-pointer hover:shadow-lg
          transition-all duration-200 border-2 border-dashed border-indigo-300 bg-gradient-to-b from-indigo-50 to-white
          active:scale-95"
        >
          <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="size-10 bg-indigo-500 rounded-full flex items-center justify-center mb-3">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-medium text-slate-600 text-center">
              Create Story
            </p>
          </div>
        </button>

        {/* Story Cards */}
        {stories.map((story) => {
          const isImage = story.media_type === "image" && story.media_url;
          const isVideo = story.media_type === "video" && story.media_url;
          const isText = story.media_type === "text" || (!isImage && !isVideo);

          return (
            <button
              key={story._id}
              type="button"
              className="relative rounded-lg shadow-sm min-w-[120px] max-w-[120px] h-40 overflow-hidden cursor-pointer
              hover:shadow-lg transition-all duration-200 active:scale-95"
              style={{
                background: isText
                  ? story.background_color || "#4f46e5"
                  : undefined,
              }}
            >
              {/* Background media */}
              {isImage && (
                <img
                  src={story.media_url}
                  alt="story"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              {isVideo && (
                <div className="absolute inset-0 h-full w-full bg-black/30">
                  {/* Bạn có thể thay bằng thumbnail nếu có */}
                </div>
              )}

              {/* Overlay gradient for readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60" />

              {/* Avatar */}
              <img
                src={story.user?.profile_picture}
                alt={story.user?.full_name || "user"}
                className="absolute size-8 top-3 left-3 z-10 rounded-full ring-2 ring-white/80 shadow"
              />

              {/* Video icon */}
              {isVideo && (
                <div className="absolute top-3 right-3 z-10 rounded-full bg-white/20 p-1.5 backdrop-blur">
                  <Play className="h-4 w-4 text-white" />
                </div>
              )}

              {/* Text content */}
              {!!story.content && (
                <p className="absolute left-3 right-3 top-14 z-10 text-white/90 text-xs leading-snug line-clamp-3 text-left">
                  {story.content}
                </p>
              )}

              {/* Time */}
              <p className="absolute bottom-2 right-2 z-10 text-[10px] text-white/80">
                {moment(story.createdAt).fromNow()}
              </p>
            </button>
          );
        })}
      </div>
      {/* Add story modal */}
      {showModal && <StoryModal setShowModal={setShowModal} fetchStories={fetchStories} />}
    </div>
  );
};

export default StoriesBar;

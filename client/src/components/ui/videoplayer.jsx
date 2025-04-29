import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { useEffect, useState } from "react";

const VideoPlayer = ({ currentLecture, initialLecture, handleLectureProgress }) => {
  const [progressMarked, setProgressMarked] = useState(false);

  const source = {
    type: "video",
    sources: [
      {
        src: currentLecture?.videoUrl || initialLecture?.videoUrl,
        type: "video/mp4",
      },
    ],
  };

  const handlePlay = () => {
    if (!progressMarked) {
      handleLectureProgress(currentLecture?._id || initialLecture._id);
      setProgressMarked(true);
    }
  };

  // Reset progressMarked when lecture changes
  useEffect(() => {
    setProgressMarked(false);
  }, [currentLecture?._id, initialLecture?._id]);

  return (
    <div className="w-full h-auto md:rounded-lg overflow-hidden">
      <Plyr
        source={source}
        options={{
          controls: [
            "play-large", "play", "rewind", "fast-forward", 
            "progress", "current-time", "mute", "volume", 
            "settings", "fullscreen",
          ],
        }}
        onPlay={handlePlay}
      />
    </div>
  );
};

export default VideoPlayer;

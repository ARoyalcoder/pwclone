import Plyr from "plyr-react";
import "plyr-react/plyr.css";

const VideoPlayer = ({ currentLecture, initialLecture, handleLectureProgress }) => {
  const source = {
    type: "video",
    sources: [
      {
        src: currentLecture?.videoUrl || initialLecture?.videoUrl,
        type: "video/mp4", // or change based on your video type
      },
    ],
  };

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
          // you can customize settings like speed, quality, captions etc.
        }}
        onPlay={() => handleLectureProgress(currentLecture?._id || initialLecture._id)}
      />
    </div>
  );
};

export default VideoPlayer;

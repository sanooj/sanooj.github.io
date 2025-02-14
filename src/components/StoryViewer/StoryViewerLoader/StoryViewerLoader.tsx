import { useEffect, useState } from "react";

import { IStory } from "@/types/types";

import styles from "./StoryViewerLoader.module.scss";

/**
 * The StoryViewerLoader component that renders the story loader.
 * The story loader displays the progress bar of the current story.
 *
 * @param {Object} props - The component props.
 * @param {IStory[]} [props.stories] - The list of stories.
 * @param {number} [props.currentIndex] - The index of the current story.
 */
const StoryViewerLoader = ({
  stories,
  currentIndex,
}: {
  stories: IStory[] | undefined;
  currentIndex: number;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!stories || stories.length === 0) return;

    // The duration of the story in seconds
    const duration = stories[currentIndex]?.duration;

    // Reset the progress to 0
    setProgress(0);

    // Start the interval
    const interval = setInterval(() => {
      // If the progress is less than the duration, increment the progress
      // Otherwise, stop the interval
      setProgress((prev) => {
        if (prev < (duration || 0)) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return duration || 0;
        }
      });
    }, 1000);

    // Clear the interval when the component is destroyed
    return () => clearInterval(interval);
  }, [currentIndex, stories && stories.length]);

  return (
    <div className={styles.storyLoader}>
      {/* Render the progress bar for each story */}
      {stories?.map((_, index) => (
        <div key={index} className={styles.bar}>
          {/* If the story is the current story, render the current progress bar */}
          {/* Otherwise, render an empty progress bar */}
          <span
            className={index === currentIndex ? styles.current : ""}
            style={{
              // The width of the progress bar is the progress divided by the duration
              // times 100, or 0 if the duration is 0
              width: (progress / (stories[index]?.duration || 1)) * 100 + "%",
            }}></span>
        </div>
      ))}
    </div>
  );
};

export default StoryViewerLoader;

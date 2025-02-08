import { lazy } from "react";

const StoryViewerLoader = lazy(() => import("./StoryViewerLoader/StoryViewerLoader"));
const StoryViewerProfile = lazy(() => import("./StoryViewerProfile/StoryViewerProfile"));

import styles from "./StoryViewer.module.scss";
import useStoryViewer from "./useStoryViewer";

/**
 * The main StoryViewer component that renders the story viewer.
 * It's a complex component that contains the story loader, profile and story content.
 * It also handles the story navigation.
 */
const StoryViewer = () => {
  /**
   * The story object that contains the story data.
   * The story data is fetched when the component mounts.
   */
  const { story, switchStory, currentIndex } = useStoryViewer();

  return (
    <div className={styles.storyViewer}>
      <header className={styles.header}>
        {/* The StoryViewerLoader component that renders the story loader. * The story loader */}
        {/* displays the progress bar of the current story. */}
        <StoryViewerLoader stories={story?.stories} currentIndex={currentIndex} />

        {/* The StoryViewerProfile component that renders the story user profile. * The profile */}
        {/* contains the profile picture, username and story id. */}
        <StoryViewerProfile story={story} />
      </header>

      <div className={styles.storyContent}>
        {/* The prev button that navigates to the previous story. * The button is hidden visually
        and is only accessible via accessibility tools.  */}
        <a onClick={() => switchStory("PREV")} data-cy='prev-button'>
          <span className={"hidden"}>prev</span>
        </a>
        {/* The story content that displays the current story image. * The image is rendered only
        if the current story is visible.  */}
        {story?.stories?.map(({ storyId, imageUrl, duration }, index) => {
          return (
            currentIndex === index && (
              <img src={imageUrl} alt={storyId} key={storyId} data-cy='story' data-index={index} />
            )
          );
        })}
        {/* The next button that navigates to the next story. * The button is hidden visually and
        is only accessible via accessibility tools. */}
        <a className={styles.next} onClick={() => switchStory("NEXT")} data-cy='next-button'>
          <span className={"hidden"}>Next</span>
        </a>
      </div>
    </div>
  );
};

export default StoryViewer;

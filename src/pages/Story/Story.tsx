import { lazy } from "react";

const StoryViewer = lazy(() => import("@/components/StoryViewer/StoryViewer"));

import styles from "./Story.module.scss";

const Stories = () => {
  return (
    <div className={styles.story}>
      <StoryViewer />
    </div>
  );
};

export default Stories;

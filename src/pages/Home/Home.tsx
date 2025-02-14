import { lazy } from "react";

const StoryList = lazy(() => import("@/components/StoryList/StoryList"));

import styles from "./Home.module.scss";
import logo from "/logo.svg";

/**
 * Home component that serves as the main entry point of the application.
 * Displays the logo and a list of stories.
 */
const Home = () => {
  return (
    <div className={styles.home}>
      {/* Header section containing the logo */}
      <header role='logo' className={styles.header}>
        <h1 className={styles.logo}>
          {/* Logo image */}
          {logo && <img src={logo} alt='storyViewer' data-cy='logo' />}
        </h1>
        {/* StoryList component that displays a list of stories */}
        <StoryList />
      </header>
      <main data-cy='main-content'>
        {/* Main content section */}
        <section className={styles.content}>
          {/* TODO: Implement the main content section */}
          <p>Welcome to the StoryViewer app! This app allows you to view Instagram-like stories.</p>
        </section>
      </main>
    </div>
  );
};

export default Home;

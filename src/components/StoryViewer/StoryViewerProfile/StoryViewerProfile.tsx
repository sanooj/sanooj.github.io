import { useNavigate } from "react-router-dom";

import { IApi } from "@/types/types";
import closeIcon from "@/assets/images/close-x.svg";

import styles from "./StoryViewerProfile.module.scss";

/**
 * The StoryViewerProfile component that renders the user profile in the story viewer.
 * It displays the user profile picture, username and user id.
 *
 * @param {Object} props - The component props.
 * @param {IApi} [props.story] - The story object fetched from the API.
 */
const StoryViewerProfile = ({ story }: { story: IApi | undefined }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.profile}>
      {/* The profile picture */}
      <img
        src={story?.profileImage}
        alt={story?.username}
        className={styles.profileImage}
        // The role is set to "profileImage" so that screen readers can identify the image as the user's profile picture
        role='profileImage'
      />

      {/* The username */}
      <span className={styles.username}>{story?.username}</span>

      {/* The user id */}
      <span className={styles.desc}>{story?.userId}</span>

      {/* The close button */}
      <button
        className={styles.closeButton}
        data-cy='close-button'
        onClick={() => navigate("/")}
        // The role is set to "button" so that screen readers can identify the element as a button
        role='button'>
        {/* The close icon */}
        <img src={closeIcon} alt='close' />
      </button>
    </div>
  );
};

export default StoryViewerProfile;

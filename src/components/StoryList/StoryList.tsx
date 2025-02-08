import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchUsersStories } from "@/services/api";
import { IApi } from "@/types/types";

import styles from "./StoryList.module.scss";

/**
 * StoryList component that fetches and displays a list of user stories.
 */
const StoryList = () => {
  // State to store the list of stories
  const [stories, setStories] = useState<IApi[]>([]);

  // Hook to programmatically navigate
  const navigate = useNavigate();

  /**
   * Fetches stories from the API and updates the state.
   */
  const getStories = async () => {
    const response = await fetchUsersStories();
    setStories(response);
  };

  // Effect hook to fetch stories when the component mounts
  useEffect(() => {
    getStories();
  }, []);

  return (
    <div className={styles.storyList} data-cy='story-list'>
      <ul className={styles.storyListItems}>
        {stories.map(({ userId, username, profileImage }) => (
          <li key={userId} onClick={() => navigate(`/stories/${username}/${userId}`)}>
            <div className={styles.profilePic}>
              <img src={profileImage} alt={userId} role='profileImage' />
            </div>
            <span role='username'>{username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoryList;

import { fetchStories } from "@/services/api";
import { Action, IApi } from "@/types/types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/**
 * A hook that handles the state and logic for the StoryViewer component.
 * It fetches the stories for the given user id and provides a function to switch to the next story.
 * The user can navigate to the next story by clicking the next button or by waiting for the story to end.
 * If the user is at the last story, the app navigates to the next user.
 *
 * @returns An object containing the story state, a function to switch to the next story and the current index of the story.
 */
const useStoryViewer = (storyContentRef: React.RefObject<HTMLDivElement | null>) => {
  const { id } = useParams();
  const [story, setStory] = useState<IApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  /**
   * Switches to the next/previous story.
   * If the user is at the last story, navigates to the next user.
   * If the user is at the first story, does nothing.
   */
  const switchStory = (type: Action) => {
    storyContentRef?.current?.classList.remove("animation-in");
    switch (type) {
      case "NEXT":
        if (story?.stories && story?.stories?.length - 1 === currentIndex) {
          switchToNextUser();
          return;
        }
        setCurrentIndex((prev) => prev + 1);
        break;
      case "PREV":
        if (currentIndex === 0) return;
        setCurrentIndex((prev) => prev - 1);
        break;
      default:
        setCurrentIndex(0);
        break;
    }
  };

  useEffect(() => {
    if (!story?.stories[currentIndex].duration) return;

    /**
     * If the story has a duration, after the duration timeout, switch to the next story.
     * If the user is at the last story, navigate to the next user.
     */
    const interval = setTimeout(() => {
      if (story?.stories.length - 1 === currentIndex) {
        switchToNextUser();
        return;
      }
      switchStory("NEXT");
    }, story?.stories[currentIndex].duration * 1000);

    return () => clearInterval(interval);
  }, [story, currentIndex]);

  /**
   * Navigates to the next user.
   * If there is no next user, does nothing.
   */
  const switchToNextUser = async () => {
    if (!story?.nextUserId) return;
    const newStory = await getStories(story?.nextUserId);
    if (!newStory) return;
    navigate(`/stories/${newStory?.username}/${newStory?.userId}`);
    storyContentRef?.current?.classList.add("animation-in");
    setCurrentIndex(0);
  };

  /**
   * Fetches the stories for the given user id.
   * @param id The user id.
   * @returns The stories for the given user.
   */
  const getStories = async (id: string) => {
    if (!id) return;
    const response = await fetchStories(id);
    setStory(response);
    return response;
  };

  useEffect(() => {
    id && getStories(id);
  }, [id]);

  return { story, switchStory, currentIndex };
};

export default useStoryViewer;

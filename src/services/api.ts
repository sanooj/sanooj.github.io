import { IApi } from "@/types/types";

// API call methods
const fetchUsersStories = async () => {
  const response = await fetch("/data/stories.json");
  return await response.json();
};

const fetchStories = async (id: string) => {
  const response = await fetchUsersStories();
  const stories = await response?.find((story: IApi) => story.userId === id);
  return stories;
};

export { fetchUsersStories, fetchStories };

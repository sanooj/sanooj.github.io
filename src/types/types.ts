export type IApi = {
  userId: string;
  username: string;
  stories: IStory[];
  profileImage: string;
  nextUserId?: string;
};

export type IStory = {
  storyId: string;
  imageUrl: string;
  duration: number;
};

export interface State {
  index: number;
}

export type Action = "NEXT" | "PREV";

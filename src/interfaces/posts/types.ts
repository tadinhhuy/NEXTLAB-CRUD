export interface IPostList {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface IInitialState {
  totalPosts: IPostList[];
  loading: boolean;
  isHover: boolean;
  cardIndex: number | null;
  showModal: boolean;
  currentPostId: number | null;
}

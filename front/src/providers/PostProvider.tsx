import { createContext, useContext, useReducer } from "react";
import { IPostLike } from "../utils/Interface/Post";

export interface PostProps {
  id: number;
  userPostId: number;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  date: Date;
  content: string;
  likes: IPostLike[];
  nbComments: number;
  profilPicture: string;
  setUpdate: (value:boolean) => void;
}

// créer un context pour un post
export interface PostContextType {
  post: PostProps;
  dispatch: React.Dispatch<PostReducerAction>;
}

const PostContext = createContext<PostContextType>({} as PostContextType);

// créer un reducer pour un post
export interface PostReducerAction {
  type: "UPDATE";
  payload: PostProps;
}

const postReducer = (state: PostProps, action: PostReducerAction) => {
  switch (action.type) {
    case "UPDATE":
      return action.payload;
    default:
      return state;
  }
};

// créer un provider pour un post
interface PostProviderProps {
  children: React.ReactNode;
  defaultPost: PostProps;
}

const PostProvider = ({ children, defaultPost }: PostProviderProps) => {
  const [post, dispatch] = useReducer(postReducer, defaultPost);

  return (
    <PostContext.Provider value={{ post, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};

// créer un hook pour un post
const usePostContext = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};

const withPostContext = (
  Component: React.ComponentType,
  defaultPost: PostProps
) => (
  <PostProvider defaultPost={defaultPost}>
    <Component />
  </PostProvider>
);

export { PostProvider, usePostContext, withPostContext };

export interface IReply {
  id: number;
  commentId: number;
  name: string;
  avatar: string;
  body: string;
  date: number;
}

export interface IComment {
  id: number;
  name: string;
  avatar: string;
  body: string;
  date: number;
  replies: IReply[];
}

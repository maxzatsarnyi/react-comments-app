import { RootState } from './../index';
import { IComment } from '../../../entities/comment';

export const getCommentById = (state: RootState, id: number): IComment =>
  state.comments.find((comment: IComment) => {
    if (comment.id === id) {
      return comment;
    }
  });

import { IComment } from '../../../entities/comment';
import { IPayload } from '../../../entities/redux';
import {
  COMMENTS_CREATE,
  COMMENTS_DELETE,
  COMMENTS_LOAD,
  COMMENTS_REPLY,
  COMMENTS_REPLY_DELETE,
  COMMENTS_UPDATE,
  COMMENTS_REPLY_UPDATE,
} from '../constants';

const initialState: IComment[] = [];

export const commentsReducer = (
  state: IComment[] = initialState,
  action: IPayload<any>
) => {
  switch (action.type) {
    case COMMENTS_LOAD:
      return action.payload;

    case COMMENTS_CREATE:
      return [...state, action.payload];

    case COMMENTS_DELETE:
      return state.filter((comment) => comment.id !== action.payload);

    case COMMENTS_UPDATE:
      return state.map((comment) => {
        if (comment.id === action.payload.id) {
          return action.payload;
        }
        return comment;
      });

    // SERVER SENDS commentId as STRING, so we don't use strong comparison
    case COMMENTS_REPLY:
      return state.map((comment) => {
        if (comment.id == action.payload.commentId) {
          return {
            ...comment,
            replies: [...comment.replies, action.payload],
          };
        }
        return comment;
      });

    case COMMENTS_REPLY_DELETE:
      return state.map((comment) => {
        return comment.replies.filter((reply) => reply.id != action.payload);
      });

    case COMMENTS_REPLY_UPDATE:
      return state.map((comment) => {
        return comment.replies.map((reply) => {
          if (reply.id == action.payload.id) {
            return action.payload;
          }
          return reply;
        });
      });
    default:
      return state;
  }
};

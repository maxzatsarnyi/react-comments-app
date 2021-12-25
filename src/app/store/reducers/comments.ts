import { IComment } from './../../../entities/index';
import { IPayload } from '../../../interfaces/redux';
import { COMMENTS_LOAD } from '../actions/comments';

const initialState: IComment[] = [];

export const commentsReducer = (state: IComment[], action: IPayload<any>) => {
  switch (action.type) {
    case COMMENTS_LOAD:
      return action.payload;

    default: {
      return [...initialState];
    }
  }
};

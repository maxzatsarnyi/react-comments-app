import { IComment, IReply } from '../../../entities/comment';
import { Dispatch } from 'redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  COMMENTS_CREATE,
  COMMENTS_DELETE,
  COMMENTS_LOAD,
  COMMENTS_REPLY,
  COMMENTS_REPLY_DELETE,
  COMMENTS_UPDATE,
  COMMENTS_REPLY_UPDATE,
} from '../constants';

const axiosAPI = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loadCommentsAction = (value: any[]) => ({
  type: COMMENTS_LOAD,
  payload: value,
});

export const loadComments = () => async (dispatch: Dispatch) => {
  return axiosAPI
    .get(`/comments?_embed=replies`)
    .then((response) => dispatch(loadCommentsAction(response.data)))
    .catch(console.error);
};

export const addComment = (comment: IComment) => ({
  type: COMMENTS_CREATE,
  payload: comment,
});

export const createComment = (data: IComment) => async (dispatch: Dispatch) => {
  return axiosAPI
    .post(`/comments`, data)
    .then(() => {
      dispatch(addComment(data));
      toast.success('Comment has been created!');
    })
    .catch(console.error);
};

export const removeComment = (id: number) => ({
  type: COMMENTS_DELETE,
  payload: id,
});

export const deleteComment = (id: number) => async (dispatch: Dispatch) => {
  return axiosAPI
    .delete(`/comments/${id}`)
    .then(() => {
      dispatch(removeComment(id));
      toast.success('Comment has been deleted!');
    })
    .catch(console.error);
};

export const updateCommentAction = (comment: IComment) => ({
  type: COMMENTS_UPDATE,
  payload: comment,
});

export const updateComment =
  (id: number, data: IComment) => async (dispatch: Dispatch) => {
    return axiosAPI
      .put(`/comments/${id}`, data)
      .then((response) => {
        dispatch(updateCommentAction(response.data));
        toast.success('Comment has been updated!');
      })
      .catch(console.error);
  };

export const createReplyAction = (comment: Omit<IComment, 'replies'>) => ({
  type: COMMENTS_REPLY,
  payload: comment,
});

export const createReply =
  (id: number, data: Omit<IComment, 'replies'>) =>
  async (dispatch: Dispatch) => {
    return axiosAPI
      .post(`/comments/${id}/replies`, data)
      .then((response) => {
        dispatch(createReplyAction(response.data));
        toast.success(`Response has been posted!`);
      })
      .catch(console.error);
  };

export const deleteReplyAction = (id: number) => ({
  type: COMMENTS_REPLY_DELETE,
  payload: id,
});

export const deleteReply = (id: number) => async (dispatch: Dispatch) => {
  return axiosAPI
    .delete(`/comments/replies/${id}`)
    .then(() => dispatch(deleteReplyAction(id)))
    .catch(console.error);
};

export const updateReplyAction = (comment: IComment) => ({
  type: COMMENTS_REPLY_UPDATE,
  payload: comment,
});

export const updateReply =
  (id: number, data: IReply) => async (dispatch: Dispatch) => {
    return axiosAPI
      .put(`/comments/replies/${id}`, data)
      .then((response) => dispatch(updateReplyAction(response.data)))
      .catch(console.error);
  };

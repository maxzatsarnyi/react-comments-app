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
  try {
    const response = await axiosAPI.get(`/comments?_embed=replies`);
    dispatch(loadCommentsAction(response.data));
  } catch (error) {
    console.error(error);
  }
};

export const addComment = (comment: IComment) => ({
  type: COMMENTS_CREATE,
  payload: comment,
});

export const createComment = (data: IComment) => async (dispatch: Dispatch) => {
  try {
    await axiosAPI.post(`/comments`, data);
    dispatch(addComment(data));
    toast.success('Comment has been created!');
  } catch (error) {
    console.error(error);
  }
};

export const removeComment = (id: number) => ({
  type: COMMENTS_DELETE,
  payload: id,
});

export const deleteComment = (id: number) => async (dispatch: Dispatch) => {
  try {
    await axiosAPI.delete(`/comments/${id}`);
    dispatch(removeComment(id));
    toast.success('Comment has been deleted!');
  } catch (error) {
    console.error(error);
  }
};

export const updateCommentAction = (comment: IComment) => ({
  type: COMMENTS_UPDATE,
  payload: comment,
});

export const updateComment =
  (id: number, data: IComment) => async (dispatch: Dispatch) => {
    try {
      const response = await axiosAPI.put(`/comments/${id}`, data);
      dispatch(updateCommentAction(response.data));
      toast.success('Comment has been updated!');
    } catch (error) {
      console.error(error);
    }
  };

export const createReplyAction = (comment: Omit<IComment, 'replies'>) => ({
  type: COMMENTS_REPLY,
  payload: comment,
});

export const createReply =
  (id: number, data: Omit<IComment, 'replies'>) =>
  async (dispatch: Dispatch) => {
    try {
      const response = await axiosAPI.post(`/comments/${id}/replies`, data);
      dispatch(createReplyAction(response.data));
      toast.success(`Response has been posted!`);
    } catch (error) {
      console.error(error);
    }
  };

export const deleteReplyAction = (id: number) => ({
  type: COMMENTS_REPLY_DELETE,
  payload: id,
});

export const deleteReply = (id: number) => async (dispatch: Dispatch) => {
  try {
    await axiosAPI.delete(`/comments/replies/${id}`);
    dispatch(deleteReplyAction(id));
  } catch (error) {
    console.error(error);
  }
};

export const updateReplyAction = (comment: IComment) => ({
  type: COMMENTS_REPLY_UPDATE,
  payload: comment,
});

export const updateReply =
  (id: number, data: IReply) => async (dispatch: Dispatch) => {
    try {
      const response = await axiosAPI.put(`/comments/replies/${id}`, data);
      dispatch(updateReplyAction(response.data));
    } catch (error) {
      console.error(error);
    }
  };

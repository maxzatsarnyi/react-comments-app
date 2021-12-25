import { IComment, IReply } from './../../../entities/index';
import { Dispatch } from 'redux';
import axios from 'axios';
// import { toast } from 'react-toastify';
export const COMMENTS_LOAD = 'COMMENTS_LOAD';
export const COMMENTS_CREATE = 'COMMENTS_CREATE';
export const COMMENTS_DELETE = 'COMMENTS_DELETE';
export const COMMENTS_UPDATE = 'COMMENTS_UPDATE';
export const COMMENTS_REPLY = 'COMMENTS_REPLY';
export const COMMENTS_REPLY_DELETE = 'COMMENTS_REPLY_DELETE';
export const COMMENTS_REPLY_UPDATE = 'COMMENTS_REPLY_UPDATE';

const currentUrl = 'http://localhost:8000';

export const loadCommentsAction = (value: any[]) => ({
  type: COMMENTS_LOAD,
  payload: value,
});

export const loadComments = () => async (dispatch: Dispatch) => {
  return axios
    .get(`${currentUrl}/comments?_embed=replies`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      const { data } = response;
      dispatch(loadCommentsAction(data));
    })
    .catch((err) => console.error(err));
};

export const addComment = (comment: IComment) => ({
  type: COMMENTS_CREATE,
  payload: comment,
});

export const createComment = (data: IComment) => async (dispatch: Dispatch) => {
  return axios
    .post(`${currentUrl}/comments`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      dispatch(addComment(data));
    })
    .catch((err) => console.error(err));
};

export const removeComment = (id: number) => ({
  type: COMMENTS_DELETE,
  payload: id,
});

export const deleteComment = (id: number) => async (dispatch: Dispatch) => {
  return axios
    .delete(`${currentUrl}/comments/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      dispatch(removeComment(id));
    })
    .catch((err) => console.error(err));
};

export const updateCommentAction = (comment: IComment) => ({
  type: COMMENTS_UPDATE,
  payload: comment,
});

export const updateComment =
  (id: number, data: IComment) => async (dispatch: Dispatch) => {
    return axios
      .put(`${currentUrl}/comments/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const { data } = response;
        dispatch(updateCommentAction(data));
      })
      .catch((err) => console.error(err));
  };

export const createReplyAction = (comment: Omit<IComment, 'replies'>) => ({
  type: COMMENTS_REPLY,
  payload: comment,
});

export const createReply =
  (id: number, data: Omit<IComment, 'replies'>) =>
  async (dispatch: Dispatch) => {
    return axios
      .post(`${currentUrl}/comments/${id}/replies`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const { data } = response;
        dispatch(createReplyAction(data));
      })
      .catch((err) => console.error(err));
  };

export const deleteReplyAction = (id: number) => ({
  type: COMMENTS_REPLY_DELETE,
  payload: id,
});

export const deleteReply = (id: number) => async (dispatch: Dispatch) => {
  return axios
    .delete(`${currentUrl}/comments/replies/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      dispatch(deleteReplyAction(id));
    })
    .catch((err) => console.error(err));
};

export const updateReplyAction = (comment: IComment) => ({
  type: COMMENTS_REPLY_UPDATE,
  payload: comment,
});

export const updateReply =
  (id: number, data: IReply) => async (dispatch: Dispatch) => {
    return axios
      .put(`${currentUrl}/comments/replies/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        const { data } = response;
        dispatch(updateReplyAction(data));
      })
      .catch((err) => console.error(err));
  };

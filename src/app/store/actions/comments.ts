import { IComment } from './../../../entities/index';
import { Dispatch } from 'redux';
import axios from 'axios';
// import { toast } from 'react-toastify';
export const COMMENTS_LOAD = 'COMMENTS_LOAD';
export const COMMENTS_CREATE = 'COMMENTS_CREATE';
export const COMMENTS_DELETE = 'COMMENTS_DELETE';

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

// export const createComment = (credentials: SaveMeal) => {
//   axios
//     .post(`${currentUrl}/meal/add`, credentials, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     .then((response) => {
//       const { data } = response;

//       if (data.status === 'FAILED') {
//         const { message } = data;

//         // check for specific error
//         if (message.includes('amount')) {
//           toast.error(message);
//         }
//       } else if (data.status === 'SUCCESS') {
//         // const userData = data.data[0];
//         const { message } = data;
//         toast.success(message);
//       }
//     })
//     .catch((err) => console.error(err));
// };

// export const deleteComment = (id: string) => {
//   return (dispatch: Dispatch) => {
//     axios
//       .post(
//         `${currentUrl}/meal/delete`,
//         { id },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       )
//       .then((response) => {
//         const { data } = response;

//         if (data.status === 'FAILED') {
//           const { message } = data;
//           toast.error(message);
//         } else if (data.status === 'SUCCESS') {
//           const { message } = data;
//           toast.success(message);
//         }
//       })
//       .catch((err) => console.error(err));
//   };
// };

export const addComment = () => ({
  type: COMMENTS_CREATE,
});

export const removeComment = (mealId: number) => ({
  type: COMMENTS_DELETE,
  payload: {
    mealId,
  },
});

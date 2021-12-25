import React, { useState, useEffect } from 'react';
import './index.scss';
import { createComment } from '../../store/actions/comments';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import faker from 'faker';
import { RootState } from '../../../app/store/index';

export const CommentForm = () => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [img, setImg] = useState(faker.image.image());
  const commentsAmount: number = useSelector(
    (state: RootState) => state.comments.length
  );
  const handleCreateComment = () => {
    if (comment) {
      dispatch(
        createComment({
          id: commentsAmount + 1,
          name: faker.name.findName(),
          avatar: img,
          body: comment,
          date: Date.now(),
          replies: [],
        })
      );
    }
  };

  useEffect(() => {}, [dispatch]);

  return (
    <div className='comment-form'>
      <div className='comment-form__wrap'>
        <img src={img} alt='user' className='comment-form__user' />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Your message'
          className='comment-form__field'
        />
      </div>
      <button
        className='comment-form__button'
        onClick={() => handleCreateComment()}
        disabled={!comment}
      >
        Send
      </button>
    </div>
  );
};

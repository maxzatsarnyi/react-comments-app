import React, { useState } from 'react';
import './index.scss';
import userImg from './user.png';

export const CommentForm = () => {
  const [comment, setComment] = useState('');
  return (
    <div className='comment-form'>
      <div className='comment-form__wrap'>
        <img src={userImg} alt='user' className='comment-form__user' />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Your message'
          className='comment-form__field'
        />
      </div>
      <button className='comment-form__button'>Send</button>
    </div>
  );
};

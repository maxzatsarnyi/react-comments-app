import React, { useState } from 'react';
import './index.scss';

interface Props {
  receiverName: string;
}

export const ReplyForm: React.FC<Props> = ({ receiverName }) => {
  const [comment, setComment] = useState('');
  return (
    <div className='reply-form'>
      <div className='reply-form__header'>
        <span className='reply-form__receiver'>to {receiverName}</span>
        <span className='reply-form__btn-cancel'>Cancel</span>
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder='Your message'
        className='reply-form__field'
      />
      <button className='reply-form__button'>Send</button>
    </div>
  );
};

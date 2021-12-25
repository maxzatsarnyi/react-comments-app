import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { createReply, updateComment } from '../../store/actions/comments';
import { getCommentById } from '../../store/selectors';
import './index.scss';
import faker from 'faker';
import { v4 as uuid } from 'uuid';

interface Props {
  receiverName: string;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  activeComment: {
    id: number;
    type: string;
  };
  setActiveComment: React.Dispatch<
    React.SetStateAction<{
      id: number;
      type: string;
    }>
  >;
}

export const ReplyForm: React.FC<Props> = ({
  receiverName,
  message,
  setMessage,
  activeComment,
  setActiveComment,
}) => {
  const state = useSelector((state: RootState) => state);
  const isExist = getCommentById(state, activeComment.id);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (activeComment.type === 'edit') {
      if (isExist) {
        const updatedComment = {
          ...isExist,
          body: message,
          date: Date.now(),
        };
        dispatch(updateComment(activeComment.id, updatedComment));
      }
    } else if (activeComment.type === 'reply') {
      const newReply = {
        id: Number(uuid()),
        name: faker.name.findName(),
        avatar: faker.image.image(),
        body: message,
        date: Date.now(),
      };
      dispatch(createReply(activeComment.id, newReply));
    }
  };

  return (
    <div className='reply-form'>
      <div className='reply-form__header'>
        <span className='reply-form__receiver'>
          {activeComment.type === 'reply' ? `to ${receiverName}` : 'Editing...'}
        </span>
        <span
          className='reply-form__btn-cancel'
          onClick={() => setActiveComment({ id: 0, type: '' })}
        >
          Cancel
        </span>
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Your message'
        className='reply-form__field'
      />
      <button className='reply-form__button' onClick={() => handleSubmit()}>
        Send
      </button>
    </div>
  );
};

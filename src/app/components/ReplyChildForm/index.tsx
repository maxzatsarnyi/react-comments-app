import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateReply } from '../../store/actions/comments';
import './index.scss';
import { IReply } from '../../../entities';

interface Props {
  activeComment: {
    id: number;
    type: string;
    component: string;
  };
  setActiveComment: React.Dispatch<
    React.SetStateAction<{
      id: number;
      type: string;
      component: string;
    }>
  >;
  reply?: IReply;
}

export const ReplyChildForm: React.FC<Props> = ({
  activeComment,
  setActiveComment,
  reply,
}) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (
      activeComment.type === 'edit' &&
      activeComment.component === 'child' &&
      reply
    ) {
      const updatedReply = {
        ...reply,
        body: message,
        date: Date.now(),
      };
      dispatch(updateReply(activeComment.id, updatedReply));
    }
  };

  return (
    <div className='reply-form'>
      <div className='reply-form__header'>
        <span className='reply-form__receiver'>Editing...</span>
        <span
          className='reply-form__btn-cancel'
          onClick={() => setActiveComment({ id: 0, type: '', component: '' })}
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

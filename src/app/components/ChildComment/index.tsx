import React from 'react';
import './index.scss';
import { IReply } from '../../../entities/index';
import { getDate } from '../utils';

export const ChildComment: React.FC<{ reply: IReply; receiver: string }> = ({
  reply,
  receiver,
}) => {
  const img = new Image();
  img.src = reply.avatar;
  return (
    <div className='comment-child'>
      <img src={img.src} alt='user' className='comment__user' />
      <div className='comment-child__content'>
        <div className='comment-child__name-wrap'>
          <span className='comment-child__name'>{reply.name}</span>
          <span className='comment-child__receiver'>to {receiver}</span>
          <span className='comment-child__date'>{getDate(reply.date)}</span>
        </div>
        <div className='comment-child__desc'>{reply.body}</div>
      </div>
    </div>
  );
};

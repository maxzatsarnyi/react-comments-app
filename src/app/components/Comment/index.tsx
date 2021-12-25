import React, { useState } from 'react';
import './index.scss';
import { ReplyForm } from '../ReplyForm/index';
import { ChildComment } from '../ChildComment/index';
import { IComment } from '../../../entities/index';
import { getDate } from '../utils';
import { v4 as uuid } from 'uuid';

export const Comment: React.FC<{ comment: IComment }> = ({ comment }) => {
  const isReply = true;
  const img = new Image();
  img.src = comment.avatar;
  return (
    <li className='comment'>
      <div className='comment__wrap'>
        <img src={img.src} alt='user' className='comment__user' />
        <div className='comment__content'>
          <div className='comment__name-wrap'>
            <span className='comment__name'>{comment.name}</span>
            <span className='comment__date'>{getDate(comment.date)}</span>
          </div>
          <div className='comment__desc'>{comment.body}</div>
          <div className='comment__options'>
            <span>Edit</span>
            <span>Delete</span>
            <span>Reply</span>
          </div>
          {isReply && <ReplyForm receiverName={'Alice'} />}
          {comment.replies &&
            comment.replies.map((reply) => (
              <ChildComment
                key={uuid()}
                reply={reply}
                receiver={comment.name}
              />
            ))}
        </div>
      </div>
    </li>
  );
};

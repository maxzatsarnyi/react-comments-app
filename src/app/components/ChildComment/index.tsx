import React from 'react';
import './index.scss';
import userImg from './user.png';
import { ICommentChild } from '../../../entities/index';

interface Props {
  name: string;
  receiverName: string;
  desc: string;
  date: string;
}

export const ChildComment: React.FC<{ comment: ICommentChild }> = ({
  comment,
}) => {
  return (
    <div className='comment-child'>
      <img src={userImg} alt='user' className='comment__user' />
      <div className='comment-child__content'>
        <div className='comment-child__name-wrap'>
          <span className='comment-child__name'>{comment.name}</span>
          <span className='comment-child__receiver'>
            to {comment.receiverName}
          </span>
          <span className='comment-child__date'>{comment.date}</span>
        </div>
        <div className='comment-child__desc'>{comment.desc}</div>
      </div>
    </div>
  );
};

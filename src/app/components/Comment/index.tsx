import React, { useState } from 'react';
import './index.scss';
import userImg from './user.png';
import { ReplyForm } from '../ReplyForm/index';
import { ChildComment } from '../ChildComment/index';
import { ICommentChild } from '../../../entities/index';
// children comments
// isAuthor
export const Comment = () => {
  const [comment, setComment] = useState('');

  const childrenComments: ICommentChild[] = [
    {
      id: 1,
      name: 'Susan',
      receiverName: 'Alice',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing!',
      date: '2022-09-12',
    },
    {
      id: 2,
      name: 'Megan',
      receiverName: 'Alice',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing!',
      date: '2022-09-12',
    },
    {
      id: 3,
      name: 'Jesica',
      receiverName: 'Alice',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing!',
      date: '2022-09-12',
    },
  ];
  const isAuthor = true;
  const isReply = true;
  return (
    <div className='comment'>
      <div className='comment__wrap'>
        <img src={userImg} alt='user' className='comment__user' />
        <div className='comment__content'>
          <div className='comment__name-wrap'>
            <span className='comment__name'>Mexxy Bator</span>
            <span className='comment__date'>2022-07-12</span>
          </div>
          <div className='comment__desc'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit turpis
            ultrices massa?
          </div>
          <div className='comment__options'>
            {isAuthor ? (
              <>
                <span>Edit</span>
                <span>Delete</span>
                <span>Reply</span>
              </>
            ) : (
              <span>Reply</span>
            )}
          </div>
          {isReply && <ReplyForm receiverName={'Alice'} />}
          {childrenComments &&
            childrenComments.map((comment, index) => (
              <ChildComment key={index} comment={comment} />
            ))}
        </div>
      </div>
    </div>
  );
};

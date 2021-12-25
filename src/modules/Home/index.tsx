import React from 'react';
import './index.scss';
import { CommentForm } from '../../app/components/CommentForm/index';
import { Comment } from '../../app/components/Comment/index';
import { ICommentChild } from '../../entities/index';

export const HomePage = () => {
  const comments: ICommentChild[] = [
    {
      id: 1,
      name: 'Susan',
      receiverName: 'Alice',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit turpis ultrices massa?',
      date: '2022-09-12',
    },
    {
      id: 2,
      name: 'Susan',
      receiverName: 'Alice',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit turpis ultrices massa?',
      date: '2022-09-12',
    },
    {
      id: 3,
      name: 'Susan',
      receiverName: 'Alice',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit turpis ultrices massa?',
      date: '2022-09-12',
    },
  ];
  return (
    <div className='homepage'>
      <div className='homepage__container'>
        <CommentForm />
        <ul className='homepage__comments-list'>
          {comments &&
            comments.map((comment, index) => <Comment key={index} />)}
        </ul>
      </div>
    </div>
  );
};

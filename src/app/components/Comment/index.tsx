import React, { useState } from 'react';
import './index.scss';
import { ReplyForm } from '../ReplyForm/index';
import { ChildComment } from '../ChildComment/index';
import { IComment } from '../../../entities/index';
import { getDate } from '../utils';
import { v4 as uuid } from 'uuid';
import { deleteComment, updateComment } from '../../store/actions/comments';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store/index';
import { getCommentById } from '../../store/selectors';

interface Props {
  comment: IComment;
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

export const Comment: React.FC<Props> = ({
  comment,
  activeComment,
  setActiveComment,
}) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
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
            <span
              onClick={() => setActiveComment({ id: comment.id, type: 'edit' })}
            >
              Edit
            </span>
            <span onClick={() => dispatch(deleteComment(comment.id))}>
              Delete
            </span>
            <span
              onClick={() =>
                setActiveComment({ id: comment.id, type: 'reply' })
              }
            >
              Reply
            </span>
          </div>
          {activeComment.id === comment.id && (
            <ReplyForm
              receiverName={comment.name}
              message={message}
              setMessage={setMessage}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
            />
          )}
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

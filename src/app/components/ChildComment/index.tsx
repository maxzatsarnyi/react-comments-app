import React from 'react';
import './index.scss';
import { IReply } from '../../../entities/comment';
import { getDate } from '../../../utils/utils';
import { deleteReply } from '../../store/actions/comments';
import { useDispatch } from 'react-redux';
import { ReplyChildForm } from '../ReplyChildForm';

interface Props {
  reply: IReply;
  receiver: string;
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
}

export const ChildComment: React.FC<Props> = ({
  reply,
  receiver,
  activeComment,
  setActiveComment,
}) => {
  const dispatch = useDispatch();
  const img = new Image();
  img.src = reply.avatar;
  return (
    <div className='comment-child'>
      <div className='comment-child__container'>
        <img src={img.src} alt='user' className='comment-child__user' />
        <div className='comment-child__content'>
          <div className='comment-child__name-wrap'>
            <span className='comment-child__name'>{reply.name}</span>
            <span className='comment-child__receiver'>to {receiver}</span>
            <span className='comment-child__date'>{getDate(reply.date)}</span>
          </div>
          <div className='comment-child__desc'>{reply.body}</div>
          <div className='comment-child__options'>
            <span
              onClick={() =>
                setActiveComment({
                  id: reply.id,
                  type: 'edit',
                  component: 'child',
                })
              }
            >
              Edit
            </span>
            <span onClick={() => dispatch(deleteReply(reply.id))}>Delete</span>
          </div>
        </div>
      </div>

      {activeComment.id === reply.id && activeComment.component === 'child' && (
        <ReplyChildForm
          activeComment={activeComment}
          setActiveComment={setActiveComment}
          reply={reply}
        />
      )}
    </div>
  );
};

import { useEffect, useState } from 'react';
import './index.scss';
import { CommentForm } from '../../app/components/CommentForm/index';
import { Comment } from '../../app/components/Comment/index';
import { IComment } from '../../entities/index';
import { loadComments } from '../../app/store/actions/comments';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store/index';
import { v4 as uuid } from 'uuid';

export const HomePage = () => {
  const dispatch = useDispatch();
  const comments: IComment[] = useSelector(
    (state: RootState) => state.comments
  );
  const [activeComment, setActiveComment] = useState({
    id: 0,
    type: '',
    component: '',
  });

  useEffect(() => {
    dispatch(loadComments());
  }, [dispatch]);

  return (
    <div className='homepage'>
      <div className='homepage__container'>
        <CommentForm />
        <ul className='homepage__comments-list'>
          {comments &&
            comments.map((comment) => (
              <Comment
                key={uuid()}
                comment={comment}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

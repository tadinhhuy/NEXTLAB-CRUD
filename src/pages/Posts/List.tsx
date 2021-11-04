import { Typography, Button, Form } from 'antd';
import { memo, useState } from 'react';
import { Card } from '../../components';
import { useStateProvider } from '../../hooks';
import { IPostList } from '../../interfaces/posts';

const PostList: React.FC<any> = ({
  totalPosts,
  onHover,
  isHover,
  cardIndex,
  onDelete,
  onShowModalEditing,
}): JSX.Element => {
  // const [state]: any = useStateProvider();

  return (
    <div className='list-container'>
      <div>
        {totalPosts?.map((post: IPostList, index: number) => {
          return (
            <Card
              key={post.id}
              styles={{ width: 500, height: 300, margin: '10px 0' }}
              onMouseLeave={() => onHover(false, index)}
              onMouseEnter={() => onHover(true, index)}
              bodyStyle={{ height: '100%' }}
              hoverable
            >
              {isHover && cardIndex === index ? (
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <Button
                    onClick={() => onShowModalEditing(post.id)}
                    style={{ width: '50%' }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDelete(post.id)}
                    style={{ width: '50%' }}
                  >
                    Delete
                  </Button>
                </div>
              ) : (
                <>
                  <Typography.Title level={3}>{post.title}</Typography.Title>
                  <Typography.Text>{post.body}</Typography.Text>
                </>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default memo(PostList);

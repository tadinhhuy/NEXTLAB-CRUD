import { memo, useEffect, useState } from 'react';
import { Form, Typography } from 'antd';
import './styles.css';
import PostList from './List';
import FormController from './FormController';
import { getPosts } from '../../services';
import { IPostList } from '../../interfaces/posts';
import { Loader, Modal } from '../../components';

const Container: React.FC = (): JSX.Element => {
  const [formEditing]: any = Form.useForm();
  const [formCreating]: any = Form.useForm();
  const [totalPosts, setTotalPosts] = useState<IPostList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [cardIndex, setCardIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPostId, setCurrentPostId] = useState<number>();

  const onMouseHover = (isHover: boolean, cardIndex: number): void => {
    setIsHover(isHover);
    setCardIndex(cardIndex);
  };

  const onHandleDelete = (postIndex: number): void => {
    const newPostList: any = totalPosts?.filter(
      (post: IPostList) => post.id !== postIndex
    );
    setTotalPosts(newPostList);
  };

  const onFinishEditing = (allValues: {
    title: string;
    body: string;
  }): void => {
    const newTotalPosts: any = [...totalPosts];
    const postIndex = totalPosts.findIndex(
      (post: IPostList) => post.id === currentPostId
    );
    newTotalPosts[postIndex] = {
      ...totalPosts[postIndex],
      ...allValues,
    };
    setTotalPosts(newTotalPosts);
    setShowModal(false);
  };

  const onFinishCreate = (allValues: { title: string; body: string }): void => {
    const postId: any = totalPosts?.length;
    const payload = { ...allValues, userId: 3, id: postId + 1 };
    formCreating.resetFields();
    setTotalPosts((prev: any) => [...prev, { ...payload }]);
  };

  const findPost = (postIndex: number | undefined): IPostList | undefined => {
    const currentPost: IPostList | undefined = totalPosts?.find(
      (item: IPostList) => item.id === postIndex
    );
    return currentPost;
  };

  const onShowModalEditing = (postIndex: number): void => {
    setShowModal(true);
    setCurrentPostId(postIndex);
    const currentPost = findPost(postIndex);
    formEditing.setFieldsValue({
      title: currentPost?.title,
      body: currentPost?.body,
    });
  };

  const getPostList = async (): Promise<void> => {
    try {
      setLoading(true);
      const res: any = await getPosts();
      setTotalPosts(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostList();
  }, []);

  if (loading) {
    return (
      <div className='loader'>
        <Loader />
      </div>
    );
  }

  return (
    <div className='container'>
      <PostList
        totalPosts={totalPosts}
        onHover={onMouseHover}
        isHover={isHover}
        cardIndex={cardIndex}
        onShowModalEditing={onShowModalEditing}
        onDelete={onHandleDelete}
      />

      <FormController
        requiredMark={false}
        layout='vertical'
        form={formCreating}
        onFinish={onFinishCreate}
        btnText='Create Post'
      />

      <Modal
        footer={null}
        visible={showModal}
        onCancel={() => setShowModal(false)}
      >
        <Typography.Title level={4}>Edit Post</Typography.Title>
        <FormController
          requiredMark={false}
          layout='vertical'
          form={formEditing}
          onFinish={onFinishEditing}
          btnText='Edit'
        />
      </Modal>
    </div>
  );
};

export default memo(Container);

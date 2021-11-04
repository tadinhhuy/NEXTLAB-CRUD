import { memo, useEffect, useState } from 'react';
import { Form, Typography } from 'antd';
import './styles.css';
import PostList from './List';
import FormController from './FormController';
import { getPosts } from '../../services';
import { StateProvider, useStateProvider } from '../../hooks';
import { IInitialState, IPostList } from '../../interfaces/posts';
import { Loader, Modal } from '../../components';

const initialState: IInitialState = {
  totalPosts: [],
  loading: false,
  isHover: false,
  cardIndex: null,
  showModal: false,
  currentPostId: null,
};

enum Type {
  TOTAL_POST = 'TOTAL_POST',
  LOADING = 'LOADING',
  HOVER = ' HOVER',
  CARD_INDEX = 'CARD_INDEX',
  SHOW_MODAL = 'SHOW_MODAL',
  CURRENT_POST_ID = 'CURRENT_POST_ID',
  HANDLE_DELETE = 'HANDLE_DELETE',
  SHOW_MODAL_EDITING = 'SHOW_MODAL_EDITING',
}

const Container: React.FC = (): JSX.Element => {
  // const [state, dispatch]: any = useStateProvider();
  const [formEditing]: any = Form.useForm();
  const [formCreating]: any = Form.useForm();
  const [totalPosts, setTotalPosts] = useState<IPostList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [cardIndex, setCardIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPostId, setCurrentPostId] = useState<number>();

  const onMouseHover = (isHover: boolean, cardIndex: number) => {
    setIsHover(isHover);
    setCardIndex(cardIndex);
    // dispatch({ isHover });
    // dispatch({ cardIndex });
  };

  const reducer = (state: object, action: any): object => {
    switch (action.type) {
      case Type.TOTAL_POST:
        return { ...state, totalPosts: action.payload };
      case Type.LOADING:
        return { ...state, loading: action.payload };
      case Type.HOVER:
        return { ...state, isHover: action.payload };
      case Type.CARD_INDEX:
        return { ...state, cardIndex: action.payload };
      case Type.SHOW_MODAL:
        return { ...state, showModal: action.payload };
      case Type.CURRENT_POST_ID:
        return { ...state, currentPostId: action.payload };
      default:
        return state;
    }
  };

  const onHandleDelete = (postIndex: number): void => {
    const newPostList: any = totalPosts?.filter(
      (post: IPostList) => post.id !== postIndex
    );
    setTotalPosts(newPostList);
    // const newPostList: any = state?.totalPosts?.filter(
    //   (post: IPostList) => post.id !== postIndex
    // );
    // dispatch({ type: Type.TOTAL_POST, payload: newPostList });
  };

  const onFinishEditing = (allValues: { title: string; body: string }) => {
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
    // const newTotalPosts: any = [...state?.totalPosts];
    // const postIndex = state?.totalPosts.findIndex(
    //   (post: IPostList) => post.id === state?.currentPostId
    // );
    // newTotalPosts[postIndex] = {
    //   ...state?.totalPosts[postIndex],
    //   ...allValues,
    // };
    // dispatch({ type: Type.TOTAL_POST, payload: newTotalPosts });
    // dispatch({ type: Type.SHOW_MODAL, payload: false });
  };

  const onFinishCreate = (allValues: { title: string; body: string }): void => {
    const postId: any = totalPosts?.length;
    const payload = { ...allValues, userId: 3, id: postId + 1 };
    formCreating.resetFields();
    setTotalPosts((prev: any) => [...prev, { ...payload }]);
    // const postId: any = state?.totalPosts?.length;
    // const payload = { ...allValues, userId: 3, id: postId + 1 };
    // formCreating.resetFields();
    // dispatch({ type: Type.TOTAL_POST, payload });
  };

  const findPost = (postIndex: number | undefined): IPostList | undefined => {
    const currentPost: IPostList | undefined = totalPosts?.find(
      (item: IPostList) => item.id === postIndex
    );
    // const currentPost: IPostList | undefined = state?.totalPosts?.find(
    //   (item: IPostList) => item.id === postIndex
    // );
    return currentPost;
  };

  const onShowModalEditing = (postIndex: number): void => {
    setShowModal(true);
    setCurrentPostId(postIndex);
    // dispatch({ type: Type.SHOW_MODAL, payload: true });
    // dispatch({ type: Type.CURRENT_POST_ID, payload: postIndex });
    const currentPost = findPost(postIndex);
    formEditing.setFieldsValue({
      title: currentPost?.title,
      body: currentPost?.body,
    });
  };

  const getPostList = async (): Promise<void> => {
    try {
      setLoading(true);
      // dispatch({ type: Type.LOADING, payload: true });
      const res: any = await getPosts();
      // dispatch({ type: Type.TOTAL_POST, payload: res });
      setTotalPosts(res);
    } catch (error) {
      console.error(error);
    } finally {
      // dispatch({ type: Type.LOADING, payload: false });
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
  // if (state?.loading) {
  //   return (
  //     <div className='loader'>
  //       <Loader />
  //     </div>
  //   );
  // }

  return (
    <StateProvider reducer={reducer} initialState={initialState}>
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
    </StateProvider>
  );
};

export default memo(Container);

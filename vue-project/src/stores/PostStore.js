import { defineStore } from "pinia";
import { ref, watch } from "vue";

const data = ref([
  {
    id: 1,
    title: "Сегодня было замечательное предложение пойти поужинать этим вечером. Главное, чтобы погода была преимущественно теплой.",
    comments: [
      { id: 1, text: "Самый яркий комментарий в этом посте" },
      { id: 2, text: "Один из бессмысленный комментарий в этом посте"}
    ],
    isShow: false,
    showCommentInput: false,
  },
  {
    id: 2,
    title: "Краткосрочное вымышленное преломление может выполнять особую роль в   пространстве главной роли игрока ",
    comments: [
      { id: 1, text: "Очень научно и непонятно" },
    ],
    isShow: false,
    showCommentInput: false,
  }
]);

export const usePostStore = defineStore('postStore', () => {
  const post = ref(JSON.parse(localStorage.getItem('post')) ?? data)
 
  const removePost = (id) => {
    post.value = post.value.filter(el => el.id !== id);
  };

  const removeComment = (postId, commentId) => {
    const postIndex = post.value.findIndex(el => el.id === postId);

    if (postIndex !== -1) {
      const updatedComments = post.value[postIndex].comments.filter(comment => comment.id !== commentId);
      post.value[postIndex].comments = updatedComments;
    }
  };

  const addPost = (newPostText) => {
    if (newPostText.trim() !== '') {
      const newPost = {
        id: post.value.length + 1, 
        title: newPostText,
        comments: [],
        isShow: false,
        showCommentInput: false,
      };
      post.value.push(newPost);
    }
  };

  const toggleComments = (post) => {
    post.isShow = !post.isShow;
    toggleCommentInput(post);
  };

  const toggleCommentInput = (post) => {
    post.showCommentInput = !post.showCommentInput;
  };

  const openModal = (post) => {
    selectedPost.value = post;
    editedPost.value = post.title;
    showModal.value = true;
  };

  const closeModal = () => {
    showModal.value = false;
    editedPost.value = '';
    selectedPost.value = null;
  };

  const saveChanges = () => {
    if (selectedPost.value) {
      selectedPost.value.title = editedPost.value;
    }
    closeModal();
  };

  const addComment = (post) => {
    const newCommentText = newComment.value.trim();
  
    if (newCommentText !== '') {
      const newComment = { id: post.comments.length + 1, text: newCommentText };
      post.comments.push(newComment);
      postStore.newComment = '';
    }
  };

  const showModal = ref(false);
  const editedPost = ref('');
  const selectedPost = ref(null);
  const newComment = ref('');

  watch(
    () => post,
    () => {
      localStorage.setItem('post', JSON.stringify(post.value))
    },
    {deep: true}
  )

  return {
    post,
    removePost,
    removeComment,
    addPost,
    toggleComments,
    toggleCommentInput,
    openModal,
    closeModal,
    saveChanges,
    addComment,
    showModal,
    editedPost,
    selectedPost,
    newComment,
  };
});

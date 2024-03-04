<template>
  <div class="post" v-for="post in postStore.post" :key="post.id">
    <h3>{{ post.title }}</h3>
    <div class="wrapper">
      <div class="buttons">
        <button class="btn" style="background-color: #216CFF;" @click="postStore.toggleComments(post)">Комментарии</button>
        <button style="background-color: #216CFF;" @click="postStore.openModal(post)">Изменить</button>
        <button style="background-color: #FF218B;" @click="postStore.removePost(post.id)">Удалить</button>
      </div>
    </div>
    
    <div v-if="post.isShow" class="comment-block">
      <div class="comment-input" v-if="post.showCommentInput">
        <input v-model="postStore.newComment" placeholder="Введите комментарий" />
        <button @click="postStore.addComment(post)">Добавить комментарий</button>
      </div>
      <div v-for="comment in post.comments" :key="comment.id" class="comment">
        <span>{{ comment.text }}</span>
        <button style="background-color: #FF218B;" @click="postStore.removeComment(post.id, comment.id)">Удалить</button>
      </div>
    </div>

    <div v-if="postStore.showModal" class="overlay">
      <div class="modal">
        <input v-model="postStore.editedPost"/>
        <div class="modal_btn">
          <button style="background-color: #216CFF;" @click="postStore.saveChanges">Изменить</button>
          <button style="background-color: #FF218B;" @click="postStore.closeModal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from "@/stores/PostStore";
const postStore = usePostStore();
</script>


<style scoped>
.post {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 3px solid #0094FF;
  width: 800px;
  height: auto; 
  border-radius: 8px;
  margin-bottom: 50px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.buttons {
  display: flex;
  gap: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.buttons > button {
  font-size: 16px;
  color: white;
  border-radius: 15px;
  padding: 10px 20px;
  border: none;
}

.btn{
  margin-right: 200px;
}

.comment-block {
  margin-top: 20px;
}

.comment {
  padding: 8px;
  margin-bottom: 5px;
}

.comment > span {
  margin-right: 50px;
  border: 1px solid #0094FF;
  border-radius: 15px;
  padding: 10px 20px;
  font-size: 16px;
}

.comment > button {
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 220px;
  border: 1px solid #0094FF;
  background-color: white;
}

.modal > input {
  width: 700px;
  height: 50px;
  border-radius: 15px;
  padding: 10px 20px;
  border: 1px solid #6E6E6E;
  margin-bottom: 40px;
}

.modal_btn {
  display: flex;
  gap: 30px;
  margin-left: 400px;
}

.modal_btn > button {
  width: 138px;
  height: 30px;
  font-size: 16px;
  color: white;
  border: none; 
  border-radius: 15px;   
}

.comment-input {
  margin-bottom: 10px;
}

.comment-input > input {
  border-radius: 15px;
  border: 1px solid #6E6E6E;
  margin-right: 70px;
  padding: 10px 20px; 
}

.comment-input > button {
  width: 117px;
  height: 43px;
  border-radius: 15px;
  color: white;
  background-color: #216CFF;
  border: none;
}
</style>

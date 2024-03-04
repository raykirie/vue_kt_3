<template>
    <div class="add_post">
      <input v-model="newPostText" />
      <button @click="addPost">Добавить</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { usePostStore } from "@/stores/PostStore";
  
  const postStore = usePostStore();
  const newPostText = ref('');
  
  const addPost = () => {
    postStore.addPost(newPostText.value);
    newPostText.value = ''; 
  };
  </script>

<style>
    .add_post{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 100px;
        margin-bottom: 100px;
    }

    .add_post > input{
        width: 561px;
        height: 51px;
        border-radius: 15px;
    }

    .add_post > button {
        width: 177px;
        height: 51px;
        background-color: #216CFF;
        border-radius: 15px;
        color: white;
        font-size: 24px;
        border: none;
    }
</style>
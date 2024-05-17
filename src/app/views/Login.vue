<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="submitForm">
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const password = ref('');

const submitForm = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/login', {
      email: email.value,
      password: password.value,
    });
    console.log(response.data.token);
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.login-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>

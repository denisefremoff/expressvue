<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        // fullName: "",
        email: "",
        password: "",
        // phoneNumber: "",
      },
      message: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          this.form
        );
        this.message = response.data;
        document.cookie =
          "accessToken=" + response.data.candidateData.accessToken;
        // this.$router.push({ name: "ListClients" });
      } catch (error) {
        this.message = error.response.data;
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div>
    <h2>Вход</h2>
    <form @submit.prevent="submitForm">
      <div>
        <input
          type="email"
          placeholder="E-mail"
          v-model="form.email"
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Пароль"
          v-model="form.password"
          required
        />
      </div>

      <button type="submit">Отправить</button>
    </form>
    <p v-if="message">{{ message.message }}</p>
  </div>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 0 auto;
}

div {
  margin-bottom: 10px;
}

input {
  padding: 5px;
  font-size: 16px;
  width: 385px;
}

button {
  padding: 10px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #35916b;
}

p {
  margin-top: 20px;
  font-weight: bold;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        fullName: "",
        email: "",
        contract_number: "",
        contract_term: "",
        password: "",
      },
      message: "",
    };
  },
  async created() {
    const clientId = this.$route.params.id;

    try {
      const response = await axios.get(
        `http://localhost:3000/api/manager/client/${clientId}`
      );
      this.form = response.data; // Заполняем форму данными клиента
    } catch (error) {
      this.message =
        "Error: " + (error.response ? error.response.data : error.message);
    }
  },
  methods: {
    async submitForm() {
      const clientId = this.$route.params.id;
      try {
        await axios.patch(
          `http://localhost:3000/api/client/redaction`,
          this.form
        );
        this.message = "Клиент обновлен успешно";
        //this.$router.push({ name: "ClientDetails", params: { id: clientId } }); // Перенаправление на страницу клиента
      } catch (error) {
        this.message =
          "Error: " + (error.response ? error.response.data : error.message);
      }
    },
  },
};
</script>
<template>
  <div>
    <h1>{{ this.$route.params.id }}</h1>
    <h2>Редактировать клиента</h2>
    <form @submit.prevent="submitForm">
      <div>
        <input
          type="text"
          placeholder="Фамилия Имя Отчество"
          v-model="form.fullName"
          required
        />
      </div>
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
          type="text"
          placeholder="Номер договора"
          v-model="form.contract_number"
          required
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Срок договора в месяцах"
          v-model="form.contract_term"
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
      <button type="submit">Сохранить изменения</button>
    </form>
    <p v-if="message">{{ message }}</p>
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

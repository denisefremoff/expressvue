<script>
import axios from '../axiosConfig';

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        contract_number: '',
        contract_term: '',
        password: ''
      },
      message: '',
      errors: {}
    };
  },
  methods: {
    async submitForm() {
      try {
        this.errors = {}; // Сброс ошибок перед отправкой
        console.log('Отправка данных:', this.form);
        const response = await axios.post('/api/clients', this.form);
        console.log('Ответ сервера:', response.data);
        const newClientId = response.data.id; // Получаем ID нового клиента
        this.$router.push({ name: 'ClientDetails', params: { id: newClientId } }); // Перенаправление на страницу клиента
      } catch (error) {
        console.error('Ошибка при создании клиента:', error);
        if (error.response && error.response.data.errors) {
          console.log('Ответ ошибки сервера:', error.response.data.errors);
          this.processValidationErrors(error.response.data.errors);
        } else {
          this.message = `Ошибка: ${error.message}`;
        }
      }
    },
    processValidationErrors(errors) {
      errors.forEach(error => {
        this.errors[error.path] = error.msg;
      });
    }
  }
};
</script>

<template>
  <div>
    <h2>Создать нового клиента</h2>
    <form @submit.prevent="submitForm">
      <div>
        <input type="text" placeholder="Фамилия Имя Отчество" v-model="form.name" required>
        <p v-if="errors.name" class="error">{{ errors.name }}</p>
      </div>
      <div>
        <input type="email" placeholder="E-mail" v-model="form.email" required>
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>
      <div>
        <input type="text" placeholder="Номер договора" v-model="form.contract_number" required>
        <p v-if="errors.contract_number" class="error">{{ errors.contract_number }}</p>
      </div>
      <div>
        <input type="number" placeholder="Срок договора в месяцах" v-model="form.contract_term" required>
        <p v-if="errors.contract_term" class="error">{{ errors.contract_term }}</p>
      </div>
      <div>
        <input type="password" placeholder="Пароль" v-model="form.password" required>
        <p v-if="errors.password" class="error">{{ errors.password }}</p>
      </div>
      <button type="submit">Добавить</button>
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

p.error {
  color: red;
  font-size: 14px;
  margin: 5px 0 0 0;
}

p {
  margin-top: 20px;
  font-weight: bold;
}
</style>

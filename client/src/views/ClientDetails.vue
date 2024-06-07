<script>
import axios from 'axios';

export default {
  data() {
    return {
      client: null,
      message: ''
    };
  },
  async created() {
    const clientId = this.$route.params.id;
    try {
      const response = await axios.get(`http://localhost:3000/clients/${clientId}`);
      this.client = response.data;
    } catch (error) {
      this.message = 'Error: ' + (error.response ? error.response.data : error.message);
    }
  },
  methods: {
    async deleteClient() {
      const clientId = this.$route.params.id;
      try {
        console.log(`Отправка запроса на удаление клиента с ID: ${clientId}`);
        const response = await axios.delete(`http://localhost:3000/clients/${clientId}`);
        console.log('Ответ сервера на удаление:', response.data);
        this.message = 'Клиент успешно удален';
        this.$router.push({ name: 'ListClients' }); // Перенаправление на страницу списка клиентов
      } catch (error) {
        console.error('Ошибка при удалении клиента:', error);
        this.message = 'Error: ' + (error.response ? error.response.data : error.message);
      }
    }
  }
};
</script>

<template>
  <div>
    <h2>Клиент</h2>
    <p v-if="message">{{ message }}</p>
    <div v-else-if="client">
      <p><strong>ФИО:</strong> {{ client.name }}</p>
      <p><strong>E-mail:</strong> {{ client.email }}</p>
      <p><strong>№ договора:</strong> {{ client.contract_number }}</p>
      <p><strong>Срок договора в месяцах:</strong> {{ client.contract_term }}</p>
      <p><strong>Пароль:</strong> {{ client.password }}</p>
    </div>
    <div v-if="client" class="tool">
      <router-link :to="{ name: 'EditingClient', params: { id: client.id } }">Редактирование клиента</router-link>
      <button @click="deleteClient">Удалить клиента</button>
    </div>
  </div>
</template>

<style scoped>
h2 {
  color: #213547;
}

p {
  margin: 5px 0;
}

.tool {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.tool a {
  margin-right: 10px;
}

.tool button {
  margin-left: 10px;
}

a {
  display: block;
  width: 250px;
  padding: 10px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
}

a:hover {
  background-color: #35916b;
}

button {
  padding: 10px;
  font-size: 16px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: block;
  width: 270px;
}

button:hover {
  background-color: #c0392b;
}
</style>

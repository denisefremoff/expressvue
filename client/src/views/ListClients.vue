<script>
import axios from '../axiosConfig';

export default {
  data() {
    return {
      clients: [],
      message: ''
    };
  },
  async created() {
    try {
      const response = await axios.get('/api/clients');
      this.clients = response.data;
    } catch (error) {
      this.message = 'Ошибка: ' + (error.response ? error.response.data : error.message);
    }
  },
  methods: {
    async deleteClient(clientId) {
      try {
        await axios.delete(`/api/clients/${clientId}`);
        this.clients = this.clients.filter(client => client.id !== clientId);
        this.message = 'Клиент успешно удален';
      } catch (error) {
        this.message = 'Ошибка: ' + (error.response ? error.response.data : error.message);
      }
    }
  }
};
</script>

<template>
  <div>
    <h2>Список клиентов</h2>
    <ul>
      <li v-for="client in clients" :key="client.id">
        <router-link :to="{ name: 'ClientDetails', params: { id: client.id } }">
          <p><strong>ФИО:</strong> {{ client.name }}</p>
          <p><strong>E-mail:</strong> {{ client.email }}</p>
          <p><strong>№ договора:</strong> {{ client.contract_number }}</p>
          <p><strong>Срок договора в месяцах:</strong> {{ client.contract_term }}</p>
          <p><strong>Дата создания:</strong> {{ new Date(client.created_at).toLocaleString() }}</p>
          <p><strong>Дата последнего обновления:</strong> {{ new Date(client.updated_at).toLocaleString() }}</p>
        </router-link>
        <div class="tool">
          <router-link :to="{ name: 'EditingClient', params: { id: client.id } }"
            class="edit-link">Редактировать</router-link>
          <button @click="deleteClient(client.id)">Удалить</button>
        </div>
      </li>
    </ul>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
}

li:first-child {
  border-top: 1px solid #ddd;
}

h2 {
  color: #213547;
}

p {
  margin-top: 5px;
  margin-bottom: 5px;
}

p:first-child {
  margin-top: 20px;
}

p:last-child {
  margin-bottom: 20px;
}

a {
  color: #213547;
  text-align: start;
  width: 400px;
}

a:hover {
  opacity: 0.5;
}

.edit-link {
  display: block;
  width: 250px;
  padding: 10px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  margin-right: 10px;
  text-align: center;
}

.tool {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.edit-link:hover {
  background-color: #35916b;
  opacity: 1;
}

button {
  display: block;
  padding: 10px;
  font-size: 16px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 270px;
  margin-left: 10px;
}

button:hover {
  background-color: #c0392b;
}
</style>

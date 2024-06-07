<script>
import axios from 'axios';

export default {
  data() {
    return {
      clients: [],
      message: ''
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/clients');
      this.clients = response.data;
    } catch (error) {
      this.message = 'Error: ' + (error.response ? error.response.data : error.message);
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
          <p><strong>Пароль:</strong> {{ client.password }}</p>
        </router-link>
        <div class="tool">
          <router-link :to="{ name: 'EditingClient', params: { id: client.id } }"
            class="edit-link">Редактировать</router-link>
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
  margin-bottom: 20px;
}

.edit-link:hover {
  background-color: #35916b;
  opacity: 1;
}
</style>

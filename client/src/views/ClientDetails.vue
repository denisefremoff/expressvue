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
  </div>
  <div v-if="client" class="tool">
    <router-link :to="{ name: 'EditingClient', params: { id: client.id } }">Редактирование клиента</router-link>
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
}

a:hover {
  background-color: #35916b;
}
</style>

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
    <div v-else>
      <p><strong>ФИО:</strong> {{ client.name }}</p>
      <p><strong>E-mail:</strong> {{ client.email }}</p>
      <p><strong>№ договора:</strong> {{ client.contract_number }}</p>
      <p><strong>Срок договора в месяцах:</strong> {{ client.contract_term }}</p>
      <p><strong>Пароль:</strong> {{ client.password }}</p>
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
</style>

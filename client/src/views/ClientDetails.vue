<script>
import axios from "axios";

export default {
  data() {
    return {
      client: {},
      message: "",
    };
  },
  async created() {
    const clientId = this.$route.params.id;
    try {
      const response = await axios.get(
        `http://localhost:3000/api/manager/client/${clientId}`
      );
      this.client = response.data;
      console.log(response);
    } catch (error) {
      this.message =
        "Error: " + (error.response ? error.response.data : error.message);
    }
  },
  methods: {
    async deleteClient() {
      const clientId = this.$route.params.id;
      try {
        await axios.delete(
          `http://localhost:3000/api/manager/client-delete/${clientId}`
        );
        this.message = response.data;
        this.$router.push({ name: "ListClients" });
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
    <h2>Клиент</h2>
    <p v-if="message">{{ message.message }}</p>
    <div v-else>
      <p><strong>ФИО:</strong> {{ client.fullName }}</p>
      <p><strong>E-mail:</strong> {{ client.email }}</p>
      <p><strong>№ договора:</strong> {{ client.contract_number }}</p>
      <p>
        <strong>Срок договора в месяцах:</strong> {{ client.contract_term }}
      </p>
    </div>
    <div v-if="client" class="tool">
      <router-link :to="{ name: 'EditingClient', params: { id: client.id } }"
        >Редактирование клиента</router-link
      >
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
</style>

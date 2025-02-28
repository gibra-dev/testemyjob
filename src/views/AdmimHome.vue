<template>
  <TopMenu :user="user" />
  <div>
    <div class="content">
      <div class="info-user">
        <div class="icon"><i class="bi bi-people fs-2"></i></div>
        <h4>{{ total.total_users }}</h4>
        <p>Usuários</p>
      </div>

      <div class="links">
        <a href="/user">Adicionar saldo</a>
      </div>
      <div class="links">
        <button @click="updateProfit" :disabled="loading">
          {{ loading ? "Calculando..." : "Atualizar Lucro" }}
        </button>
      </div>
    </div>
    <Menu />
  </div>
  
  <PopUp 
    v-if="showPopup" 
    :show-popup="showPopup" 
    :response-message="popupMessage" 
    :popup-content="popupContent"
    @close-popup="closePopup" 
  />
</template>

<script>
import TopMenu from "../components/TopMenu.vue";
import apiClient from "@/assets/js/https.js";
import Menu from "../components/Menu.vue";
import PopUp from "../components/PopUp.vue";

export default {
  components: {
    TopMenu,
    Menu,
    PopUp,
  },
  data() {
    return {
      user: {},
      total: {
        status: "",
        total_users: 0,
      },
      showPopup: false,
      popupMessage: null,
      responseStatus: null,
      loading: false,
      updateClicks: 0,
    };
  },
  created() {
    const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
      this.getTotalUsers();
    } else {
      this.$router.push("/sign-in");
    }
  },
  methods: {
    async getTotalUsers() {
      this.loading = true;
      this.popupMessage = null;
      this.responseStatus = null;

      try {
        const response = await apiClient.post("/myjob/callback.php", {
          action: "get-total-users",
        });

        if (response.data.status === "success") {
          this.total = response.data;
          this.popupMessage = `Total de usuários atualizado!\nClique no botão Atualizar: ${this.updateClicks} vezes`;
          this.responseStatus = "success";
        } else {
          this.popupMessage = response.data.message || "Falha ao obter total de usuários.";
          this.responseStatus = "error";
        }
      } catch (err) {
        this.popupMessage = "Erro ao conectar ao servidor. Tente novamente mais tarde.";
        this.responseStatus = "error";
      } finally {
        this.showPopup = true;
        this.loading = false;
      }
    },
    async updateProfit() {
      this.loading = true;
      try {
        const response = await apiClient.post("/myjob/callback.php", {
          action: "profit",
        });

        if (response.data.status === "success") {
          this.popupMessage = response.data.message || "Lucro atualizado com sucesso!";
          this.responseStatus = "success";
        } else {
          this.popupMessage = "Falha ao atualizar lucro.";
          this.responseStatus = "error";
        }
      } catch (err) {
        this.popupMessage = "Erro ao conectar ao servidor. Tente novamente mais tarde.";
        this.responseStatus = "error";
      } finally {
        this.showPopup = true;
        this.loading = false;
      }
    },
    closePopup() {
      this.showPopup = false;
    },
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/sign-in");
    },
  },
};
</script>

<style>
h2 {
  padding: 25px 25px 0 25px;
}

select {
  padding: 10px;
  background: transparent;
  width: 100%;
  border: none;
  outline: none;
}

.success-message {
  color: green;
  font-weight: bold;
  margin-bottom: 10px;
}

.error-message {
  color: red;
  font-weight: bold;
  margin-bottom: 10px;
}

.info-user {
  background: rgb(13, 110, 253);
  text-align: center;
  font-weight: bolder;
  margin: 15px;
  padding: 10px;
  color: #fff;
}

.info-user .icon {
  font-size: 40px;
  text-align: center;
}

.info-user h4 {
  font-size: 1.5rem;
}

.info-user p {
  font-size: 1.125rem;
}

.links {
  background: #047bfb;
  border-radius: 10px;
  font-weight: 600;
  text-align: center;
  color: #fff;
  margin: 15px;
  padding: 10px;
  font-size: 1rem;
}

.links a {
  color: #fff;
  text-decoration: none;
}
.links button{
  background: transparent;
  color: #fff;
  text-decoration: none;
  font-size: 15px;
  border: none;
  cursor: pointer;
  width: 100%;
}
</style>

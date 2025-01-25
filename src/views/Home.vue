<template>
  <TopMenu :user="user" />
  <div class="box-card">
    <p><small><strong>Saldo:</strong></small><br><span>{{ balance }}</span> MZN</p>
    <div class="links">
      <a href="/withdrawal">Levantar</a>
    </div>
  </div>
  <div class="content">
    <h2>Acções Disponíveis</h2>
    <div v-if="loading" class="loading">Carregando Acções...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="products.length">
      <Card v-for="product in products" :key="product.id" :product="product" @buy-product="handleBuyProduct" />
    </div>
    <div class="bar"></div>
  </div>
  <Menu />
  <!-- Adiciona o PopUp -->
  <PopUp v-if="showPopup" :show-popup="showPopup" :response-message="popupMessage" :popup-content="popupContent"
    @close-popup="closePopup" />
</template>

<script>
import TopMenu from "../components/TopMenu.vue";
import apiClient from "@/assets/js/https.js";
import Card from "../components/Card.vue";
import Menu from "../components/Menu.vue";
import PopUp from "../components/PopUp.vue";

export default {
  components: {
    TopMenu,
    Card,
    PopUp,
    Menu,
  },
  data() {
    return {
      user: {}, // Dados do usuário autenticado
      products: [], // Lista de produtos
      loading: false, // Estado de carregamento
      error: null, // Mensagem de erro
      showPopup: false, // Controla a exibição do popup
      popupMessage: "", // Mensagem principal do popup
      popupContent: "", // Conteúdo adicional do popup
      balance: 0.0,
    };
  },
  created() {
    const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
    }
    this.fetchProducts();
    this.getBalance();
  },
  methods: {
    // Obtém o saldo do usuário
    async getBalance() {
      const email = this.user.email;
      try {
        const response = await apiClient.post("/myjob/callback.php", {
          action: "balance",
          email: email,
        });

        if (response.data.status === "success") {
          this.balance = parseFloat(response.data.balance).toFixed(2);
        } else {
          this.error = response.data.message || "Erro ao carregar saldo.";
        }
      } catch (err) {
        this.error = err.response?.data?.message || "Erro de conexão. Por favor, tente novamente.";
      }
    },
    // Carrega os produtos
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiClient.post("/myjob/callback.php", {
          action: "get-products",
        });

        if (response.data.status === "success") {
          this.products = response.data.objects.filter(product => product.stock_quantity > 0);
        } else {
          this.error = response.data.message || "Erro ao carregar produtos.";
        }
      } catch (err) {
        this.error = err.response?.data?.message || "Erro de conexão. Por favor, tente novamente.";
      } finally {
        this.loading = false;
      }
    },
    // Lida com a compra de produtos
    async handleBuyProduct(product) {
      try {
        const response = await apiClient.post("/myjob/callback.php", {
          action: "invest",
          product_id: product.id,
          email: this.user.email,
        });

        if (response.data.status === "success") {
          this.popupMessage = "Compra realizada com sucesso!";
          this.popupContent = `Você comprou: ${product.name} por ${product.price} MZN.`;
          this.getBalance(); // Atualiza o saldo após a compra
        } else {
          this.popupMessage = "Falha na compra";
          this.popupContent = response.data.message || "Tente novamente mais tarde.";
        }
      } catch (err) {
        this.popupMessage = "Erro de conexão";
        this.popupContent = "Por favor, verifique sua conexão e tente novamente.";
      } finally {
        this.showPopup = true;
      }
    },
    // Fecha o popup
    closePopup() {
      this.showPopup = false;
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 1.2rem;
}
.loading {
    font-size: 1rem;
    text-align: center;
    color: #047bfb;
    margin: 20px 0;
}

.box-card {
  background: #fff;
  padding: 10px;
  margin: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.box-card p {
  padding: 10px 0;
}

.box-card span {
  font-size: 1.125rem;
  font-weight: 600;
}

.links {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  flex: 1;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.links a {
  text-decoration: none;
  font-size: 12px;
  background: #99cef7;
  color: #047bfb;
  border-radius: 30px;
  padding: 10px 20px;
  transition: all 0.3s ease;
}

.links a:hover {
  background: #047bfb;
  color: #fff;
}

.bar {
  height: 45px;
}

.error {
  color: red;
  font-weight: bold;
  padding: 10px 15px;
  margin: 10px;
}
</style>

<template>
  <TopMenu :user="user" />
  <div class="box-card">
    <p><span>{{ user.wallet_balance }}</span> <br>MZN</p>
    <div class="links">
      <a href="">levantar</a>
    </div>
  </div>
  <div class="content">
    <h2>Produtos Disponíveis</h2>
    <div v-if="loading">Carregando produtos...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="products.length">
      <Card
        v-for="product in products"
        :key="product.id"
        :product="product"
        @buy-product="handleBuyProduct"
      />
    </div>
    <div class="bar"></div>
  </div>
  <Menu />
  <!-- Adiciona o PopUp -->
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
    };
  },
  created() {
    const userData = localStorage.getItem("user");
    if (userData) {
      this.user = JSON.parse(userData);
    }
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await apiClient.post("/myjob/callback.php", {
          action: "get-products",
        });

        if (response.data.status === "success") {
          this.products = response.data.objects;
        } else {
          this.error = response.data.message || "Erro ao carregar produtos.";
        }
      } catch (err) {
        this.error = "Erro de conexão. Por favor, tente novamente.";
      } finally {
        this.loading = false;
      }
    },
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
    closePopup() {
      this.showPopup = false;
    },
  },
};
</script>
  
<style scoped>
h2{
  font-size: 1.2rem;
}
.box-card {
  background: #fff;
  padding: 10px;
  margin: 15px;
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
  /* Faz o .content ocupar o espaço restante do .container */
  width: 100%;
  overflow-y: auto;
  /* Ativa a rolagem vertical */
  overflow-x: hidden;
  /* Desabilita a rolagem horizontal */
}

.links a {
  text-decoration: none;
  font-size: 12px;
  background: #99cef7;
  color: #047bfb;
  border-radius: 30px;
  padding: 10px 20px;
}
.bar{
  height: 45px;
}

.error {
  color: red;
  font-weight: bold;
}</style>
  
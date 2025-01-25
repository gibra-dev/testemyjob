<template>
    <TopMenu :user="user" />
    <div class="content">
        <h2>Ativos Disponíveis</h2>
        <div v-if="loading" class="loading">Carregando investimentos...</div>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="products.length">
            <div v-for="product in products" :key="product.id" class="card">
                <h3 class="title">{{ product.name }}</h3>
                <div class="card-body">
                    <p>Preço: {{ product.price }} MZN</p>
                    <p>Lucro diário: {{ product.profit * product.price }} MZN</p>
                    <p>Lucro mensal: {{ monthlyEarnings(product) }} MZN</p>
                </div>
            </div>
        </div>
        <div v-if="!products.length && !loading" class="no-products">
            Nenhum investimento encontrado.
        </div>
        <div class="bar"></div>
    </div>
    <Menu />
</template>

<script>
import TopMenu from '../components/TopMenu.vue';
import apiClient from "@/assets/js/https.js";
import Menu from "../components/Menu.vue";

export default {
    components: {
        TopMenu,
        Menu,
    },
    data() {
        return {
            user: {}, // Dados do usuário autenticado
            products: [], // Produtos (investimentos) do usuário
            loading: false, // Indica se está carregando os dados
            error: null, // Mensagens de erro
        };
    },
    created() {
        // Carrega os dados do usuário autenticado
        const userData = localStorage.getItem("user");

        if (userData) {
            this.user = JSON.parse(userData);
            this.investments(); // Chama o método para carregar os investimentos
        } else {
            this.$router.push("/sign-in"); // Redireciona para login se o usuário não estiver autenticado
        }
    },
    methods: {
        async investments() {
            const email = this.user.email;
            this.loading = true;
            this.error = null;

            try {
                // Faz a requisição à API
                const response = await apiClient.post("/myjob/callback.php", {
                    action: "get-investments",
                });

                if (response.data.status === "success") {
                    // Filtra apenas os investimentos do usuário com o e-mail correspondente
                    this.products = response.data.objects.filter(obj => obj.email === email);

                    // Caso não encontre nenhum investimento
                    if (this.products.length === 0) {
                        this.error = "Nenhum investimento encontrado.";
                    }
                } else {
                    this.error = response.data.message || "Erro ao carregar produtos.";
                }
            } catch (err) {
                console.error("Erro ao conectar:", err);
                this.error = "Erro de conexão. Por favor, tente novamente.";
            } finally {
                this.loading = false;
            }
        },
        // Função para calcular os ganhos do mês com base no preço e lucro diário
        monthlyEarnings(product) {
            // Calcula os ganhos do mês considerando 30 dias
            return (product.price * product.profit * 30).toFixed(2);
        },
        logout() {
            localStorage.removeItem("user"); // Remove os dados do usuário
            this.$router.push("/sign-in"); // Redireciona para a página de login
        },
    },
};
</script>

<style scoped>
h2 {
    font-size: 1.2rem;
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
.loading {
    font-size: 1rem;
    text-align: center;
    color: #047bfb;
    margin: 20px 0;
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

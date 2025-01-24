<template>
    <TopMenu :user="user" />
    <div class="content">
        <h2>Transacções</h2>
        <div v-if="loading" class="loading">Carregando...</div>
        <div v-else>
            <div v-if="error" class="error">{{ error }}</div>
            <div v-if="withdrawals.length > 0" class="transactions">
                <span>Retirada</span>
                <span>{{ withdrawals[0].status }}</span>
                <span>{{ withdrawals[0].amount }} MZN</span>
            </div>
            <div v-if="transactions.length > 0" class="transactions">
                <span>{{ transactions[0].transaction_type }}</span>
                <span>{{ transactions[0].status }}</span>
                <span>{{ transactions[0].amount }} MZN</span>
            </div>
            <div v-if="withdrawals.length === 0 && transactions.length === 0" class="info">
                Nenhuma transacção disponível no momento.
            </div>
        </div>
        <div class="bar"></div>
    </div>
    <Menu />
</template>

<script>
import TopMenu from "../components/TopMenu.vue";
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
            withdrawals: [], // Lista de retiradas
            transactions: [], // Lista de transacções
            loading: false, // Indica se está carregando os dados
            error: null, // Mensagens de erro
        };
    },
    created() {
        const userData = localStorage.getItem("user");

        if (userData) {
            this.user = JSON.parse(userData);
            this.fetchWithdrawals(); // Carrega as retiradas
            this.fetchTransactions(); // Carrega as transacções
        } else {
            this.$router.push("/sign-in"); // Redireciona para login se não autenticado
        }
    },
    methods: {
        async fetchWithdrawals() {
            this.loading = true;
            this.error = null;

            try {
                const response = await apiClient.post("/myjob/callback.php", {
                    action: "get-withdrawals",
                });

                if (response.data.status === "success") {
                    this.withdrawals = response.data.objects.filter(
                        obj => obj.email === this.user.email && obj.status === "pending"
                    );

                    if (this.withdrawals.length === 0) {
                        this.error = "Nenhuma retirada encontrada.";
                    }
                } else {
                    this.error = response.data.message || "Erro ao carregar retiradas.";
                }
            } catch (err) {
                console.error("Erro ao conectar:", err);
                this.error = "Erro de conexão. Por favor, tente novamente.";
            } finally {
                this.loading = false;
            }
        },
        async fetchTransactions() {
            this.loading = true;
            this.error = null;

            try {
                const response = await apiClient.post("/myjob/callback.php", {
                    action: "get-transactions",
                });

                if (response.data.status === "success") {
                    this.transactions = response.data.objects.filter(
                        obj => obj.email === this.user.email
                    );

                    if (this.transactions.length === 0) {
                        this.error = "Nenhuma transacção encontrada.";
                    }
                } else {
                    this.error = response.data.message || "Erro ao carregar transacções.";
                }
            } catch (err) {
                console.error("Erro ao conectar:", err);
                this.error = "Erro de conexão. Por favor, tente novamente.";
            } finally {
                this.loading = false;
            }
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
.transactions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    font-weight: 500;
    background: #fff;
    padding: 10px;
    margin: 15px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
}
.loading {
    font-size: 1rem;
    text-align: center;
    color: #047bfb;
    margin: 20px 0;
}
.info {
    font-size: 1rem;
    text-align: center;
    color: #555;
    margin: 20px 0;
}
.error {
    color: red;
    font-weight: bold;
    padding: 10px 15px;
    margin: 10px;
    text-align: center;
    border: 1px solid red;
    border-radius: 5px;
    background: #fdd;
}
.bar {
    height: 45px;
    background: #f5f5f5;
}
.content {
    padding: 20px;
    flex: 1;
    overflow-y: auto;
}
</style>

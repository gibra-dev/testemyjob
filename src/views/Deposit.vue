<template>
    <TopMenu :user="user" />
    <div>
        <form @submit.prevent="deposit">
            <h2>Depósito</h2>

            <!-- Mensagem de resposta -->
            <div class="form-input column">
                <div v-if="responseMessage" :class="responseStatus === 'success' ? 'success-message' : 'error-message'">
                    {{ responseMessage }}
                </div>
            </div>

            <div class="form-input">
                <select v-model="method" required :disabled="loading">
                    <option disabled value="">Selecionar Método</option>
                    <option value="m-pesa">M-Pesa</option>
                    <option value="emola">eMola</option>
                </select>
            </div>

            <div class="form-input">
                <label for="" class="icons"><i class="bi bi-currency-dollar"></i></label>
                <input type="number" placeholder="Digite o valor (ex: 100)" v-model="amount" required :disabled="loading" />
            </div>

            <div class="form-input">
                <label for="" class="icons"><i class="bi bi-phone"></i></label>
                <input type="tel" placeholder="Digite o número (ex: 855555555)" v-model="number" required :disabled="loading" />
            </div>

            <div class="form-input column">
                <button type="submit" :disabled="loading">{{ loading ? "Processando..." : "Depósitar" }}</button>
            </div>
        </form>

        <Menu />
    </div>
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
            method: "", // Método de pagamento
            amount: "", // Valor do depósito
            number: "", // Número do telefone
            responseMessage: null, // Mensagem de resposta da API
            responseStatus: null, // Status da resposta (success ou error)
            loading: false, // Estado de carregamento
        };
    },
    created() {
        // Carrega os dados do usuário autenticado
        const userData = localStorage.getItem("user");
        if (userData) {
            this.user = JSON.parse(userData);
        } else {
            this.$router.push("/sign-in"); // Redireciona para login se o usuário não estiver autenticado
        }
    },
    methods: {
        async deposit() {
            if (!this.method || !this.amount || !this.number) {
                this.responseMessage = "Por favor, preencha todos os campos.";
                this.responseStatus = "error";
                return;
            }
            
            this.loading = true;
            this.responseMessage = null;
            this.responseStatus = null;

            try {
                const response = await apiClient.post("/myjob/callback.php", {
                    action: "deposit",
                    method: this.method,
                    email: this.user.email,
                    amount: this.amount,
                    number: this.number,
                });

                if (response.data.status === "success") {
                    this.responseMessage = "Depósito realizado com sucesso!";
                    this.responseStatus = "success";
                    this.method = "";
                    this.amount = "";
                    this.number = "";
                } else {
                    this.responseMessage = response.data.message || "Falha ao realizar o depósito.";
                    this.responseStatus = "error";
                }
            } catch (err) {
                this.responseMessage = "Erro ao conectar ao servidor. Tente novamente mais tarde.";
                this.responseStatus = "error";
            } finally {
                this.loading = false;
            }
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
</style>
  
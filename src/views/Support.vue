<template>
    <TopMenu :user="user" />
    <div class="content">
        <h2>Precisa de Suporte?</h2>
        <div class="support-section text">
            <p>Se você tiver qualquer dúvida ou problema, não hesite em nos contatar. Nossa equipe está pronta para ajudar
                você com qualquer questão relacionada aos seus investimentos.</p>
            <div class="support-buttons">
                <button @click="urlWhatsapp" class="whatsapp-button">Whatsapp</button>
                <button @click="urlTelegram" class="telegram-button">Telegram</button>
            </div>
        </div>
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
        };
    },
    created() {
        // Carrega os dados do usuário autenticado
        const userData = localStorage.getItem("user");
        const email = this.user.email;
        if (userData) {
            this.user = JSON.parse(userData);
        } else {
            this.$router.push("/sign-in"); // Redireciona para login se o usuário não estiver autenticado
        }
    },
    methods: {
        // Função para abrir o WhatsApp
        urlWhatsapp() {
            const phone = "558123456789"; // Número de telefone com código do país (sem + ou espaços)
            const message = encodeURIComponent("Olá, estou entrando em contato!"); // Mensagem personalizada
            const url = `https://wa.me/${phone}?text=${message}`;
            window.open(url, "_blank"); // Abre o link em uma nova aba
        },
        // Função para abrir o Telegram
        urlTelegram() {
            const username = "meuusuario"; // Nome de usuário do Telegram
            const message = encodeURIComponent("Olá! Estou entrando em contato pelo Telegram."); // Mensagem personalizada
            const url = `https://t.me/${username}?text=${message}`;
            console.log("click" + url)
            window.open(url, "_blank"); // Abre o link em uma nova aba
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

.content {
    flex: 1;
    /* Faz o .content ocupar o espaço restante do .container */
    width: 100%;
    overflow-y: auto;
    /* Ativa a rolagem vertical */
    overflow-x: hidden;
    /* Desabilita a rolagem horizontal */
}

.label-title {
    margin: 20px;
}

.text {
    background: #fff;
    padding: 10px;
    margin: 15px;
}

button {
    width: 100%;
    padding: 10px;
    font-size: 15px;
    color: #fff;
    font-weight: 600;
    margin-top: 10px;
    border: none;
}

.whatsapp-button {
    background-color: #25D366;
    /* Cor oficial do WhatsApp */
}

.telegram-button {
    background-color: #0088cc;
    /* Cor oficial do Telegram */
}
</style>
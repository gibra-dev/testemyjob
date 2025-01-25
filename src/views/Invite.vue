<template>
    <TopMenu :user="user" />
    <div class="content">
        <div class="bar-top"></div>
        <label class="label-title">Codigo de Convite</label>
        <div class="form-input">
            <label for="" class="icons"><i class="bi bi-person-fill-add"></i></label>
            <input type="text" placeholder="Digite o código de convite" v-model="code">
        </div>
        <label class="label-title">Link de Convite</label>
        <div class="form-input">
            <label for="" class="icons"><i class="bi bi-person-fill-add"></i></label>
            <input type="text" placeholder="Digite o código de convite" v-model="invite_code">
        </div>
        <div class="text">
            <p>Convide seus amigos para participar e ganhe dinheiro com cada compra de pacotes feita por eles. Você receberá
                uma comissão de 5% sobre o valor de cada compra!</p>
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
        const Url = 'https://nextcap.us';
        if (userData) {
            this.user = JSON.parse(userData);
            this.code = this.user.reference_code;
            this.invite_code =  Url + '/sign-up/' + this.user.reference_code;
        } else {
            this.$router.push("/sign-in"); // Redireciona para login se o usuário não estiver autenticado
        }
    },
    methods: {
        logout() {
            localStorage.removeItem("user"); // Remove os dados do usuário
            this.$router.push("/sign-in"); // Redireciona para a página de login
        },
    },
};
</script>
<style scoped>
.label-title{
    margin: 20px;
}
.text {
    /*background: #fff;*/
    padding: 10px;
    margin: 15px;
}
.bar-top {
    /*background: #fff;*/
    padding: 10px;
}
</style>
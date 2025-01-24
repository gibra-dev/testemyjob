<template>
  <div>
    <div class="logo">
      <img src="@/assets/logotipo.png" alt="logotipo"
        style="display: block; width: 150px; height: 150px; margin-right: auto; margin: auto;">
    </div>
    <form @submit.prevent="signUp">
      <h2>Criar conta</h2>
      <div class="form-input column">
        <!-- Mensagem de resposta -->
        <div v-if="responseMessage" :class="responseStatus === 'success' ? 'success-message' : 'error-message'">
          {{ responseMessage }}
        </div>
      </div>
      <div class="form-input">
        <label for="" class="icons"><i class="bi bi-person"></i></label>
        <input type="text" placeholder="Digite o seu Nome" v-model="name" required>
      </div>
      <div class="form-input">
        <label for="" class="icons"><i class="bi bi-envelope"></i></label>
        <input type="email" placeholder="Digite o seu Email" v-model="email" required>
      </div>
      <div class="form-input">
        <label for="" class="icons"><i class="bi bi-person-fill-add"></i></label>
        <input type="text" placeholder="Digite o código de convite" v-model="invite_code">
      </div>
      <div class="form-input">
        <label for="" class="icons"><i class="bi bi-lock"></i></label>
        <input type="password" placeholder="Digite a sua Senha" v-model="password" required>
      </div>
      <div class="form-input column">
        <button type="submit">Entrar</button>
        <span class="links">
          <a href="/sign-in">Já tem uma conta? Entrar</a>
        </span>
      </div>
    </form>
  </div>
</template>
  
<script>
import apiClient from '@/assets/js/https.js'; // Importando o cliente configurado

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      invite_code: '',
      responseMessage: null,
      responseStatus: null,
    };
  },
  created() {
    if (this.$route.params.invite_code) {
      this.invite_code = this.$route.params.invite_code;
    }
  },
  methods: {
    async signUp() {
      this.responseMessage = null;

      try {
        const response = await apiClient.post('/myjob/callback.php', {
          action: 'sign-up',
          name: this.name,
          email: this.email,
          password: this.password,
          invite_code: this.invite_code,
        });

        if (response.data.status === "success") {
          this.responseStatus = "success";
          this.responseMessage = "Cadastro realizado com sucesso!";
        } else if (response.data.status === "error") {
          this.responseStatus = "error";
          this.responseMessage = this.translateMessage(response.data.message);
        }
      } catch (error) {
        this.responseStatus = "error";
        this.responseMessage = "Ocorreu um erro inesperado. Tente novamente.";
        console.error(error);
      }
    },
    translateMessage(message) {
      // Traduções básicas
      const translations = {
        "Name is required.": "O nome é obrigatório.",
        "Email is required.": "O email é obrigatório.",
        "Password is required.": "A senha é obrigatória.",
        "Invite code is invalid.": "O código de convite é inválido.",
      };

      // Tratamento especial para mensagens dinâmicas
      if (message.includes("The Email") && message.includes("already exists")) {
        const email = message.match(/The Email (.+) already exists/)[1];
        return `O email ${email} já está cadastrado.`;
      }

      return translations[message] || message;
    },
  },
};

</script>
  
<style scoped>
h2 {
  padding: 0 25px;
}

a {
  color:  #047bfb;
  text-decoration: none;
}

a:hover {
  color: #8c0030;
}

/* Estilização opcional para mensagens */
.success-message {
  padding: 10px;
  font-size: 12px;
  background: #198754;
  color: #fff;
  margin-top: 1rem;
}

.error-message {
  padding: 10px;
  background: #dc3545;
  color: #fff;
  margin-top: 1rem;
}
</style>
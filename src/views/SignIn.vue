<template>
  <div>
    <div class="logo">
      <img src="@/assets/logotipo.png" alt="logotipo"
        style="display: block; width: 150px; height: 150px; margin-right: auto; margin: auto;">
    </div>
    <form @submit.prevent="signIn">
      <h2>Login</h2>
      <div class="form-input column">
        <div v-if="error" class="error">{{ error }}</div>
      </div>
      <div class="form-input">
        <label for="" class="icons"><i class="bi bi-envelope"></i></label>
        <input type="email" placeholder="Digite o seu Email" v-model="email" required>
      </div>
      <div class="form-input">
        <label for="" class="icons"><i class="bi bi-lock"></i></label>
        <input type="password" placeholder="Digite a sua Senha" v-model="password" required>
      </div>
      <div class="form-input column">
        <button type="submit">Entrar</button>
        <span class="links"><a href="/sign-up">Ainda não tem conta? Criar conta</a></span>
      </div>
    </form>
  </div>
</template>
  
<script>
import apiClient from '@/assets/js/https.js'; // Importando o cliente configurado

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async signIn() {
      this.error = null; // Limpa mensagens de erro anteriores
      try {
        // Envia os dados para o backend
        const response = await apiClient.post('/myjob/callback.php', {
          action: 'sign-in',
          email: this.email,
          password: this.password,
        });

        if (response.data.status === 'success') {
          // Armazena o objeto no localStorage
          localStorage.setItem('user', JSON.stringify(response.data.object));
          //alert('Login realizado com sucesso!');
          // Redireciona para a página protegida
          this.$router.push('/');
        } else {
          this.error = response.data.message;
        }
      } catch (err) {
        this.error = 'Erro ao realizar login. Tente novamente.';
      }
    },
  },
};
</script>
  
<style scoped>
h2 {
  padding: 0 25px;
}

a {
  color: #047bfb;
  text-decoration: none;
}

a:hover {
  color: #8c0030;
}

.error {
  color: red;
  font-weight: bold;
}</style>
  
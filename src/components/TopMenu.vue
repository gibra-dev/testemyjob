<template>
    <div class="header">
        <div class="logo">
        </div>
        <div class="info">
            <p>Olá, {{ user.name }}</p>
            <p><small>{{ user.email }}</small></p>
        </div>
        <button @click="logout"><i class="bi bi-box-arrow-in-right"></i></button>
    </div>
</template>
<script>
    export default {
    name: 'TopMenu',
    props: {
        user: {
        type: Object,
        required: true, // Garante que o objeto seja obrigatório
        },
    },
    methods: {
        logout() {
        localStorage.removeItem('user');
        this.$router.push('/sign-in');
        },
    },
    };
</script>
<style scoped>
    .header{
    display: flex;
    align-items: center;
    gap: 14px;
    font-weight: 600;
    font-size: 1rem;
    background: #fff;
    padding: 10px;
  }
  .logo{
    background: #ccc;
    border-radius: 50%;
    height: 48px;
    width: 48px;
  }
  .header .info{
    flex: 1;
  }
  small{
    font-weight: 400;
    font-size: 14px;
    padding: -5px;
    background: #fff;
  }
  .header button{
    font-size: 30px;
    border: none;
    outline: none;
    background: transparent;
  }
</style>
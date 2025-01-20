<template>
  <div class="card">
    <h3 class="title">{{ product.name }}</h3>
    <div class="card-body">
      <p>Preço: {{ product.price }} MZN</p>
      <p>Rendimento de {{ product.profit * 100 }}% diários</p>
      <p>Ganhos do mês: {{ monthlyEarnings }} MZN</p>
      <!-- Adiciona o evento @click -->
      <button @click="buyNow">Comprar agora</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    monthlyEarnings() {
      // Calcula os ganhos do mês com base no preço e lucro diário
      return (this.product.price * this.product.profit * 30).toFixed(2);
    },
  },
  methods: {
    buyNow() {
      // Emite o evento com os dados do produto
      this.$emit("buy-product", this.product);
    },
  },
};
</script>

<style>
.card {
  background: #fff;
  margin: 15px;
}

h3 {
  padding: 10px;
  text-align: center;
  background: #6cc4fc;
  color: #fff;
}

.card-body {
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}

.card-body p {
  padding-bottom: 8px;
}
.card-body button{
  background: #047bfb;
  color: #fff;
  border: none;
  font-size: 12px;
  font-weight: 600;
  border-radius: 15px;
  padding: 10px 15px;
}
</style>
  
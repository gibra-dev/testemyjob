<template>
  <div class="card">
    <img :src="product.image_url" :alt="product.name">
    <div class="card-body">
      <h3>{{ product.name }}</h3>
      <button @click="showDetails" style="background: #e72313; margin-bottom: 12px;">Ver Mais</button>
      <br>
      <button @click="buyNow">Comprar Agora</button>
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
  methods: {
    buyNow() {
      this.$emit("buy-product", this.product);
    },
    showDetails() {
      this.$emit("show-details", this.product);
    }
  },
};
</script>


<style>
.card {
  width: 100%;
  background: #fff;
  margin: 15px;
}
.card img{
  max-width: 88%;
  margin: 15px;
  margin-bottom: 0;
}

/*h3 {
  padding: 10px;
  text-align: center;
  background: #6cc4fc;
  color: #fff;
}*/
.card-body h3{
  padding: 5px;
  text-align: center;
  font-size: 1.2rem;
  color: #000;
}
.card-body {
  padding: 10px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding-top: 0;
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
  
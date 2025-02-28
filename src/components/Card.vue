<template>
  <div class="box-cards">
    <div class="card">
      <div class="rows">
        <div class="img-card">
          <img :src="product.image_url" :alt="product.name">
        </div>
        <div class="card-body">
          <h3>{{ product.name }}</h3>
          <p><strong>Preço:</strong> {{ product.price }}</p>
          <p><strong>Diário:</strong> {{ (product.price * product.profit).toFixed(2) }} MZN</p>
          <p><strong>Renda total:</strong> {{ (product.price * product.profit * 30).toFixed(2) }} MZN</p>
          <p><strong>Ciclos:</strong> 30 dias</p>
        </div>
      </div>
      <div class="btns">
        <div class="rows" style="padding: 15px 0px 20px;"><button @click="showDetails" style="background: rgb(231, 35, 19);">Ver
            Mais</button><button @click="buyNow">Comprar Agora</button></div>
      </div>
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
.box-cards .card{
  padding: 20px 10px;
  background: #fff;
  margin: 15px;
  border: 1px solid #99cef7;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  font-weight: 500;
 
}
.box-cards .card h3{
  font-size: 1.2rem;
  padding-bottom: .75rem;
}
.box-cards .card p{
  padding-bottom: 5px;
}
.box-cards .rows{
  display: flex;
  gap: 12px;
}
.box-cards .img-card img {
  max-width: 9rem !important;
}
.btns .rows{
  display: flex;
  justify-content: space-around;
}
.btns .rows button{
  width: 120px;
  background: #047bfb;
  color: #fff;
  border: none;
  font-size: 12px;
  font-weight: 600;
  border-radius: 15px;
  padding: 10px 15px;
}
.btns .rows button:hover{
  background: #346cac;
}
</style>
  
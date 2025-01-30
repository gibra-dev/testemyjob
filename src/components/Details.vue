<template>
    <div class="overlay" v-if="product" @click="closePopup">
        <div class="popup" @click.stop>
            <div class="details">
                <div class="text">
                    <h3>{{ product.name}} </h3>
                    <div class="description">
                        {{ product.description}} 
                    </div>
                    <div class="info">
                        <div class="row">
                            <span class="info-span">
                                <span>dia</span>
                                <span> 1</span>
                            </span>
                            <span class="info-span">
                                <span>ciclos</span>
                                <span> 30 dias</span>
                            </span>
                        </div>
                        <div class="row">
                            <span class="info-span">
                                <span>Lucro</span>
                                <span> {{ (product.price * product.profit).toFixed(2) }} MZN</span>
                            </span>
                            <span class="info-span">
                                <span>Lucros</span>
                                <span> {{ (product.price * product.profit * 30).toFixed(2) }} MZN</span>
                            </span>
                        </div>
                    </div>
                    <div class="progress">
                        <div class="stutas" :style="{ width: progress + '%' }"></div>
                    </div>
                </div>
            
            <!--h2>{{ product.name }}</h2>
            <img :src="product.image_url" :alt="product.name" style="max-width: 100%;">
            <p><strong>Preço:</strong> {{ product.price }} MZN</p>
            <p><strong>Lucro diário:</strong> {{ (product.price * product.profit).toFixed(2) }} MZN</p>
            <p><strong>Lucro mensal:</strong> {{ (product.price * product.profit * 30).toFixed(2) }} MZN</p-->
            <div class="btns">
                <button @click="closePopup" style="background: rgb(231, 35, 19);">Fechar</button>
                <button @click="buyNow">Comprar Agora</button>
            </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        product: {
            type: Object,
            required: false, // Permite ser null para fechar o modal
        },
    },
    data() {
        return {
            stock: 1000, // Estoque total
            progress: 0, // Porcentagem de progresso
        };
    },
    methods: {
        closePopup() {
            this.$emit("close-popup"); // Emitir evento para fechar
        },
        buyNow() {
            this.$emit("buy-product", this.product); // Emitir evento de compra
            this.$emit("close-popup"); // Emitir evento para fechar o modal após a compra
        },
        setProgress() {
            const stock_current = this.product.stock_quantity; // Estoque atual do produto
            this.progress = (stock_current / this.stock) * 100; // Calcula a porcentagem de progresso
        }
    },
    watch: {
        product: "setProgress", // Atualiza a barra de progresso quando o produto for alterado
    },
    mounted() {
        this.setProgress(); // Inicializa a barra de progresso assim que o componente for montado
    }
};
</script>
<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup {
    /*background: #fff;*/
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    padding: 20px;
    text-align: center;
    max-width: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 10px;
}
.details{
    color: #fff !important;
    font-weight: 600 !important;
    text-align: justify !important;
}
.details h3{
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.details button{
  width: 120px;
  background: #047bfb;
  color: #fff;
  border: none;
  font-size: 12px;
  font-weight: 600;
  border-radius: 15px;
  padding: 10px 15px;
}
.details .btns{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 1rem;
}
.info {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.row{
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
}
.progress{
    margin-top: .75rem;
    width: 100%;
    background: rgb(231, 35, 19);
    height: 10px;
    border-radius: 20px;
}
.stutas{
    height: 100%;
    background: #32ab1f;
}
.info-span{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
  
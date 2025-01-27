<template>
    <div class="overlay" v-if="showPopup" @click="closePopup">
      <div class="popup" @click.stop>
        <!--p>{{ responseMessage }}</p-->
        <p>{{ popupContent }}</p>
        <button @click="closePopup">Fechar</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showPopup: {
        type: Boolean,
        required: true,
      },
      responseMessage: {
        type: String,
        default: "Mensagem",
      },
      popupContent: {
        type: String,
        default: "Este é um popup centralizado.",
      },
    },
    methods: {
      closePopup() {
        this.$emit("close-popup");
      },
    },
  };
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.0);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .popup {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 300px;
    text-align: center;
  }
  .popup button{
    background: #047bfb;
    padding: 10px 15px;
    font-size: 12px;
    font-weight: 600;
    border: none;
    border-radius: 15px;
    color: #fff;
  }
  .popup p {
    font-weight: 600;
    font-size: 1.125rem;
    margin-bottom: 15px;
  }
  </style>
  
<template>
    <div class="header-footer">
        <ul>
            <li><a href="/"><i class="bi bi-house-fill"></i></a></li>
            <li><a href="/deposit"><i class="bi bi-cash-stack text-success fs-3"></i></a></li>
            <li></li>
            <li><a href=""><i class="bi bi-headset"></i></a></li>
            <li><a href="/{{ user.name }}"><i class="bi bi-share"></i></a></li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Menu',
    props: {

    },
};
</script>
<style scoped>
.header-footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    background: red;
    padding: 10px;
}
ul {
    display: flex;
    justify-content: space-around;
}
ul li{
    list-style: none;
}
a{
    color: #fff;
    font-size: 1.5rem;
}

</style>
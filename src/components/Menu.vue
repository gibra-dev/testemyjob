<template>
    <div class="header-footer">
        <ul>
            <li><a href="/"><i class="bi bi-house-fill"></i></a></li>
            <li><a href="/deposit"><i class="bi bi-cash-stack text-success fs-3"></i></a></li>
            <li><a href="/investments"><i class="bi bi-piggy-bank"></i></a></li>
            <li><a href="/transactions"><i class="bi bi-arrow-left-right"></i></a></li>
            <li><a href="/support"><i class="bi bi-headset"></i></a></li>
            <li><a href="/invite"><i class="bi bi-people"></i></a></li>
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
    background: #346cac;
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
    font-weight: 600;
    font-size: 1.5rem;
}

</style>
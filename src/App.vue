<template>
    <keep-alive>
        <router-view class="router"/>
    </keep-alive>
</template>

<script>


export default {
    name: 'app',
    components: {
    },
    data() {
        return {
            name: "App Top Level",
        }
    },
 };

</script>

<style>

</style>

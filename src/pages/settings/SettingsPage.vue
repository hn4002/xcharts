<template>
    <!-- One single root element. Wrap everything inside this root element. -->
    <div class="page">
        <Header></Header>
        <h1>Settings Page</h1>
        <SettingsPanel></SettingsPanel>
    </div>
</template>

<script>
    import Header from '../mainchart/components/Header.vue'
    import SettingsPanel from "../mainchart/components/SettingsPanel.vue";

    export default {
        name: 'SettingsPage',
        props: [],
        components: {
            Header,
            SettingsPanel
        },
    }
</script>


<style scoped>
    .page {
        color: #777777;
        background-color: white;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
        margin-bottom: 20px;
        color: #555555;
        width:750px;
        align:center;
        margin-left: auto;
        margin-right: auto;;
    }


</style>

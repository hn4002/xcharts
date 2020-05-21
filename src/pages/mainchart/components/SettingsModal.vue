<template>
    <b-modal
            id="modal-settings"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
            scrollable
            title="Settings"
            size="lg"
    >
        <SettingsPanel></SettingsPanel>
    </b-modal>
</template>

<script>
    import SettingsPanel from "./SettingsPanel.vue";

    export default {
        name: "SettingsModal",

        components: {SettingsPanel},

        methods: {
            resetModal() {
                this.$xEventBus.$emit('settingsPanel.reset')
            },

            handleOk(bvModalEvt) {
                this.$xEventBus.$emit('settingsPanel.save')
            },
        }
    }
</script>

<style scoped>

</style>

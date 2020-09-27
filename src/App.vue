<template>
    <div id="app" class="py-5 mx-10">
        <input-source-controls :controller="controller" v-model="inputSource" />
        <volume-controls ref="volume" :controller="controller" />
        <playback-controls :controller="controller" :inputSource="inputSource" />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { InputSource } from "./enums";
import VolumeControls from "./components/VolumeControls.vue";
import PlaybackControls from "./components/PlaybackControls.vue";
import InputSourceControls from "./components/InputSourceControls.vue";
import KefController from "./utils/kefControl";

export default Vue.extend({
    components: {
        VolumeControls,
        PlaybackControls,
        InputSourceControls
    },
    data() {
        return {
            controller: {} as KefController,
            inputSource: InputSource.Off as InputSource
        };
    },
    async  beforeDestroy() {
        await this.controller.closeConnection();
    },
    async mounted() {
        document.body.setAttribute("vs-theme", "dark");
        setTimeout(async () => {
            this.controller = new KefController();
            this.inputSource = await this.controller.getSource();
            (this.$refs.volume as HTMLFormElement).getVolume();
        }, 200);
    },
    methods: {
        async setMode() {
            await this.controller.setSource(this.inputSource);
        },
        async turnOff() {
            await this.controller.turnOff();
            this.inputSource = InputSource.Off;
        }
    }
});
</script>
<template>
    <div id="app" class="py-5 mx-10">
        <div v-show="!showSettings">
            <input-source-controls
                :controller="controller"
                v-model="inputSource"
                @show-settings="showSettings = true"
            />
            <volume-controls ref="volume" :controller="controller" />
            <playback-controls :controller="controller" :inputSource="inputSource" />
        </div>
        <div v-show="showSettings">
            <navigation-row @hide-settings="showSettings = false" />
            <sub-low-pass-controls ref="lowPass" :controller="controller"  />
            <sub-controls ref="sub" :controller="controller"  />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { InputSource } from "./enums";
import VolumeControls from "./components/VolumeControls.vue";
import SubControls from "./components/DSP/SubControls.vue";
import NavigationRow from "./components/DSP/NavigationRow.vue";
import PlaybackControls from "./components/PlaybackControls.vue";
import InputSourceControls from "./components/InputSourceControls.vue";
import SubLowPassControls from "@/components/DSP/SubLowPassControls.vue";
import KefController from "./utils/kefControl";

export default Vue.extend({
    components: {
        VolumeControls,
        SubControls,
        PlaybackControls,
        InputSourceControls,
        NavigationRow,
        SubLowPassControls
    },
    watch: {
        showSettings: function() {
            this.fetchSpeakerData();
        }
    },
    data() {
        return {
            controller: {} as KefController,
            inputSource: InputSource.Off as InputSource,
            showSettings: false as boolean
        };
    },
    async  beforeDestroy() {
        await this.controller.closeConnection();
    },
    async mounted() {
        document.body.setAttribute("vs-theme", "dark");
        setTimeout(async () => {
            this.controller = new KefController();
            this.fetchSpeakerData();
        }, 200);
    },
    methods: {
        async setMode() {
            await this.controller.setSource(this.inputSource);
        },
        async turnOff() {
            await this.controller.turnOff();
            this.inputSource = InputSource.Off;
        },
        async fetchSpeakerData() {
            this.inputSource = await this.controller.getSource();
            await (this.$refs.sub as HTMLFormElement).getSubDb();
            await (this.$refs.lowPass as HTMLFormElement).getSubHz();
            (this.$refs.volume as HTMLFormElement).getVolume();
        }
    }
});
</script>
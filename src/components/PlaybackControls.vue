<template>
    <div v-if="showPlaybackControls" class="mt-8">
        <h3 class="text-white text-xl text-center font-semibold">Playback</h3>
        <div class="mt-3 flex justify-center">

            <vs-button
                icon
                border
                @click="previousTrack"
                class="mx-1"
            >
                <i class='bx bx-skip-previous bx-sm' />
            </vs-button>

            <vs-button
                icon
                success
                border
                @click="playPause"
                class="mx-5 text-lg flex"
            >
                <i class='bx bx-play bx-sm' />
                /
                <i class='bx bx-pause bx-sm' />
            </vs-button>

            <vs-button
                icon
                border
                @click="previousTrack"
                class="mx-1"
            >
                <i class='bx bx-skip-next bx-sm' />
            </vs-button>
        </div>
    </div>
</template>

<script lang="ts">
import { InputSource } from "@/enums";
import Vue from "vue";
import KefController from "../utils/kefControl";

export default Vue.extend({
    props: {
        controller: {
            required: true,
            type: Object as () => KefController || null
        },
        inputSource: {
            required: true,
            type: String as () => InputSource
        }
    },
    data() {
        return { volume: 50 as number };
    },
    computed: {
        showPlaybackControls(): boolean {
            if (this.inputSource === InputSource.Bluetooth ||
                this.inputSource === InputSource.WiFi)
                return true;

            return false;
        }
    },
    methods: {
        nextTrack() {
            this.controller.nextTrack();
        },
        previousTrack() {
            this.controller.previousTrack();
        },
        playPause() {
            this.controller.playPause();
        }
    }
});
</script>
<template>
    <div>
        <div class="row">
            <p style="font-size: 24px" class="col-3">{{ item.word }}</p>
            <p style="font-size: 24px" class="col-3" v-bind:class="{ 'invisible': !next }">{{ item.translation }}</p>
        </div>
        <div class="row" v-bind:class="{ 'invisible': next }">
            <button class="btn btn-success col-2" @click="remember">Remember</button>
            <button class="btn btn-danger col-2" @click="doNotRemember">Do not remember</button>
        </div>
        <div class="row" v-bind:class="{ 'invisible': !next }">
            <button class="btn btn-primary col-2" @click="nextWord">Next</button>
        </div>
    </div>
</template>

<script>
import RequestService from '../RequestService';

export default {
    props: ['item'],
    data() {
        return {
            next: false
        }
    },
    methods: {
        nextWord() {
            this.next = false;
            this.$emit('set-points', false);
        },
        remember() {
            this.$emit('set-points', true);
        },
        doNotRemember() {
            this.next = true;
        }
    }
}
</script>
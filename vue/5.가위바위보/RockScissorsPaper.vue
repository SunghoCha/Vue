<template>
    <div>
        <div id="computer" v-bind:style="{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) 0 0` }"></div>
        <div>
            <button v-on:click="onClickButton('바위')">바위</button>
            <button v-on:click="onClickButton('가위')">가위</button>
            <button v-on:click="onClickButton('보')">보</button>
        </div>
        <div>{{result}}</div>
        <div>현재 {{score}}점</div>
    </div>
</template>
<script>
    export default {
        data() {
            return{
                result: '',
                score: 0,
            };
        },
        computed: {
            
        },
        methods: {
            onClickButton(choice) {

            }
        },
    };
</script>
<style lang="">
    
</style>
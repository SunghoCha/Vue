<template lang="">
    <div>
        <div id="computer" v-bind:style="{ backgroundImage: '', fontSize: '14px'}" ></div>
        <div>
            <button>가위</button>
            <button>바위</button>
            <button>보</button>
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
            
        },
    };
</script>
<style lang="">
    
</style>
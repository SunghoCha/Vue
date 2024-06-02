<template>
    <div>
        <div id="screen" v-bind:class="state" @click="onClickScreen">{{message}}</div> <!-- v-bind:class == :class 같은 표현(축약가능)-->
        <div v-show="result.length"> <!-- result.length가 true인 경우에만 보여줌 (result가 없으면 false 반환하는듯?) false일때 v-show는 display:none이고 v-if는 태그 자체가 존재하지 않음-->
            <div>평균 시간: {{average}}ms</div>
            <button @click="onReset">리셋</button>
            <ul>
                <li v-for="item in result" :key="item"> {{ item }}ms</li>
            </ul>
        </div>    
    </div>
</template>

<script scoped>
    let startTime = 0; // 화면과 관련 없는 로직관련 data 이므로 변수로 처리함
    let endTime = 0;
    let timeout = null;
    export default {
        data() {
            return {
                result: [],
                state: 'waiting',
                message: '클릭해서 시작하세요.',
            }
        },
        computed: { // 사용 이유 : 캐싱 (다른 정보의 변경으로 화면을 다시 렌더링할 때 캐싱이용)
            average() {
                return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0 ;
            }
        },
        methods: { // 대략적으로 말하면 화면에 보여지면 data, 로직계산식같은 (화면과 관련없는 것들은) 변수           
            onReset() {
                this.result = [];
            },
            onClickScreen() {
                if (this.state === 'waiting') {
                    this.state = 'ready';
                    this.message = '초록색이 되면 클릭하세요';
                    timeout = setTimeout(() => { // timeout에는 타이머ID가 반환됨
                        this.state = 'now';
                        this.message = '지금 클릭!'; 
                        startTime = new Date();
                    }, Math.floor(Math.random() * 1000) + 2000);
                } else if (this.state === 'ready') {
                    clearTimeout(timeout) // 명시적으로 취소해서 메모리낭비 방지
                    this.state = 'waiting';
                    this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요'
                } else if (this.state === 'now') {
                    endTime = new Date();
                    this.state = 'waiting';
                    this.message = '클릭해서 시작하세요.'
                    this.result.push(endTime - startTime);
                }
            }
        },
    };
</script>

<style>
    #screen {
        width: 300px;
        height: 200px;
        text-align: center;
        user-select: none;
    }
    #screen.waiting {
        background-color: aqua;
    }
    #screen.ready {
        background-color: red;
        color: white;
    }
    #screen.now {
        background-color: greenyellow;
    }
</style>
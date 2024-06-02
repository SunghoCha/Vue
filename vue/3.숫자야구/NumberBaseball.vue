<template>
    <div>
        <h1>{{result}}</h1>
        <h1>{{answer}}</h1>
        <form @submit.prevent="onSubmitForm"> <!-- v-on -> @로 대체 가능, e.preventDefault() 를 submit.prevent로 미리 처리 가능 -> @submit.prevent -->
            <input ref="answer" minlength="4" maxlength="4" v-model="value" />
            <button>입력</button>
        </form>
        <div>시도: {{tries.length}}</div>
        <ul>
            <li v-for="(t, index) in tries" :key="index">{{ t }}</li>
        </ul>
    </div>
</template>

<script>
    const getNumbers = () => {
        const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const array = [];
        for (let i = 0; i < 4; i += 1) {
            const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
            array.push(chosen);
        }
        return array;
    }
    export default {
        data() {
            return {
                answer: getNumbers(), // ex) [1,5,3,4]
                tries: [], // 시도 횟수
                value: '', // 입력값
                result: '', // 결과
            }
        },
        methods: { // 대략적으로 말하면 화면에 보여지면 data, 로직계산식같은 (화면과 관련없는 것들은) 변수
            onSubmitForm() {
                if (this.value === this.answer.join('')){ // 문자와 배열 비교 (정답 맞춘 경우)
                    this.tries.push({
                        try: this.value,
                        result: '홈런',
                    });
                    this.result = '홈런';
                    alert('게임을 다시 실행합니다.');
                    this.value = '';
                    this.tries = [];
                    this.$refs.answer.focus();
                    this.answer = getNumbers();
                } else { // 정답 아닌 경우
                    if (this.tries.length >= 5) {
                        alert("패배");
                        this.result = '';
                        this.value = '';
                        this.tries = [];
                        this.$refs.answer.focus();
                        this.answer = getNumbers();
                    }
                    let strike = 0;
                    let ball = 0;
                    const answerArray = this.value.split('').map(v => parseInt(v));
                    for (let i = 0; i < 4; i += 1) {
                        if (answerArray[i] === this.answer[i]) { // 숫자 자릿수 모드 정답                           
                            strike++;
                        } else if (this.answer.includes(answerArray[i])) { // 숫자만 정답
                            ball++;
                        }
                    }
                    this.tries.push({
                        try: this.value,
                        result: ` ${strike} 스트라이크, ${ball} 볼입니다.`,
                    });
                    this.value = '';
                    this.$refs.answer.focus();
                }

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
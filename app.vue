<template lang="pug">
div(v-if="!calculating")
  input(v-model="inputNum")
  button(@click="calOnMain") OnMainThread
  button(@click="calOnBack") OnBackThread
  input(v-model.number="threadCount", step=1, min=1, type="number")
  button(@click="calOnMulti") On{{ threadCount }}Thread(s)
div
  template(v-if="calculating") Calculating...
  template(v-if="time != -1 && !calculating") Finished in {{ time }}ms
  br
  template(v-for="prime of result", v-if="result")
    | {{ prime }}
    br
</template>

<script setup lang="ts">
// const num = 5563856211534459216117433553791n;
const inputNum = ref("9432432825914754291070088546454407");
const calculating = ref(false);
const time = ref(-1);
const result = ref<bigint[]>();

const calOnMain = () => {
  calculating.value = true;
  const num = BigInt(inputNum.value);
  const startTime = Date.now();
  const calResult = factorizeOnMainThread(num);
  const endTime = Date.now();
  time.value = endTime - startTime;
  result.value = calResult;
  calculating.value = false;
};

const calOnBack = () => {
  calculating.value = true;
  const num = BigInt(inputNum.value);
  const startTime = Date.now();
  const calResult: bigint[] = reactive([]);
  result.value = calResult;
  factorizeOnBackThread(num, (val) => {
    if (val === false) {
      const endTime = Date.now();
      time.value = endTime - startTime;
      calculating.value = false;
    } else {
      calResult.push(val);
    }
  });
};

const threadCount = ref(2);
const calOnMulti = () => {
  calculating.value = true;
  const num = BigInt(inputNum.value);
  const startTime = Date.now();
  const calResult: bigint[] = reactive([]);
  result.value = calResult;
  factorizeOnMultiThread(num, threadCount.value, (val) => {
    if (val === false) {
      const endTime = Date.now();
      time.value = endTime - startTime;
      calculating.value = false;
    } else {
      calResult.push(val);
    }
  });
};
</script>

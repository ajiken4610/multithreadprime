<template lang="pug">
div
  NuxtWelcome
</template>

<script setup lang="ts">
// const num = 5563856211534459216117433553791n;
const num = 987654321n;
const startTime = Date.now();
const result = factorizeOnMainThread(num);
const endTime = Date.now();
console.log(endTime - startTime);
console.log(
  result,
  result.reduce((mul, current) => mul * current, 1n)
);
</script>

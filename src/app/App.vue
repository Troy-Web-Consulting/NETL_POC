<script setup lang="ts">
import NxWelcome from './NxWelcome.vue';
defineProps<{
  title: string;
}>();
</script>

<template>
  <router-view></router-view>
  <!-- <NxWelcome title="myworkspace" /> -->
</template>

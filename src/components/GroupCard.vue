<template>
  <div
    class="group-card"
    @click="navigateToGroup"
    role="link"
    tabindex="0"
    @keydown.enter="navigateToGroup"
  >
    <h2 class="group-label">Patch Group {{ groupNumber }}</h2>
    <p class="group-theme">{{ theme }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps<{
  groupNumber: number;
  theme: string;
}>();

const router = useRouter();

function navigateToGroup() {
  router.push(`/group/${props.groupNumber}`);
}
</script>

<style scoped>
.group-card {
  padding: 1.25rem 1.5rem;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
  border: 1px solid #e8e8e8;
}

.group-card:hover,
.group-card:focus-visible {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  border-color: #c0c0c0;
  outline: none;
}

.group-label {
  margin: 0 0 0.35rem;
  font-size: 1.15rem;
  font-weight: 600;
  color: #1a1a1a;
}

.group-theme {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}
</style>

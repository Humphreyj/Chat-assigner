<template>
  <div v-if="isActive" class="shuffle-animation">
    <div class="shuffle-animation__grid">
      <div
        v-for="(name, i) in displayedNames"
        :key="i"
        class="shuffle-animation__slot"
      >
        <span class="shuffle-animation__name">{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import type { Member } from "@/types";

const SLOT_COUNT = 6;
const TOTAL_DURATION = 1800;
const MIN_INTERVAL = 50;
const MAX_INTERVAL = 200;
const STEP_INCREASE = 15;

const props = defineProps<{
  members: Member[];
  isActive: boolean;
}>();

const emit = defineEmits<{
  complete: [];
}>();

const displayedNames = ref<string[]>([]);

let timerId: ReturnType<typeof setTimeout> | null = null;
let startTime = 0;

function pickRandomNames(): string[] {
  const names: string[] = [];
  for (let i = 0; i < SLOT_COUNT; i++) {
    const idx = Math.floor(Math.random() * props.members.length);
    names.push(props.members[idx].fullName);
  }
  return names;
}

function tick(currentInterval: number) {
  const elapsed = Date.now() - startTime;

  if (elapsed >= TOTAL_DURATION) {
    stopAnimation();
    emit("complete");
    return;
  }

  displayedNames.value = pickRandomNames();

  const nextInterval = Math.min(currentInterval + STEP_INCREASE, MAX_INTERVAL);

  timerId = setTimeout(() => tick(nextInterval), currentInterval);
}

function startAnimation() {
  if (props.members.length === 0) {
    emit("complete");
    return;
  }

  startTime = Date.now();
  displayedNames.value = pickRandomNames();
  timerId = setTimeout(() => tick(MIN_INTERVAL), MIN_INTERVAL);
}

function stopAnimation() {
  if (timerId !== null) {
    clearTimeout(timerId);
    timerId = null;
  }
}

watch(
  () => props.isActive,
  (active) => {
    if (active) {
      startAnimation();
    } else {
      stopAnimation();
      displayedNames.value = [];
    }
  },
);

onBeforeUnmount(() => {
  stopAnimation();
});
</script>

<style scoped>
.shuffle-animation {
  margin: 1.5rem 0;
}

.shuffle-animation__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.shuffle-animation__slot {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #ede9fe, #ddd6fe);
  border-radius: 10px;
  min-height: 48px;
  overflow: hidden;
}

.shuffle-animation__name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #4c1d95;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  animation: fadeSwap 0.1s ease-in-out;
}

@keyframes fadeSwap {
  0% {
    opacity: 0.4;
    transform: translateY(-4px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .shuffle-animation__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

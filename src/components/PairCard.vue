<template>
  <div class="pair-card" :class="{ 'pair-card--trio': isTrio }">
    <div class="pair-card__header">
      <span class="pair-card__number">{{ index }}</span>
      <span v-if="isTrio" class="pair-card__badge">Trio</span>
    </div>
    <ul class="pair-card__members">
      <li
        v-for="member in members"
        :key="member.fullName"
        class="pair-card__member"
      >
        {{ member.fullName }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Member } from "@/types";

defineProps<{
  members: Member[];
  index: number;
  isTrio: boolean;
}>();
</script>

<style scoped>
.pair-card {
  padding: 1.25rem 1.5rem;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e8e8;
}

.pair-card--trio {
  border-color: #7c3aed;
  border-width: 2px;
}

.pair-card__header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.pair-card__number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #1a1a1a;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.95rem;
}

.pair-card__badge {
  display: inline-block;
  padding: 0.15rem 0.6rem;
  border-radius: 9999px;
  background: #7c3aed;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.pair-card__members {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.pair-card__member {
  font-size: 1rem;
  color: #1a1a1a;
}
</style>

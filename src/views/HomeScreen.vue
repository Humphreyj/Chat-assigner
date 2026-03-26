<template>
  <div class="home-screen">
    <h1 class="page-title">Patch Group Pair Generator</h1>
    <div class="group-grid">
      <GroupCard
        v-for="group in patchGroups"
        :key="group.groupNumber"
        :group-number="group.groupNumber"
        :theme="group.theme"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { patchGroups } from "@/data/rosterData";
import GroupCard from "@/components/GroupCard.vue";
</script>

<style scoped>
.home-screen {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 1.5rem;
}

.group-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

@media (max-width: 768px) {
  .group-grid {
    grid-template-columns: 1fr;
  }
}
</style>

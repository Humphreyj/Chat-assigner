<template>
  <div class="group-page">
    <RouterLink to="/" class="group-page__back">&larr; Back to Home</RouterLink>

    <div v-if="group" class="group-page__content">
      <h1 class="group-page__heading">Patch Group {{ group.groupNumber }}</h1>
      <p class="group-page__theme">{{ group.theme }}</p>

      <section class="group-page__roster">
        <h2 class="group-page__section-title">Members</h2>
        <ul class="group-page__member-list">
          <li
            v-for="member in group.members"
            :key="member.fullName"
            class="group-page__member"
          >
            {{ member.fullName }}
          </li>
        </ul>
      </section>

      <button
        class="group-page__generate-btn"
        :disabled="isAnimating"
        @click="handleGenerate"
      >
        Generate Pairs
      </button>

      <ShuffleAnimation
        v-if="group"
        :members="group.members"
        :is-active="isAnimating"
        @complete="onAnimationComplete"
      />

      <Transition name="pairs-fade">
        <section v-if="generationResult" class="group-page__pairs">
          <div class="group-page__pairs-grid">
            <PairCard
              v-for="(pair, i) in generationResult.pairs"
              :key="'pair-' + i"
              :members="pair.members"
              :index="i + 1"
              :is-trio="false"
            />
            <PairCard
              v-if="generationResult.trio"
              :members="generationResult.trio.members"
              :index="generationResult.pairs.length + 1"
              :is-trio="true"
            />
          </div>
        </section>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { getGroupByNumber } from "@/data/rosterData";
import { generatePairs } from "@/logic/pairGenerator";
import PairCard from "@/components/PairCard.vue";
import ShuffleAnimation from "@/components/ShuffleAnimation.vue";
import type { GenerationResult } from "@/types";

const route = useRoute();

const group = computed(() => {
  const num = Number(route.params.groupNumber);
  return getGroupByNumber(num);
});

const generationResult = ref<GenerationResult | null>(null);
const isAnimating = ref(false);
const pendingResult = ref<GenerationResult | null>(null);

function handleGenerate() {
  if (group.value) {
    isAnimating.value = true;
    pendingResult.value = generatePairs(group.value.members);
    generationResult.value = null;
  }
}

function onAnimationComplete() {
  generationResult.value = pendingResult.value;
  isAnimating.value = false;
}
</script>

<style scoped>
.group-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.group-page__back {
  display: inline-block;
  margin-bottom: 1.5rem;
  color: #7c3aed;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
}

.group-page__back:hover {
  text-decoration: underline;
}

.group-page__heading {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.25rem;
}

.group-page__theme {
  font-size: 1.15rem;
  color: #6b7280;
  margin: 0 0 2rem;
}

.group-page__section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 0.75rem;
}

.group-page__member-list {
  list-style: none;
  margin: 0 0 2rem;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.group-page__member {
  padding: 0.35rem 0.85rem;
  background: #f3f4f6;
  border-radius: 9999px;
  font-size: 0.9rem;
  color: #374151;
}

.group-page__generate-btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #7c3aed;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: background 0.15s ease;
}

.group-page__generate-btn:hover {
  background: #6d28d9;
}

.group-page__generate-btn:disabled {
  background: #a78bfa;
  cursor: not-allowed;
  opacity: 0.7;
}

.pairs-fade-enter-active {
  transition: opacity 0.4s ease;
}

.pairs-fade-enter-from {
  opacity: 0;
}

.group-page__pairs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (max-width: 768px) {
  .group-page__pairs-grid {
    grid-template-columns: 1fr;
  }
}
</style>

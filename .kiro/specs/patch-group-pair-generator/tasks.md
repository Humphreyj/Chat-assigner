# Implementation Plan: Patch Group Pair Generator

## Overview

Build a Vue 3 SPA with TypeScript that displays 15 patch group cards on a home screen, allows navigation to individual group pages, and generates random chat pairs (with trio support for odd-sized groups) using a shuffle animation. The app uses Vue Router, CSS Grid for responsive layout, and hardcoded roster data from CSV.

## Tasks

- [x] 1. Scaffold Vue 3 project and configure routing
  - [x] 1.1 Initialize a Vue 3 + TypeScript project with Vite, install `vue-router`
    - Create `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`
    - Set up `src/main.ts` with Vue app creation and router plugin
    - _Requirements: 2.1, 2.4_
  - [x] 1.2 Configure Vue Router with home and group routes
    - Create `src/router/index.ts` with `/` → `HomeScreen.vue` and `/group/:groupNumber` → `GroupPage.vue`
    - Add route guard to validate `:groupNumber` is 1–15, redirect invalid routes to `/`
    - Create `src/App.vue` with `<RouterView>`
    - _Requirements: 2.1, 2.4_

- [x] 2. Create roster data module and types
  - [x] 2.1 Define TypeScript interfaces and hardcode roster data
    - Create `src/types.ts` with `Member`, `PatchGroup`, `Pair`, `Trio`, and `GenerationResult` interfaces
    - Create `src/data/rosterData.ts` with all 15 patch groups hardcoded from the CSV
    - Include `fullName`, `department`, `groupNumber`, and `theme` for each group
    - Export `getGroupByNumber()` helper function
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  - [ ]\* 2.2 Write unit tests for roster data integrity
    - Verify exactly 15 groups exist
    - Verify each group has 9–11 members
    - Verify `getGroupByNumber()` returns correct group or undefined
    - _Requirements: 6.1, 6.4_

- [x] 3. Implement pair generation logic
  - [x] 3.1 Implement `shuffleArray` and `generatePairs` pure functions
    - Create `src/logic/pairGenerator.ts`
    - Implement Fisher-Yates shuffle in `shuffleArray<T>()`
    - Implement `generatePairs(members)` that returns `GenerationResult` with pairs and optional trio
    - For odd member count, pop last 3 into a trio, pair the rest
    - _Requirements: 3.2, 3.3, 3.5_
  - [ ]\* 3.2 Write property test: all members used exactly once
    - **Property 1: Every member appears exactly once across all pairs and the trio**
    - **Validates: Requirements 3.5**
  - [ ]\* 3.3 Write property test: correct pair/trio structure
    - **Property 2: Even member count → all pairs, no trio; Odd member count → one trio + pairs**
    - **Validates: Requirements 3.2, 3.3**
  - [ ]\* 3.4 Write unit tests for pair generator edge cases
    - Test with 9, 10, and 11 members
    - Verify re-generation produces new random results (not identical to previous)
    - _Requirements: 3.2, 3.3, 3.4, 3.5_

- [x] 4. Checkpoint - Ensure data and logic tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Build HomeScreen and GroupCard components
  - [x] 5.1 Create `GroupCard.vue` component
    - Accept `groupNumber` and `theme` props
    - Render "Patch Group {N}" label and theme name
    - Navigate to `/group/:groupNumber` on click
    - Style as a clickable card
    - _Requirements: 1.2, 1.3, 2.1_
  - [x] 5.2 Create `HomeScreen.vue` component
    - Import `patchGroups` from roster data
    - Render 15 `GroupCard` components sorted by `groupNumber` in a CSS Grid
    - Responsive grid: single column below 768px, multi-column above
    - _Requirements: 1.1, 1.4, 7.1, 7.3_

- [x] 6. Build GroupPage with pair display
  - [x] 6.1 Create `PairCard.vue` component
    - Accept `members`, `index`, and `isTrio` props
    - Display sequential number, member names, and "Trio" badge when applicable
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  - [x] 6.2 Create `GroupPage.vue` component
    - Read `:groupNumber` route param and look up group from roster data
    - Display group heading with "Patch Group {N}" and theme
    - Display full member roster with names
    - Add back-to-home navigation link
    - Add "Generate Pairs" button that calls `generatePairs()`
    - Render `PairCard` components for each pair/trio in the result
    - Responsive layout for pair cards: single column below 768px
    - _Requirements: 2.2, 2.3, 2.4, 3.1, 3.4, 4.1, 4.2, 4.3, 4.4, 7.2, 7.3_

- [x] 7. Implement shuffle animation
  - [x] 7.1 Create `ShuffleAnimation.vue` component
    - Accept `members` and `isActive` props, emit `complete` event
    - Display name slots that rapidly cycle through random member names
    - Use `setInterval` with decreasing speed for slot-machine deceleration effect
    - Run for 1.5–2 seconds then emit `complete`
    - _Requirements: 5.1, 5.2, 5.3_
  - [x] 7.2 Integrate shuffle animation into `GroupPage.vue`
    - On "Generate Pairs" click: set `isAnimating = true`, compute result, start animation
    - On animation `complete`: set `isAnimating = false`, reveal pairs with transition
    - Disable "Generate Pairs" button during animation
    - _Requirements: 5.1, 5.2, 5.3_

- [x] 8. Final checkpoint - Ensure all tests pass and app is functional
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design
- The roster data in task 2.1 must use the exact CSV data provided by the user

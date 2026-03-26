import type { Member, Pair, Trio, GenerationResult } from "../types";

/**
 * Fisher-Yates shuffle — returns a new shuffled copy of the array.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Generate random pairs (and an optional trio for odd-sized groups) from a list of members.
 *
 * Algorithm:
 * 1. Copy and shuffle the members array
 * 2. If the count is odd, pop the last 3 into a Trio
 * 3. Pair the remaining members in steps of 2
 * 4. Return { pairs, trio }
 */
export function generatePairs(members: Member[]): GenerationResult {
  const shuffled = shuffleArray(members);

  let trio: Trio | null = null;

  if (shuffled.length % 2 !== 0) {
    const trioMembers = shuffled.splice(shuffled.length - 3, 3);
    trio = { members: [trioMembers[0], trioMembers[1], trioMembers[2]] };
  }

  const pairs: Pair[] = [];
  for (let i = 0; i < shuffled.length; i += 2) {
    pairs.push({ members: [shuffled[i], shuffled[i + 1]] });
  }

  return { pairs, trio };
}

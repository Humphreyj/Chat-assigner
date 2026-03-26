export interface Member {
  fullName: string;
  department: string;
}

export interface PatchGroup {
  groupNumber: number;
  theme: string;
  members: Member[];
}

export interface Pair {
  members: [Member, Member];
}

export interface Trio {
  members: [Member, Member, Member];
}

export interface GenerationResult {
  pairs: Pair[];
  trio: Trio | null;
}

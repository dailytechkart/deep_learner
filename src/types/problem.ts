export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Topic = string;
export type Role =
  | 'SDE1'
  | 'SDE2'
  | 'SDE3'
  | 'Frontend Specialist'
  | 'Frontend Architect'
  | 'UI/UX Developer'
  | 'Frontend Performance Engineer';
export type Company = 'Google' | 'Amazon' | 'Microsoft' | 'Facebook' | 'Apple' | 'Netflix';
export type Tag =
  | 'Two Pointers'
  | 'Sliding Window'
  | 'Recursion'
  | 'Greedy'
  | 'Backtracking'
  | 'Hashing'
  | 'Sorting';

export type FilterValue = Topic | Difficulty | Company | Tag;

export interface Problem {
  id: string;
  title: string;
  description: string;
  topic: Topic;
  difficulty: Difficulty;
  companies: Company[];
  tags: Tag[];
}

export interface ProblemData {
  problems: Problem[];
}

export interface FilterSection {
  title: string;
  options: { id: FilterValue; label: FilterValue; count: number }[];
  selected: FilterValue[];
  onSelect: (value: FilterValue) => void;
}

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

export enum Language {
  Python = 'python',
  Java = 'java',
  JavaScript = 'javascript'
}

export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  acceptance: string;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: Record<Language, string>;
}

export interface ExecutionResult {
  status: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Compilation Error';
  output: string;
  executionTime?: string;
  memory?: string;
  testCasesPassed?: number;
  totalTestCases?: number;
  error?: string;
}

export interface NavItem {
  label: string;
  id: string;
  icon: string;
}
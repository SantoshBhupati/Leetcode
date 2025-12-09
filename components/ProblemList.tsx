import React from 'react';
import { PROBLEMS } from '../constants';
import { Difficulty, Problem } from '../types';

interface ProblemListProps {
  onSelectProblem: (problem: Problem) => void;
  activeProblemId: string;
}

const ProblemList: React.FC<ProblemListProps> = ({ onSelectProblem, activeProblemId }) => {
  const getDiffColor = (diff: Difficulty) => {
    switch (diff) {
      case Difficulty.Easy: return 'text-green-400';
      case Difficulty.Medium: return 'text-yellow-400';
      case Difficulty.Hard: return 'text-red-400';
    }
  };

  return (
    <div className="flex-1 overflow-auto p-8">
       <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">Problem Set</h1>
                <p className="text-gray-400">Solve these curated problems to ace your technical interview.</p>
            </div>
            
            <div className="bg-dark-800 rounded-lg border border-dark-700 overflow-hidden shadow-xl">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-dark-700 text-gray-200 font-medium">
                        <tr>
                            <th className="p-4 pl-6">Status</th>
                            <th className="p-4">Title</th>
                            <th className="p-4">Difficulty</th>
                            <th className="p-4">Acceptance</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-700">
                        {PROBLEMS.map((problem) => (
                            <tr 
                                key={problem.id} 
                                className={`hover:bg-dark-700/50 transition-colors cursor-pointer ${activeProblemId === problem.id ? 'bg-dark-700/30' : ''}`}
                                onClick={() => onSelectProblem(problem)}
                            >
                                <td className="p-4 pl-6">
                                    {/* Mock status icons */}
                                    {problem.id === '1' ? (
                                        <i className="fa-solid fa-check text-green-500"></i>
                                    ) : (
                                        <i className="fa-regular fa-circle text-gray-600"></i>
                                    )}
                                </td>
                                <td className="p-4 font-medium text-white">
                                    {problem.id}. {problem.title}
                                </td>
                                <td className={`p-4 ${getDiffColor(problem.difficulty)}`}>
                                    {problem.difficulty}
                                </td>
                                <td className="p-4">
                                    {problem.acceptance}
                                </td>
                                <td className="p-4">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onSelectProblem(problem); }}
                                        className="text-accent-500 hover:text-accent-400"
                                    >
                                        Solve <i className="fa-solid fa-arrow-right ml-1"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
       </div>
    </div>
  );
};

export default ProblemList;
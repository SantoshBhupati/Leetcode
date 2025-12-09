import React, { useState, useEffect } from 'react';
import { Problem, Language, ExecutionResult } from '../types';
import { executeCode, getAIHint } from '../services/geminiService';

interface WorkspaceProps {
  problem: Problem;
  onBack: () => void;
}

const Workspace: React.FC<WorkspaceProps> = ({ problem, onBack }) => {
  const [activeTab, setActiveTab] = useState<'description' | 'solution'>('description');
  const [language, setLanguage] = useState<Language>(Language.Java);
  const [code, setCode] = useState<string>(problem.starterCode[Language.Java]);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [loadingHint, setLoadingHint] = useState(false);

  useEffect(() => {
    // Reset code when language or problem changes
    setCode(problem.starterCode[language]);
    setResult(null);
    setHint(null);
  }, [problem, language]);

  const handleRun = async () => {
    setIsRunning(true);
    setResult(null);
    const execResult = await executeCode(code, language, problem);
    setResult(execResult);
    setIsRunning(false);
  };

  const handleGetHint = async () => {
      setLoadingHint(true);
      const h = await getAIHint(problem, code);
      setHint(h);
      setLoadingHint(false);
  }

  const getStatusColor = (status: string) => {
    if (status === 'Accepted') return 'text-green-500';
    return 'text-red-500';
  };

  return (
    <div className="flex flex-1 h-full overflow-hidden bg-dark-900">
      {/* Left Panel: Problem Description */}
      <div className="w-5/12 border-r border-dark-700 flex flex-col bg-dark-800">
        <div className="h-10 border-b border-dark-700 bg-dark-800 flex items-center px-2">
            <button onClick={onBack} className="mr-2 px-2 text-gray-400 hover:text-white">
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="flex space-x-1">
                <button 
                    onClick={() => setActiveTab('description')}
                    className={`px-4 py-2 text-xs font-medium border-t-2 ${activeTab === 'description' ? 'border-accent-500 text-white bg-dark-700' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                >
                    <i className="fa-solid fa-file-lines mr-2"></i> Description
                </button>
                <button 
                    onClick={() => setActiveTab('solution')}
                    className={`px-4 py-2 text-xs font-medium border-t-2 ${activeTab === 'solution' ? 'border-accent-500 text-white bg-dark-700' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
                >
                    <i className="fa-solid fa-flask mr-2"></i> Solutions
                </button>
            </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <h2 className="text-xl font-bold text-white mb-4">{problem.id}. {problem.title}</h2>
          <div className="flex gap-2 mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-dark-700 ${
                problem.difficulty === 'Easy' ? 'text-green-400' : 
                problem.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
            }`}>{problem.difficulty}</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-dark-700 text-gray-400">
                <i className="fa-regular fa-thumbs-up mr-1"></i> 12.4K
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-dark-700 text-gray-400">
                <i className="fa-regular fa-star mr-1"></i>
            </span>
          </div>

          <div className="prose prose-invert prose-sm max-w-none text-gray-300">
            <p className="whitespace-pre-line leading-relaxed">{problem.description}</p>
            
            <h3 className="mt-6 mb-3 font-semibold text-white">Examples</h3>
            {problem.examples.map((ex, idx) => (
                <div key={idx} className="mb-4 bg-dark-700 p-4 rounded-lg border border-dark-600">
                    <p className="mb-1"><strong className="text-gray-200">Input:</strong> <code className="bg-dark-900 px-1 rounded text-gray-300">{ex.input}</code></p>
                    <p className="mb-1"><strong className="text-gray-200">Output:</strong> <code className="bg-dark-900 px-1 rounded text-gray-300">{ex.output}</code></p>
                    {ex.explanation && <p className="text-gray-400 text-xs mt-2"><strong>Explanation:</strong> {ex.explanation}</p>}
                </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-dark-700">
              <button 
                onClick={handleGetHint}
                disabled={loadingHint}
                className="text-sm text-accent-500 hover:text-accent-400 flex items-center gap-2"
              >
                 <i className="fa-regular fa-lightbulb"></i> {loadingHint ? 'Thinking...' : 'Need a hint?'}
              </button>
              {hint && (
                  <div className="mt-2 p-3 bg-blue-900/20 border border-blue-900/50 rounded text-sm text-blue-200">
                      {hint}
                  </div>
              )}
          </div>
        </div>
      </div>

      {/* Right Panel: Code Editor */}
      <div className="flex-1 flex flex-col bg-dark-900">
        {/* Editor Toolbar */}
        <div className="h-10 border-b border-dark-700 bg-dark-800 flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center space-x-2">
                 <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="bg-dark-700 text-gray-200 text-xs rounded px-2 py-1 border-none focus:ring-1 focus:ring-accent-500 outline-none"
                 >
                     <option value={Language.Java}>Java</option>
                     <option value={Language.Python}>Python</option>
                     <option value={Language.JavaScript}>JavaScript</option>
                 </select>
            </div>
            <div className="flex items-center space-x-2">
                 <button className="text-gray-400 hover:text-white text-xs px-2"><i className="fa-solid fa-gear"></i></button>
            </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 relative">
            <textarea 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-dark-900 text-gray-300 font-mono text-sm p-4 outline-none resize-none leading-6"
                spellCheck="false"
            />
        </div>

        {/* Console / Output Area */}
        <div className="h-1/3 border-t border-dark-700 bg-dark-800 flex flex-col">
            <div className="h-9 border-b border-dark-700 flex items-center px-4 justify-between bg-dark-800">
                 <span className="text-xs font-medium text-gray-400">Console</span>
                 <div className="flex items-center space-x-2">
                     <button 
                        onClick={handleRun}
                        disabled={isRunning}
                        className="px-4 py-1 rounded bg-dark-700 text-gray-300 text-xs font-medium hover:bg-dark-600 transition-colors disabled:opacity-50"
                     >
                         Run
                     </button>
                     <button 
                        onClick={handleRun}
                        disabled={isRunning}
                        className="px-4 py-1 rounded bg-green-600 text-white text-xs font-medium hover:bg-green-500 transition-colors disabled:opacity-50"
                     >
                         {isRunning ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Submit'}
                     </button>
                 </div>
            </div>
            <div className="flex-1 p-4 overflow-auto font-mono text-sm">
                {!result && !isRunning && (
                    <div className="text-gray-500 italic">Run your code to see results here...</div>
                )}
                {isRunning && (
                    <div className="text-gray-400">
                        <i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Executing...
                    </div>
                )}
                {result && (
                    <div className="space-y-3">
                        <div className={`text-lg font-bold ${getStatusColor(result.status)}`}>
                            {result.status}
                        </div>
                        
                        {result.status === 'Accepted' && (
                             <div className="flex space-x-6 text-xs text-gray-400">
                                <div>
                                    <span className="block text-gray-500 mb-1">Runtime</span>
                                    <span className="text-gray-200 font-semibold">{result.executionTime}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 mb-1">Memory</span>
                                    <span className="text-gray-200 font-semibold">{result.memory}</span>
                                </div>
                            </div>
                        )}

                        {result.error && (
                            <div className="bg-red-900/20 border border-red-900/50 p-3 rounded text-red-200 whitespace-pre-wrap font-mono text-xs">
                                {result.error}
                            </div>
                        )}

                        {!result.error && result.output && (
                            <div className="bg-dark-900 p-3 rounded border border-dark-700 text-gray-300 whitespace-pre-wrap">
                                <div className="text-xs text-gray-500 mb-1">Output:</div>
                                {result.output}
                            </div>
                        )}
                        
                        <div className="mt-2 text-xs text-gray-500">
                            Test Cases: {result.testCasesPassed}/{result.totalTestCases} passed
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
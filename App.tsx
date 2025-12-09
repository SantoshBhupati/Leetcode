import React, { useState } from 'react';
import Layout from './components/Layout';
import ProblemList from './components/ProblemList';
import Workspace from './components/Workspace';
import { Problem } from './types';

const App: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  return (
    <Layout>
      {selectedProblem ? (
        <Workspace 
          problem={selectedProblem} 
          onBack={() => setSelectedProblem(null)} 
        />
      ) : (
        <ProblemList 
          activeProblemId={''}
          onSelectProblem={(p) => setSelectedProblem(p)} 
        />
      )}
    </Layout>
  );
};

export default App;
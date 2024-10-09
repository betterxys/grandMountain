import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import LearningTask from './components/LearningTask';
import CharacterDetail from './components/CharacterDetail';

interface Task {
  id: number;
  characters: string;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('learningTasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('learningTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (characters: string) => {
    setTasks([...tasks, { id: Date.now(), characters }]);
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">学习汉字</h1>
          <Routes>
            <Route path="/" element={
              <>
                <SearchBar onSearch={addTask} />
                <LearningTask tasks={tasks} onClear={clearTasks} />
              </>
            } />
            <Route path="/character/:char" element={<CharacterDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
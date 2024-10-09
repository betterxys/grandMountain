import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface Task {
  id: number;
  characters: string;
}

interface LearningTaskProps {
  tasks: Task[];
  onClear: () => void;
}

const LearningTask: React.FC<LearningTaskProps> = ({ tasks, onClear }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">学习任务</h2>
        <button
          onClick={onClear}
          className="px-4 py-2 bg-red-500 text-white rounded-lg text-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          清空
        </button>
      </div>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-lg">暂无学习任务</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="bg-gray-100 p-4 rounded-lg">
              <div className="flex flex-wrap gap-4">
                {task.characters.split('').map((char, index) => (
                  <Link
                    key={index}
                    to={`/character/${char}`}
                    className="w-16 h-16 flex items-center justify-center text-3xl font-bold bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {char}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LearningTask;
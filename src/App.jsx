import './App.css';
import { useState, useEffect } from 'react';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterDropdown from './components/FilterDropdown';
function App() {
  const [technologies, setTechnologies] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      setTechnologies(JSON.parse(saved));
      console.log('Данные загружены из localStorage');
    } else {
      setTechnologies([
        {
          id: 1,
          title: 'React Components',
          description: 'Изучение базовых компонентов',
          status: 'not-started',
          notes: ''
        },
        {
          id: 2,
          title: 'JSX Syntax',
          description: 'Освоение синтаксиса JSX',
          status: 'not-started',
          notes: ''
        },
        {
          id: 3,
          title: 'State Management',
          description: 'Работа с состоянием компонентов',
          status: 'not-started',
          notes: ''
        },
        {
          id: 4,
          title: 'React Hooks',
          description: 'Изучение основных хуков React',
          status: 'not-started',
          notes: ''
        },
        {
          id: 5,
          title: 'React Router',
          description: 'Навигация в React приложениях',
          status: 'not-started',
          notes: ''
        },
        {
          id: 6,
          title: 'Context API',
          description: 'Управление состоянием приложения',
          status: 'not-started',
          notes: ''
        }
      ]);
    }   
}, []);

useEffect(() => {
  if (technologies.length > 0){
    localStorage.setItem('techTrackerData', JSON.stringify(technologies));
    console.log('Данные сохранены в localStorage');
  }
}, [technologies]);

const handleStatusChange = (id, newStatus) => {
  setTechnologies(prevTech =>
    prevTech.map(tech =>
      tech.id === id ? { ...tech, status: newStatus } : tech
    )
  );
};

const searchedTechnologies = technologies.filter(tech => 
  tech.title.toLowerCase().includes(searchQuery.toLowerCase())||
  tech.description.toLowerCase().includes(searchQuery.toLowerCase())
);

const handleDeleteTechnology = (id) => {
  setTechnologies(prevTech => prevTech.filter(tech => tech.id !== id));
};

const handleResetAll = () => {
  setTechnologies(prevTech =>
    prevTech.map(tech => ({ ...tech, status: 'not-started' }))
  );
};

const handleCompleteAll = () => {
  setTechnologies(prevTech =>
    prevTech.map(tech => ({ ...tech, status: 'completed' }))
  )
}

const updateTechnologyNotes = (techId, newNotes) => {
  setTechnologies(prevTech => prevTech.map(tech =>
    tech.id === techId ? { ...tech, notes: newNotes } : tech
  )
  );
};


const filteredTechnologies = technologies.filter(tech => {
  switch (filter) {
    case 'not-started':
      return tech.status === 'not-started';
    case 'in-progress':
      return tech.status === 'in-progress';
    case 'completed':
      return tech.status === 'completed';
    default:
      return true;
  }
});

const handleFilterChange = (newFilter) => {
  setFilter(newFilter);
};

return (
  <div className="App">
    <ProgressHeader technologies={technologies} />
    <QuickActions onCompleteAll={handleCompleteAll} onResetAll={handleResetAll} />
    <div className='search-box'>
      <input type='text' 
      placeholder='Поиск технологий' 
      value={searchQuery}
      onChange={(e)=>setSearchQuery(e.target.value)}
      />
      <span>Найдено: {searchedTechnologies.length}</span>
    </div>
    <FilterDropdown currentFilter={filter} onFilterChange={handleFilterChange} />
    <TechnologyCard
      technologies={filteredTechnologies}
      onStatusChange={handleStatusChange}
      onDeleteTechnology={handleDeleteTechnology}
      onNotesChange={updateTechnologyNotes}
    />
  </div>
);
}
export default App;
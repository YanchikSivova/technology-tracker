import './App.css';
import { useState } from 'react';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterDropdown from './components/FilterDropdown';
function App() {
  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      title: 'React Components',
      description: 'Изучение базовых компонентов',
      status: 'not-started'
    },
    {
      id: 2,
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX',
      status: 'not-started'
    },
    {
      id: 3,
      title: 'State Management',
      description: 'Работа с состоянием компонентов',
      status: 'not-started'
    },
    {
      id: 4,
      title: 'React Hooks',
      description: 'Изучение основных хуков React',
      status: 'not-started'
    },
    {
      id: 5,
      title: 'React Router',
      description: 'Навигация в React приложениях',
      status: 'not-started'
    },
    {
      id: 6,
      title: 'Context API',
      description: 'Управление состоянием приложения',
      status: 'not-started'
    }
  ]);

    const handleStatusChange = (id, newStatus) => {
      setTechnologies(prevTech =>
        prevTech.map(tech => 
          tech.id === id? {...tech, status: newStatus} : tech
        )
      );
    };

    // const handleAddTechnology = (newTech)=>{
    //   const newTechnology = {
    //     id: technologies.length + 1,
    //     ...newTech,
    //     status: 'not-started'
    //   };
    //   setTechnologies(prevTech => [...prevTech, newTechnology]);
    // };

    const handleDeleteTechnology = (id) =>{
      setTechnologies(prevTech => prevTech.filter(tech => tech.id !== id));
    };

    const handleResetAll = () =>{
      setTechnologies(prevTech => 
        prevTech.map(tech => ({...tech, status: 'not-started'}))
      );
    };

    const handleCompleteAll = () =>{
      setTechnologies(prevTech =>
        prevTech.map(tech => ({...tech, status:'completed'}))
      )
    }

    const [filter, setfilter] = useState('all');
    const filteredTechnologies = technologies.filter(tech => {
      switch (filter){
        case 'not-started':
          return tech.status === 'not-started';
        case 'in-progress':
          return tech.status === 'in-progress';
        case 'completed':
          tech.status === 'completed';
        default:
          return true;
      }
    });

    const handleFilterChange = (newFilter) =>{
      setfilter(newFilter);
    };
    
  return (
    <div className="App">
      <ProgressHeader technologies={technologies}/>
      <QuickActions onCompleteAll={handleCompleteAll} onResetAll={handleResetAll}/>
      <FilterDropdown currentFilter={filter} onFilterChange={handleFilterChange}/>
      <TechnologyCard technologies={filteredTechnologies} onStatusChange={handleStatusChange} onDeleteTechnology = {handleDeleteTechnology}/>
    </div>
  );
}
export default App;
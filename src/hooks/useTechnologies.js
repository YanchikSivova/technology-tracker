import useLocalStorage from "./useLocalStorage";

const initialTechnologies = [
    {
        id: 1,
        title: 'React Components',
        description: 'Изучение базовых компонентов',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 2,
        title: 'JSX Syntax',
        description: 'Освоение синтаксиса JSX',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 3,
        title: 'State Management',
        description: 'Работа с состоянием компонентов',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 4,
        title: 'React Hooks',
        description: 'Изучение основных хуков React',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 5,
        title: 'React Router',
        description: 'Навигация в React приложениях',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 6,
        title: 'Context API',
        description: 'Управление состоянием приложения',
        status: 'not-started',
        notes: '',
        category: 'frontend'
    },
    {
        id: 7,
        title: 'Node.js Basics',
        description: 'Основы серверного JavaScript',
        status: 'not-started',
        notes: '',
        category: 'backend'
    }
];

function useTechnologies() {
    const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

    const handleStatusChange = (id, newStatus) => {
        setTechnologies(prevTech =>
            prevTech.map(tech =>
                tech.id === id ? { ...tech, status: newStatus } : tech
            )
        );
    };

    const updateTechnologyNotes = (techId, newNotes) => {
        setTechnologies(prevTech => prevTech.map(tech =>
            tech.id === techId ? { ...tech, notes: newNotes } : tech
        )
        );
    };

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
    };

    const calculateProgress = ()=>{
        if(technologies.length === 0) return 0;
        const completed = technologies.filter(tech=> tech.status === 'completed').length;

        return Math.round((completed / technologies.length)*100);
    };

    return{
        technologies,
        handleStatusChange,
        updateTechnologyNotes,
        handleDeleteTechnology,
        handleResetAll,
        handleCompleteAll,
        progress: calculateProgress()
    };
}

export default useTechnologies;

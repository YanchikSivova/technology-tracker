import useLocalStorage from "./useLocalStorage";
import { useState, useCallback } from "react";

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

const transformToRussianTech = (post, index) => {
    // Сопоставляем латинские слова с русскими технологиями
    const techMapping = [
        { latin: 'autem', tech: 'React', category: 'frontend' },
        { latin: 'quas', tech: 'Vue.js', category: 'frontend' },
        { latin: 'sunt', tech: 'Angular', category: 'frontend' },
        { latin: 'rerum', tech: 'Node.js', category: 'backend' },
        { latin: 'dolorem', tech: 'Express', category: 'backend' },
        { latin: 'magnam', tech: 'MongoDB', category: 'database' },
        { latin: 'voluptatem', tech: 'PostgreSQL', category: 'database' },
        { latin: 'commodi', tech: 'TypeScript', category: 'language' },
        { latin: 'laborum', tech: 'Python', category: 'language' },
        { latin: 'consequatur', tech: 'Docker', category: 'devops' },
        { latin: 'architecto', tech: 'Kubernetes', category: 'devops' },
        { latin: 'blanditiis', tech: 'Webpack', category: 'tools' }
    ];
    

    // Находим подходящую технологию по словам из title
    const titleWords = post.title.toLowerCase().split(' ');
    const matchedTech = techMapping.find(mapping =>
        titleWords.some(word => word.includes(mapping.latin))
    ) || techMapping[index % techMapping.length];

    const descriptions = {
        'React': 'Библиотека для создания пользовательских интерфейсов',
        'Vue.js': 'Прогрессивный фреймворк для веб-приложений',
        'Angular': 'Платформа для разработки мобильных и десктопных приложений',
        'Node.js': 'Среда выполнения JavaScript на сервере',
        'Express': 'Минималистичный веб-фреймворк для Node.js',
        'MongoDB': 'Документоориентированная NoSQL база данных',
        'PostgreSQL': 'Мощная объектно-реляционная система управления базами данных',
        'TypeScript': 'Типизированное надмножество JavaScript',
        'Python': 'Высокоуровневый язык программирования общего назначения',
        'Docker': 'Платформа для контейнеризации приложений',
        'Kubernetes': 'Система оркестрации контейнеров',
        'Webpack': 'Сборщик модулей для JavaScript приложений'
    };
    return {
        id: `api-${post.id}-${Date.now()}`,
        title: matchedTech.tech,
        description: descriptions[matchedTech.tech] || `Технология для разработки программного обеспечения`,
        category: matchedTech.category,
        difficulty: ['beginner', 'intermediate', 'advanced'][index % 3],
        status: 'not-started',
        notes: '',
        resources: [
            `https://${matchedTech.tech.toLowerCase().replace('.', '').replace(' ', '')}.com`,
            'https://developer.mozilla.org',
            'https://github.com'
        ],
        isFromApi: true
    };
};

    function useTechnologies() {
        const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);
        const [apiLoading, setApiLoading] = useState(false);
        const [apiError, setApiError] = useState(null);

        const importFromApi = useCallback(async () => {
        try {
            setApiLoading(true);
            setApiError(null);

            // Используем JSONPlaceholder API
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4');
            
            if (!response.ok) {
                throw new Error(`Ошибка API: ${response.status}`);
            }

            const posts = await response.json();

            // Преобразуем посты в русскоязычные технологии
            const newTechnologies = posts
                .filter((post, index) => {
                    // Проверяем, что такой технологии еще нет
                    const transformedTech = transformToRussianTech(post, index);
                    return !technologies.some(tech => tech.title === transformedTech.title);
                })
                .map(transformToRussianTech);

            if (newTechnologies.length === 0) {
                setApiError('Новых технологий для импорта не найдено');
                return 0;
            }

            // Добавляем новые технологии
            setTechnologies(prev => [...prev, ...newTechnologies]);
            
            return newTechnologies.length;

        } catch (err) {
            console.error('API Error:', err);
            setApiError('Не удалось загрузить технологии. Проверьте интернет-соединение.');
            return 0;
        } finally {
            setApiLoading(false);
        }
    }, [technologies, setTechnologies]);

        const handleAddTechnology = (newTech) => {
            setTechnologies(prevTech => [...prevTech, {
                ...newTech,
                id: Date.now()
            }]);
        };

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

        const calculateProgress = () => {
            if (technologies.length === 0) return 0;
            const completed = technologies.filter(tech => tech.status === 'completed').length;

            return Math.round((completed / technologies.length) * 100);
        };

        return {
            technologies,
            apiLoading,
            apiError,
            handleStatusChange,
            updateTechnologyNotes,
            handleDeleteTechnology,
            handleAddTechnology,
            handleResetAll,
            handleCompleteAll,
            importFromApi,
            progress: calculateProgress()
        };
    }

    export default useTechnologies;

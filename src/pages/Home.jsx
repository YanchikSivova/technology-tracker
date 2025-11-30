import { useState } from 'react';
import useTechnologies from '../hooks/useTechnologies';
import TechnologyCard from '../components/TechnologyCard';
import ProgressHeader from '../components/ProgressHeader';
import QuickActions from '../components/QuickActions';
import FilterDropdown from '../components/FilterDropdown';
function Home() {
    const {
        technologies,
        apiLoading,
        apiError,
        handleStatusChange,
        updateTechnologyNotes,
        handleDeleteTechnology,
        handleResetAll,
        handleCompleteAll,
        importFromApi,
        handleImportTechnologies,
        progress
    } = useTechnologies();

    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const searchedTechnologies = technologies.filter(tech =>
        tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    const handleApiImport = async () => {
        const importedCount = await importFromApi();
        if (importedCount > 0) {
            // Можно добавить уведомление или console.log
            console.log(`Импортировано ${importedCount} технологий`);
        }
    };
    return (
        <div className="page">
            <div className="page-header">
                <h1>Трекер изучения технологий</h1>
                <ProgressHeader
                    progress={progress}
                    label="Общий прогресс"
                    animated={true}
                />
            </div>

            <div className='quick-actions-section'>
                <QuickActions
                    onCompleteAll={handleCompleteAll}
                    onResetAll={handleResetAll}
                    technologies={technologies}
                    onApiImport={handleApiImport}
                    apiLoading={apiLoading}
                    onImportTechnologies={handleImportTechnologies}
                />
                
                    {apiError && (
                        <div className="api-error">
                            ⚠️ {apiError}
                        </div>
                    )}
               
            </div>
            <div className='search-box'>
                <input type='text'
                    placeholder='Поиск технологий'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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

export default Home;
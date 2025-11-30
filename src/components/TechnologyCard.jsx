import './TechnologyCard.css';
import TechnologyNotes from './TechnologyNotes';
import { useState } from 'react';
import DeadlineForm from './DeadlineForm';
import DeadlineDisplay from './DeadlineDisplay';
import useStudyDeadlines from '../hooks/useStudyDeadlines';
import useBulkEdit from '../hooks/useBulkEdit';
import BulkEditPanel from './BulkEditPanel';
function TechnologyCard({ technologies, onStatusChange, onDeleteTechnology, onNotesChange }) {

    const { deadlines, errors, setDeadline, removeDeadline, getDeadlineStatus } = useStudyDeadlines();
    const [editingDeadlineFor, setEditingDeadlineFor] = useState(null);

    const {
        selectedTechs,
        isBulkEditing,
        toggleSelection,
        selectAll,
        clearSelection,
        startBulkEdit,
        cancelBulkEdit,
        applyBulkStatus
    } = useBulkEdit();

    const handleStatusClick = (id) => {
        if (isBulkEditing) {
            // В режиме массового редактирования - выбираем технологию
            toggleSelection(id);
        } else {
            // В обычном режиме - меняем статус
            const statusOrder = ['not-started', 'in-progress', 'completed'];
            const tech = technologies.find(t => t.id === id);
            const currentIndex = statusOrder.indexOf(tech.status);
            const nextIndex = (currentIndex + 1) % statusOrder.length;
            onStatusChange(id, statusOrder[nextIndex]);
        }
    }

    const handleDeleteClick = (id, event) => {
        event.stopPropagation();
        onDeleteTechnology(id);
    }

    const handleSaveDeadline = (techId, deadlineDate) => {
        if (setDeadline(techId, deadlineDate)) {
            setEditingDeadlineFor(null);
        }
    };

    const handleRemoveDeadline = (techId) => {
        removeDeadline(techId);
    };

    const handleKeyDown = (event, techId) => {
        if (isBulkEditing && event.key === ' ') {
            event.preventDefault();
            toggleSelection(techId);
        }
    };

    const handleSelectAll = () => {
        selectAll(technologies.map(tech => tech.id));
    };

    return (
        <div className="technologies-list">
            <div className='card-header'>
                <h2>Список технологий</h2>
                {!isBulkEditing ? (
                    <button
                        onClick={startBulkEdit}
                        className="bulk-edit-toggle"
                        aria-label="Включить режим массового редактирования"
                    >
                        📋 Массовое редактирование
                    </button>
                ) : (
                    <BulkEditPanel
                        selectedCount={selectedTechs.size}
                        totalCount={technologies.length}
                        onApplyStatus={(status) => applyBulkStatus(status, onStatusChange)}
                        onCancel={cancelBulkEdit}
                        onSelectAll={handleSelectAll}
                        onClearSelection={clearSelection}
                    />
                )}
            </div>
            <ul>
                {technologies.map(technology => (
                    <li key={technology.id} className={`${technology.status} ${isBulkEditing && selectedTechs.has(technology.id) ? 'selected' : ''} ${isBulkEditing ? 'bulk-mode' : ''}`}
                        onClick={() => handleStatusClick(technology.id)}
                        onKeyDown={(e) => handleKeyDown(e, technology.id)}
                        style={{ cursor: isBulkEditing ? 'default' : 'pointer' }}
                        tabIndex={0}
                        role={isBulkEditing ? "checkbox" : "button"}
                        aria-checked={selectedTechs.has(technology.id)}
                        aria-label={technology.title} >
                        <div className='card-content'>
                            <span>
                                <h3>{technology.title}</h3>
                                <p className="description">{technology.description}</p>
                            </span>
                            <div className="status-indicators">
                                {isBulkEditing ? (
                                    // В режиме массового редактирования - показываем только индикатор выбора
                                    <div className="selection-indicator">
                                        {selectedTechs.has(technology.id) ? '☑️' : '⬜'}
                                    </div>
                                ) : (
                                    // В обычном режиме - показываем только иконку статуса
                                    <div className="status-icon">
                                        {technology.status === 'not-started' ? '❌' : (technology.status === 'completed' ? '✅' : '⌛️')}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="deadline-section">
                            <div onClick={(e) => e.stopPropagation()}>
                                {editingDeadlineFor === technology.id ? (
                                    <DeadlineForm
                                        technology={technology}
                                        onSave={(date) => handleSaveDeadline(technology.id, date)}
                                        onCancel={() => setEditingDeadlineFor(null)}
                                        existingDeadline={deadlines[technology.id]}
                                        error={errors[technology.id]}
                                    />
                                ) : deadlines[technology.id] ? (
                                    <DeadlineDisplay
                                        technology={technology}
                                        deadline={deadlines[technology.id]}
                                        status={getDeadlineStatus(technology.id)}
                                        onEdit={() => setEditingDeadlineFor(technology.id)}
                                        onRemove={() => handleRemoveDeadline(technology.id)}
                                    />
                                ) : (
                                    <button
                                        className="set-deadline-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingDeadlineFor(technology.id);
                                        }}
                                        aria-label={`Установить срок изучения для ${technology.title}`}
                                    >
                                        📅 Установить срок
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className='notes-delete__container'>
                            <div onClick={(e) => e.stopPropagation()}>
                                <TechnologyNotes
                                    notes={technology.notes}
                                    onNotesChange={onNotesChange}
                                    techId={technology.id}
                                />
                            </div>
                            <button className="delete-button" onClick={(e) => handleDeleteClick(technology.id, e)} title="Удалить технологию">
                                🗑️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div >
    );
}

export default TechnologyCard;
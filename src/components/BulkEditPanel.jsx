import './BulkEditPanel.css';
import { useState, useEffect } from 'react';

function BulkEditPanel({
    selectedCount,
    totalCount,
    onApplyStatus,
    onCancel,
    onSelectAll,
    onClearSelection
}) {
    const [selectedStatus, setSelectedStatus] = useState('not-started');

    const handleSubmit = (e) => {
        e.preventDefault();
        onApplyStatus(selectedStatus);
    };

    const statusOptions = [
        { value: 'not-started', label: 'Не начато', icon: '❌' },
        { value: 'in-progress', label: 'В процессе', icon: '⌛️' },
        { value: 'completed', label: 'Выполнено', icon: '✅' }
    ];

    return (
        <div
            className="bulk-edit-panel"
            role="region"
            aria-labelledby="bulk-edit-title"
        >
            <div className="bulk-edit-header">
                <h3 id="bulk-edit-title">
                    📋 Массовое редактирование ({selectedCount} выбрано)
                </h3>

                <div className="selection-actions">
                    <button
                        type="button"
                        onClick={onSelectAll}
                        className="selection-button"
                        aria-label="Выбрать все технологии"
                    >
                        Выбрать все
                    </button>

                    <button
                        type="button"
                        onClick={onClearSelection}
                        className="selection-button"
                        aria-label="Очистить выбор"
                    >
                        Очистить
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bulk-edit-form">
                
                    <h3 className="form-header">
                        Установить статус для выбранных технологий:
                    </h3>

                    <div className="status-options" role="radiogroup" aria-labelledby="status-legend">
                        {statusOptions.map(option => (
                            <label key={option.value} className="status-option">
                                <input
                                    type="radio"
                                    name="bulk-status"
                                    value={option.value}
                                    checked={selectedStatus === option.value}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="status-radio"
                                    aria-describedby={`status-desc-${option.value}`}
                                />

                                <span className="status-bulk-icon" aria-hidden="true">
                                    {option.icon}
                                </span>

                                <span id={`status-desc-${option.value}`} className="sr-only">
                                    Установить статус "{option.label}" для всех выбранных технологий
                                </span>
                            </label>
                        ))}
                    </div>
               

                <div className="bulk-actions">
                    <button
                        type="submit"
                        className="apply-button"
                        disabled={selectedCount === 0}
                        aria-disabled={selectedCount === 0}
                    >
                        Применить к {selectedCount} технологиям
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="cancel-bulk-button"
                        aria-label="Отменить массовое редактирование"
                    >
                        Отмена
                    </button>
                </div>
            </form>

            <div
                className="bulk-edit-hint"
                role="status"
                aria-live="polite"
            >
                💡 Используйте пробел для выбора технологии, стрелки для навигации
            </div>
        </div>
    );
}

export default BulkEditPanel;
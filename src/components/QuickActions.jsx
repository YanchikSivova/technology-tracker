import './QuickActions.css'
import { useState } from 'react';
import Modal from './Modal';
import DataImporter from './DataImporter';
function QuickActions({ onResetAll, onCompleteAll, technologies, onApiImport, apiLoading, onImportTechnologies }) {
    const [showExportModal, setShowExportModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const handleExport = () => {
        const exportData = {
            exportedAt: new Date().toISOString(),
            version: '1.0',
            app: 'Technology Tracker',
            totalTechnologies: technologies.length,
            completedCount: technologies.filter(tech => tech.status === 'completed').length,
            inProgressCount: technologies.filter(tech => tech.status === 'in-progress').length,
            notStartedCount: technologies.filter(tech => tech.status === 'not-started').length,
            technologies: technologies.map(tech => ({
                id: tech.id,
                title: tech.title,
                description: tech.description,
                status: tech.status,
                category: tech.category,
                notes: tech.notes,
                resources: tech.resources || [],
                isFromApi: tech.isFromApi || false,
                createdAt: tech.createdAt || new Date().toISOString()
            }))
        };

        // Валидация данных перед экспортом
        try {
            JSON.stringify(exportData); // Проверка на циклические ссылки

            const dataStr = JSON.stringify(exportData, null, 2);
            const blob = new Blob([dataStr], {
                type: 'application/json;charset=utf-8'
            });

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `technology-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            setShowExportModal(true);
        } catch (error) {
            console.error('Export error:', error);
            alert('Ошибка при экспорте данных. Проверьте корректность данных.');
        }
    };

    const handleImport = (importedTechnologies) => {
        onImportTechnologies(importedTechnologies);
        setShowImportModal(false);
    };

    return (
        <div className="quick-actions">
            {/* <h3>Быстрые действия</h3> */}
            <div className='action-buttons'>
                <button className="complete-button" onClick={onCompleteAll}>
                    Отметить все как выполненные
                </button>
                <button className="reset-button" onClick={onResetAll}>
                    Сбросить все статусы
                </button>
            </div>
            <div className='export-import-buttons'>
                <button className='export-button' onClick={handleExport}>
                    Экспорт данных
                </button>
                <button className='import-button' onClick={() => setShowImportModal(true)}>
                    Импорт данных
                </button>
                {/* Кнопка API импорта можно добавить и здесь */}
                <button
                    className={`api-button ${apiLoading ? 'loading' : ''}`}
                    onClick={onApiImport}
                    disabled={apiLoading}
                >
                    {apiLoading ? 'Импорт...' : 'Импорт из API'}
                </button>
            </div>
            <Modal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                title="Экспорт данных">
                <div className='export-modal-content'>
                    <p>Данные успешно экспортированы!</p>
                    <p>Файл был автоматически скачан в формате JSON.</p>
                    <div className='export-stats'>
                        <p><strong>Статистика экспорта: </strong></p>
                        <ul>
                            <li>Всего технологий: {technologies.length}</li>
                            <li>Выполнено: {technologies.filter(tech => tech.status === 'completed').length}</li>
                            <li>В процессе: {technologies.filter(tech => tech.status === 'in-progress').length}</li>
                            <li>Не начато: {technologies.filter(tech => tech.status === 'not-started').length}</li>
                        </ul>
                    </div>
                    <button className='modal-close-button'
                        onClick={() => setShowExportModal(false)}>
                        Закрыть
                    </button>
                </div>
            </Modal>

            <Modal
                isOpen={showImportModal}
                onClose={() => setShowImportModal(false)}
                title="Импорт данных"
                size="large"
            >
                <DataImporter
                    onImport={handleImport}
                    existingTechnologies={technologies}
                />
            </Modal>
        </div>
    );
}

export default QuickActions;
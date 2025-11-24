import './QuickActions.css'
import { useState } from 'react';
import Modal from './Modal';
function QuickActions({ onResetAll, onCompleteAll, technologies }) {
    const [showExportModal, setShowExportModal] = useState(false);
    const handleExport = () => {
        const data = {
            exportedAt: new Date().toISOString(),
            version: '1.0',
            totalTechnologies: technologies.length,
            completedCount: technologies.filter(tech => tech.status === 'completed').length,
            technologies: technologies
        };

        const dataStr = JSON.stringify(data, null, 2);

        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `technology-tracker-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setShowExportModal(true);

    }


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
                <button className='export-button' onClick={handleExport}>
                    Экспорт данных
                </button>
            </div>
            <Modal 
            isOpen={showExportModal}
            onClose={()=> setShowExportModal(false)}
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
                    onClick={()=>setShowExportModal(false)}>
                        Закрыть
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default QuickActions;
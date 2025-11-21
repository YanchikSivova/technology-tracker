import './ProgressHeader.css'

function ProgressHeader({ technologies }) {
    const completedCount = technologies.filter(technology => technology.status === 'completed').length;
    const totalCount = technologies.length;
    const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    return (
        <div className="progress-header">
            <h2>Прогресс изучения</h2>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="progress-stats">
                <p>Выполнено: {completedCount} из {totalCount}</p>
                <p>{progressPercentage}%</p>
            </div>
        </div>
    );
}

export default ProgressHeader
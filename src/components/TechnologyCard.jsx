import './TechnologyCard.css';

function TechnologyCard({ technologies, onStatusChange, onDeleteTechnology }) {

    const handleStatusClick = (id) => {
        const statusOrder = ['not-started', 'in-progress', 'completed'];
        const tech = technologies.find(t => t.id === id);
        const currentIndex = statusOrder.indexOf(tech.status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        onStatusChange(id, statusOrder[nextIndex]);
    };

    const handleDeleteClick = (id, event) => {
        event.stopPropagation();
        onDeleteTechnology(id);
    }
    return (
        <div className="technologies-list">
            <h2>Список технологий</h2>
            <ul>
                {technologies.map(technology => (
                    <li key={technology.id} className={technology.status} onClick={() => handleStatusClick(technology.id)} style={{ cursor: 'pointer' }}>
                        <span>
                            <h3>{technology.title}</h3>
                            <p className="description">{technology.description}</p>
                        </span>
                        <div className="card-controls">
                            <p className="status-icon">
                                {technology.status === 'not-started' ? '❌' : (technology.status === 'completed' ? '✅' : '⌛️')}
                            </p>
                            <button className="delete-button" onClick={(e) => handleDeleteClick(technology.id, e)} title="Удалить технологию">
                                🗑️
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TechnologyCard;
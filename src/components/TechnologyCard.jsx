function TechnologyCard(props) {
    return (
        <div className="technologies-list">
            <h2>Список технологий</h2>
            <ul>
                {props.technologies.map(technology => (
                    <li key={technology.id} className={technology.status}>
                        <span>
                            <h3>{technology.title}</h3>
                            <p className="description">{technology.description}</p>
                        </span>
                        <p className="status-icon">{technology.status === 'not-started' ? '❌' : (technology.status === 'completed' ? '✅' : '⌛️')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TechnologyCard;
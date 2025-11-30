import './Statistics.css'
function Statistics() {
    const technologiesJSON = localStorage.getItem("technologies");
    const technologies = JSON.parse(technologiesJSON);
    const completedTechnologies = technologies.filter(tech => tech.status === 'completed').length;
    const inProgressTechnologies = technologies.filter(tech => tech.status === 'in-progress').length;
    const notStartedTechnologies = technologies.filter(tech => tech.status === 'not-started').length;

    return (
        <div className="page">
            <div className="page-header">
                <h1>Статистика</h1>
            </div>
            <div className="statistics">
                <div className="statistics-status statistics-completed">
                    <h2>Завершено:</h2>
                    <p>{completedTechnologies} из {technologies.length}</p>
                </div>
                <div className="statistics-status statistics-in-progress">
                    <h2>В процессе:</h2>
                    <p>{inProgressTechnologies} из {technologies.length}</p>
                </div>
                <div className="statistics-status statistics-not-started">
                    <h2>Не начато:</h2>
                    <p>{notStartedTechnologies} из {technologies.length}</p>
                </div>
            </div>
        </div>
    );
}
export default Statistics;
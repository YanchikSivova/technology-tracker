function ProgressHeader(props){
    const completedCount = props.technologies.filter(technology=>technology.status === 'completed').length;
    const totalCount = props.technologies.length;
    const progressPercentage = totalCount > 0? Math.round((completedCount/totalCount)*100):0;
    return(
        <div className="progress-header">
            <h2>Прогресс изучения</h2>
            <div className="progress-bar">
                <div className="progress-fill" style={{width: `${progressPercentage}%`}}></div>
            </div>
            <span>{progressPercentage}%</span>
        </div>
    );
}

export default ProgressHeader
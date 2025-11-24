import './ProgressHeader.css'

function ProgressHeader({ progress, label, animated = true }) {
    
    return (
        <div className="progress-header">
            {label && <div className='progress-label'>{label}</div>}
            <div className="progress-bar">
                <div className={`progress-fill ${animated? 'animated' : ''}`} style={{ width: `${progress}%` }}>
                    <span className='progress-text'>{progress}%</span>
                </div>
            </div>
        </div>
    );
}

export default ProgressHeader;
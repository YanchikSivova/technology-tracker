import './DeadlineDisplay.css';

function DeadlineDisplay({ technology, deadline, onEdit, onRemove, status }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusInfo = (status) => {
    const statusConfig = {
      'overdue': { text: 'Просрочено', className: 'status-overdue', icon: '🔴' },
      'urgent': { text: 'Срочно', className: 'status-urgent', icon: '🟠' },
      'upcoming': { text: 'Скоро', className: 'status-upcoming', icon: '🟡' },
      'normal': { text: 'По плану', className: 'status-normal', icon: '🟢' }
    };
    return statusConfig[status] || statusConfig.normal;
  };

  const statusInfo = getStatusInfo(status);

  return (
    <div className={`deadline-display ${statusInfo.className}`}>
      <div className="deadline-info">
        <span className="deadline-icon">{statusInfo.icon}</span>
        <div className="deadline-details">
          <span className="deadline-date">
            Срок: {formatDate(deadline)}
          </span>
          <span className="deadline-status">
            {statusInfo.text}
          </span>
        </div>
      </div>
      
      <div className="deadline-actions">
        <button
          onClick={onEdit}
          className="edit-button"
          aria-label={`Изменить срок изучения для ${technology.title}`}
        >
          ✏️
        </button>
        
        <button
          onClick={onRemove}
          className="remove-button"
          aria-label={`Удалить срок изучения для ${technology.title}`}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default DeadlineDisplay;
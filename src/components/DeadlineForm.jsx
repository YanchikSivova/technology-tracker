import './DeadlineForm.css';
import { useState, useEffect } from 'react';

function DeadlineForm({ technology, onSave, onCancel, existingDeadline, error }) {
  const [deadline, setDeadline] = useState(existingDeadline || '');
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!deadline) {
      setLocalError('Пожалуйста, выберите дату');
      return;
    }

    const selectedDate = new Date(deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setLocalError('Дата не может быть в прошлом');
      return;
    }

    if (selectedDate.getFullYear() > today.getFullYear() + 5) {
      setLocalError('Срок не может превышать 5 лет');
      return;
    }

    setLocalError('');
    onSave(deadline);
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDeadline(newDate);
    
    // Валидация в реальном времени
    if (newDate) {
      const selectedDate = new Date(newDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        setLocalError('Дата не может быть в прошлом');
      } else if (selectedDate.getFullYear() > today.getFullYear() + 5) {
        setLocalError('Срок не может превышать 5 лет');
      } else {
        setLocalError('');
      }
    } else {
      setLocalError('');
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setFullYear(today.getFullYear() + 5);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="deadline-form"
      noValidate
      aria-labelledby="deadline-form-title"
    >
      <h3 id="deadline-form-title">Установить срок изучения</h3>
      
      <div className="form-group">
        
        <input
          id={`deadline-${technology.id}`}
          type="date"
          value={deadline}
          onChange={handleDateChange}
          min={getMinDate()}
          max={getMaxDate()}
          className={`date-input ${localError ? 'error' : ''}`}
          aria-required="true"
          aria-describedby={localError ? `error-${technology.id}` : undefined}
          aria-invalid={!!localError}
        />
        
        {localError && (
          <div 
            id={`error-${technology.id}`}
            className="error-message"
            role="alert"
            aria-live="polite"
          >
            ⚠️ {localError}
          </div>
        )}
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="save-button"
          disabled={!!localError}
          aria-disabled={!!localError}
        >
          Сохранить срок
        </button>
        
        <button
          type="button"
          className="cancel-button"
          onClick={onCancel}
          aria-label="Отменить установку срока"
        >
          Отмена
        </button>
      </div>
    </form>
  );
}

export default DeadlineForm;
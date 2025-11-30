// hooks/useStudyDeadlines.js
import { useState, useCallback } from 'react';

function useStudyDeadlines() {
  const [deadlines, setDeadlines] = useState({});
  const [errors, setErrors] = useState({});

  const validateDeadline = (techId, deadlineDate) => {
    const newErrors = { ...errors };
    
    if (!deadlineDate) {
      newErrors[techId] = 'Дата обязательна для заполнения';
    } else {
      const selectedDate = new Date(deadlineDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors[techId] = 'Дата не может быть в прошлом';
      } else if (selectedDate.getFullYear() > today.getFullYear() + 5) {
        newErrors[techId] = 'Срок не может превышать 5 лет';
      } else {
        delete newErrors[techId];
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const setDeadline = useCallback((techId, deadlineDate) => {
    if (validateDeadline(techId, deadlineDate)) {
      setDeadlines(prev => ({
        ...prev,
        [techId]: deadlineDate
      }));
      return true;
    }
    return false;
  }, [errors]);

  const removeDeadline = useCallback((techId) => {
    setDeadlines(prev => {
      const newDeadlines = { ...prev };
      delete newDeadlines[techId];
      return newDeadlines;
    });
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[techId];
      return newErrors;
    });
  }, []);

  const getDeadlineStatus = (techId) => {
    const deadline = deadlines[techId];
    if (!deadline) return 'not-set';
    
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 0) return 'overdue';
    if (daysDiff <= 7) return 'urgent';
    if (daysDiff <= 30) return 'upcoming';
    return 'normal';
  };

  return {
    deadlines,
    errors,
    setDeadline,
    removeDeadline,
    getDeadlineStatus,
    validateDeadline
  };
}

export default useStudyDeadlines;
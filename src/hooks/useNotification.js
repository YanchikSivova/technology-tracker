
import { useCallback, useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';

export const useNotification = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }

  const { addNotification, removeNotification, clearAll } = context;

  const success = useCallback((message, duration = 6000, actions = []) => {
    return addNotification(message, 'success', duration, actions);
  }, [addNotification]);

  const error = useCallback((message, duration = 6000, actions = []) => {
    return addNotification(message, 'error', duration, actions);
  }, [addNotification]);

  const warning = useCallback((message, duration = 6000, actions = []) => {
    return addNotification(message, 'warning', duration, actions);
  }, [addNotification]);

  const info = useCallback((message, duration = 6000, actions = []) => {
    return addNotification(message, 'info', duration, actions);
  }, [addNotification]);

  return {
    success,
    error,
    warning,
    info,
    removeNotification,
    clearAll
  };
};
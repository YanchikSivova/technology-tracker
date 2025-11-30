import { useState, useCallback } from 'react';

function useBulkEdit() {
  const [selectedTechs, setSelectedTechs] = useState(new Set());
  const [isBulkEditing, setIsBulkEditing] = useState(false);

  const toggleSelection = useCallback((techId) => {
    setSelectedTechs(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(techId)) {
        newSelection.delete(techId);
      } else {
        newSelection.add(techId);
      }
      return newSelection;
    });
  }, []);

  const selectAll = useCallback((techIds) => {
    setSelectedTechs(new Set(techIds));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedTechs(new Set());
  }, []);

  const startBulkEdit = useCallback(() => {
    setIsBulkEditing(true);
  }, []);

  const cancelBulkEdit = useCallback(() => {
    setIsBulkEditing(false);
    clearSelection();
  }, [clearSelection]);

  const applyBulkStatus = useCallback((newStatus, onStatusChange) => {
    selectedTechs.forEach(techId => {
      onStatusChange(techId, newStatus);
    });
    cancelBulkEdit();
  }, [selectedTechs, cancelBulkEdit]);

  return {
    selectedTechs,
    isBulkEditing,
    toggleSelection,
    selectAll,
    clearSelection,
    startBulkEdit,
    cancelBulkEdit,
    applyBulkStatus
  };
}

export default useBulkEdit;
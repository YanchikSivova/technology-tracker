// import './DataImporter.css';
import { useState, useRef } from 'react';
import { validateImportData, sanitizeTechnology } from '../utils/dataValidation';

function DataImporter({ onImport, existingTechnologies }) {
  const [importStatus, setImportStatus] = useState({ type: '', message: '' });
  const [validationResult, setValidationResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImportStatus({ type: 'loading', message: 'Проверка файла...' });
    setValidationResult(null);

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const result = validateImportData(data);
        
        setValidationResult(result);
        
        if (result.isValid) {
          setImportStatus({ 
            type: 'success', 
            message: `Файл проверен. Найдено ${result.stats.total} технологий. Готово к импорту.` 
          });
        } else {
          setImportStatus({ 
            type: 'error', 
            message: `Обнаружены ошибки в файле: ${result.errors.length} ошибок, ${result.warnings.length} предупреждений` 
          });
        }
      } catch (error) {
        setImportStatus({ 
          type: 'error', 
          message: 'Ошибка чтения файла. Убедитесь, что файл в формате JSON.' 
        });
        setValidationResult(null);
      }
    };
    
    reader.onerror = () => {
      setImportStatus({ 
        type: 'error', 
        message: 'Ошибка чтения файла.' 
      });
    };
    
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (!validationResult || !validationResult.isValid) return;

    const file = fileInputRef.current.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const importedTechs = data.technologies.map(tech => {
          const sanitized = sanitizeTechnology(tech);
          
          // Проверяем дубликаты по названию
          const isDuplicate = existingTechnologies.some(
            existing => existing.title.toLowerCase() === sanitized.title.toLowerCase()
          );
          
          return {
            ...sanitized,
            isFromApi: false,
            isImported: true,
            isDuplicate
          };
        });

        const uniqueTechs = importedTechs.filter(tech => !tech.isDuplicate);
        const duplicates = importedTechs.filter(tech => tech.isDuplicate);

        onImport(uniqueTechs);
        
        setImportStatus({ 
          type: 'success', 
          message: `Успешно импортировано ${uniqueTechs.length} технологий. ${duplicates.length} дубликатов пропущено.` 
        });
        
        setValidationResult(null);
        fileInputRef.current.value = '';
        
      } catch (error) {
        setImportStatus({ 
          type: 'error', 
          message: 'Ошибка при импорте данных.' 
        });
      }
    };
    
    reader.readAsText(file);
  };

  const resetImport = () => {
    setImportStatus({ type: '', message: '' });
    setValidationResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="data-importer">
      <h3>📤 Импорт данных</h3>
      
      <div className="import-controls">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".json"
          className="file-input"
          id="import-file"
          aria-describedby="import-help"
        />
        <label htmlFor="import-file" className="file-label">
          Выберите JSON файл
        </label>
        
        <button
          onClick={handleImport}
          disabled={!validationResult || !validationResult.isValid}
          className="import-button"
          aria-disabled={!validationResult || !validationResult.isValid}
        >
          Импортировать
        </button>
        
        <button
          onClick={resetImport}
          className="reset-import-button"
          aria-label="Сбросить импорт"
        >
          Сбросить
        </button>
      </div>

      {importStatus.message && (
        <div 
          className={`import-status ${importStatus.type}`}
          role={importStatus.type === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {importStatus.type === 'loading' && '⏳'}
          {importStatus.type === 'success' && '✅'}
          {importStatus.type === 'error' && '❌'}
          {importStatus.message}
        </div>
      )}

      {validationResult && (
        <div className="validation-results">
          <h4>Результаты проверки:</h4>
          
          {validationResult.warnings.length > 0 && (
            <div className="validation-warnings">
              <strong>Предупреждения ({validationResult.warnings.length}):</strong>
              <ul>
                {validationResult.warnings.map((warning, index) => (
                  <li key={index}>⚠️ {warning}</li>
                ))}
              </ul>
            </div>
          )}
          
          {validationResult.errors.length > 0 && (
            <div className="validation-errors">
              <strong>Ошибки ({validationResult.errors.length}):</strong>
              <ul>
                {validationResult.errors.map((error, index) => (
                  <li key={index}>❌ {error}</li>
                ))}
              </ul>
            </div>
          )}
          
          {validationResult.isValid && (
            <div className="validation-success">
              ✅ Файл прошел проверку. Технологий: {validationResult.stats.total}
            </div>
          )}
        </div>
      )}

      <div id="import-help" className="import-help">
        <p>💡 Поддерживаемый формат: JSON файл, экспортированный из этого приложения</p>
        <p>💡 Максимальный размер файла: 5MB</p>
      </div>
    </div>
  );
}

export default DataImporter;
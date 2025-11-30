export const validateTechnology = (tech) => {
  const errors = [];

   if (tech.id && (typeof tech.id !== 'string' && typeof tech.id !== 'number')) {
    errors.push('Некорректный ID технологии');
  }

  if (!tech.title || typeof tech.title !== 'string' || tech.title.trim().length === 0) {
    errors.push('Название технологии обязательно');
  }

  if (tech.description && typeof tech.description !== 'string') {
    errors.push('Описание должно быть строкой');
  }

  if (!tech.status || !['not-started', 'in-progress', 'completed'].includes(tech.status)) {
    errors.push('Некорректный статус технологии');
  }

  if (tech.category && typeof tech.category !== 'string') {
    errors.push('Категория должна быть строкой');
  }

  if (tech.notes && typeof tech.notes !== 'string') {
    errors.push('Заметки должны быть строкой');
  }

  return errors;
};

export const validateImportData = (data) => {
  const errors = [];
  const warnings = [];

  if (!data) {
    errors.push('Файл пустой или содержит некорректные данные');
    return { isValid: false, errors, warnings };
  }

  if (typeof data !== 'object') {
    errors.push('Данные должны быть объектом');
    return { isValid: false, errors, warnings };
  }

  // Проверяем обязательные поля структуры
  if (!data.technologies || !Array.isArray(data.technologies)) {
    errors.push('Отсутствует или некорректный массив technologies');
    return { isValid: false, errors, warnings };
  }

  if (data.exportedAt && isNaN(Date.parse(data.exportedAt))) {
    warnings.push('Некорректная дата экспорта');
  }

  if (data.version && data.version !== '1.0') {
    warnings.push(`Версия файла (${data.version}) может быть несовместима`);
  }

  // Валидируем каждую технологию
  data.technologies.forEach((tech, index) => {
    const techErrors = validateTechnology(tech);
    if (techErrors.length > 0) {
      errors.push(`Технология ${index + 1} (${tech.title || 'без названия'}): ${techErrors.join(', ')}`);
    }
  });

  if (data.technologies.length === 0) {
    warnings.push('Файл не содержит технологий для импорта');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    stats: {
      total: data.technologies.length,
      valid: data.technologies.length - errors.length
    }
  };
};

export const sanitizeTechnology = (tech) => {
  // Всегда генерируем новый ID для импортируемых технологий
  const newId = Date.now() + Math.random();
  
  return {
    id: newId,
    title: String(tech.title || 'Без названия').trim(),
    description: String(tech.description || '').trim(),
    status: ['not-started', 'in-progress', 'completed'].includes(tech.status) ? tech.status : 'not-started',
    category: String(tech.category || 'other').trim(),
    notes: String(tech.notes || '').trim(),
    isFromApi: Boolean(tech.isFromApi),
    resources: Array.isArray(tech.resources) ? tech.resources : [],
    createdAt: tech.createdAt || new Date().toISOString()
  };
};
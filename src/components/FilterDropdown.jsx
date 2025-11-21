import './FilterDropdown.css'

function FilterDropdown({currentFilter, onFilterChange}){
    const filters = [
        {value: 'all', label:"Все технологии"},
        {value: 'not-started', label:"Не начатые"},
        {value: 'in-progress', label:"В процессе"},
        {value: 'completed', label:"Выполненные"}
    ];

    return(
        <div className="filter-dropdown">
            <label htmlFor="status-filter" className="filter-label">
                Фильтр
            </label>
            <select id="status-filer" value={currentFilter} onChange={(e) => onFilterChange(e.target.value)}className="filter-select">
                {filters.map(filter =>(<option key={filter.value} value={filter.value}>
                    {filter.label}
                </option>
            ))}
            </select>
        </div>
    );
}

export default FilterDropdown;
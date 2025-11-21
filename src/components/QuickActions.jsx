import './QuickActions.css'

function QuickActions({ onResetAll, onCompleteAll}){
    return (
        <div className="quick-actions">
            <button className="complete-button" onClick={onCompleteAll}>
                Отметить все как выполненные
            </button>
            <button className="reset-button" onClick={onResetAll}>
                Сбросить все статусы
            </button>
        </div>
   );
}

export default QuickActions;
function Modal({isOpen, onClose, title, children}){
    if(!isOpen) return null;

    return(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="modal-close" onClick={onClose}
                    style={{width:'24px', color:'#e74c3c', textAlign: 'center',background:'none', padding:'0', fontSize:'24px' }}>
                        ×
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddTechnology.css'


function AddTechnology(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category:'frontend'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const saved = localStorage.getItem('technologies');
        const technologies = saved? JSON.parse(saved) : [];

        const maxId = technologies.length > 0?
        Math.max(...technologies.map(tech => tech.id))
        : 0;

        const newTechnology = {
            id: maxId + 1,
            title: formData.title,
            description: formData.decsription,
            category: formData.category,
            status: 'not-started',
            notes: ''
        };

        technologies.push(newTechnology);
        localStorage.setItem('technologies', JSON.stringify(technologies));

        navigate('/technologies');

    };
    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    return(
        <div className="page">
            <div className="page-header">
                <h1>Добавить технологию</h1>
            </div>

            <form onSubmit={handleSubmit} className="technology-form">
                
                <div className="form-group">
                    <label htmlFor="title">Название технологии *</label>
                    <input 
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Введите название технологии..."/>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Описание *</label>
                    <textarea 
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="2"
                    placeholder="Опишите, что нужно изучить..."/>
                </div>

                <div className="form-group">
                    <label htmlFor="category">Категория</label>
                    <select 
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="database">Базы данных</option>
                        <option value="devops">DevOps</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-ptimary">
                        Добавить технологию
                    </button>
                    <button type="button" onClick={()=> navigate('/technologies')} className="btn btn-secondary">
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTechnology;
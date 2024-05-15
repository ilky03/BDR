import { useRef } from 'react';
import useDB from '../../services/useDB';

import './form.scss';

function Form({isFormOpen, handleChangeFormStatus}) {

    const { create, generateID } = useDB();
    const formRef = useRef(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleChangeFormStatus();
        let formData = new FormData(formRef.current);
        let data = Object.fromEntries(formData.entries());
        create(`/wishlist/${Date.now()}`, data);
    }

    const FormFilling = () => {
        return (
                isFormOpen ?
                <div className="popup__bg">
                    <form className="form popup__window" onSubmit={handleFormSubmit} ref={formRef}>
                        <h2>Додавання нового бажання</h2>
                        <input type="hidden" name="id" value={generateID()}></input>
                        <div className='form__field'>
                            <label htmlFor="title">Уведіть назву</label>
                            <input id="title" type="text" name="title"/>
                        </div>
                        <div className='form__field'>
                            <label htmlFor="link">Уведіть посилання</label>
                            <input id="link" type="text" name="link"/>
                        </div>
                        <div className='form__field'>
                            <label htmlFor="sum">Уведіть бажану суму</label>
                            <input id="sum" type="number" name="sum"/>  
                        </div>
                        <div className='form__field'>
                            <label htmlFor="done">Уведіть зібрану суму</label>
                            <input id="done" type="number" name="done"/>
                        </div>
                        <button type="submit" className='btn'>Додати</button>
                        <button 
                            className='btn'
                            onClick={handleChangeFormStatus}>Скасувати</button>
                    </form>
                </div> : null
        )
    }

    return (
        <FormFilling />
    )
}

export default Form;
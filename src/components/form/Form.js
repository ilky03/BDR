import { useRef } from 'react';
import useDB from '../../services/useDB';

import './form.scss';

function Form({isFormOpen, handleChangeFormStatus}) {

    const { create } = useDB();
    const formRef = useRef(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleChangeFormStatus();
        let formData = new FormData(formRef.current);
        let data = Object.fromEntries(formData.entries());
        create(`/wishlist/${Math.random()}`, data);
    }

    const FormFilling = () => {
        return (
                isFormOpen ?
                <div className="form-container">
                    <form className="form" onSubmit={handleFormSubmit} ref={formRef}>
                        <label htmlFor="title">Уведіть назву</label>
                        <input id="title" type="text" name="title"/>
                        <label htmlFor="link">Уведіть посилання</label>
                        <input id="link" type="text" name="link"/>
                        <label htmlFor="sum">Уведіть бажану суму</label>
                        <input id="sum" type="number" name="sum"/>
                        <label htmlFor="done">Уведіть зібрану суму</label>
                        <input id="done" type="number" name="done"/>
                        <input type="submit" />
                        <button 
                            className='cancel-btn'
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
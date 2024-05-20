import { useRef, useEffect, useState } from 'react';
import useDB from '../../services/useDB';

import './form.scss';

function Form({ isFormOpen, handleChangeFormStatus, mode = 'add', initialData = {} }) {
    const { create, update } = useDB();
    const formRef = useRef(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let id = mode === 'add' ? Date.now() : initialData.id;
        let formData = new FormData(formRef.current);
        formData.set('id', id);
        let data = Object.fromEntries(formData.entries());
        console.log(data);
        if (mode === 'add') {
            create(`/wishlist/${id}`, data).then(()=>handleChangeFormStatus());
        } else {
            update(`/wishlist/${id}`, {'id': id, done: +data.addSum + +initialData.done}).then(()=>handleChangeFormStatus());
        }
    };

    useEffect(() => {
        if (isFormOpen) {
            document.body.classList.add('body-no-scroll');
        } else {
            document.body.classList.remove('body-no-scroll');
        }

        return () => {
            document.body.classList.remove('body-no-scroll');
        };
    }, [isFormOpen]);

    const FormFilling = () => {
        return (
            isFormOpen ?
                <div className="popup__bg">
                    <form className="form popup__window" onSubmit={handleFormSubmit} ref={formRef}>
                        <h2>{mode === 'add' ? 'Додавання нового бажання' : 'Редагування бажання'}</h2>
                        {mode === 'add' && (
                            <>
                                <div className='form__field'>
                                    <label htmlFor="title">Уведіть назву</label>
                                    <input id="title" type="text" name="title" required/>
                                </div>
                                <div className='form__field'>
                                    <label htmlFor="link">Уведіть посилання</label>
                                    <input id="link" type="text" name="link" required/>
                                </div>
                                <div className='form__field'>
                                    <label htmlFor="sum">Уведіть бажану суму</label>
                                    <input id="sum" type="number" name="sum" required/>
                                </div>
                                <div className='form__field'>
                                    <label htmlFor="done">Уведіть зібрану суму</label>
                                    <input id="done" type="number" name="done" required/>
                                </div>
                            </>
                        )}
                        {mode === 'edit' && (
                            <>
                                <h6>Зібрана сума: {initialData.done}</h6>
                                <h6>Необхідна сума: {initialData.sum}</h6>
                                <div className='form__field'>
                                    <label htmlFor="addSum">Додати до зібраної суми</label>
                                    <input id="addSum" type="number" name="addSum" required/>
                                </div>
                            </>
                        )}
                        <button type="submit" className='btn'>Додати</button>
                        <button 
                            type="button" 
                            className='btn' 
                            onClick={handleChangeFormStatus}>Скасувати</button>
                    </form>
                </div> : null
        );
    };

    return <FormFilling />;
}

export default Form;

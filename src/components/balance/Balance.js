import { useRef, useState } from 'react';
import useDB from '../../services/useDB';

import './balance.scss';

function Balance({ handleChangeBalance, userBalance }) {
    const { create, generateID } = useDB();
    const [operationType, setOperationType] = useState('');
    const formRef = useRef(null);
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const TodaysDate = formatDate(new Date());
        let formData = new FormData(formRef.current);
        formData.set('operationType', operationType);
        formData.set('date', TodaysDate);
        let data = Object.fromEntries(formData.entries());
        handleChangeBalance(+data.value, operationType);
        create(`/transaction/${Date.now()}`, data);

        formRef.current.reset();
    }
    
    return (
        <section className="container balance">
            <div className="container__header">
                <h2>Поточний баланс</h2>
            </div>
            <p className="balance__info">{userBalance}₴</p>
            <form onSubmit={handleFormSubmit} ref={formRef}>
                <input className="balance-input" name="value" type="number" placeholder='Уведіть суму' required/>
                <input type="hidden" name="id" value={generateID()}></input>
                <div className="category">
                    <input id="category1" type="radio" name="category" value="Продукти" required/>
                    <label htmlFor="category1" className="radio-btn">Продукти</label>

                    <input id="category2" type="radio" name="category" value="Зарплата" required/>
                    <label htmlFor="category2" className="radio-btn">Зарплата</label>

                    <input id="category3" type="radio" name="category" value="Авто" required/>
                    <label htmlFor="category3" className="radio-btn">Авто</label>

                    <input id="category4" type="radio" name="category" value="Комуналка" required/>
                    <label htmlFor="category4" className="radio-btn">Комуналка</label>

                    <input id="category5" type="radio" name="category" value="Побутова техніка" required/>
                    <label htmlFor="category5" className="radio-btn">Побутова техніка</label>

                    <input id="category6" type="radio" name="category" value="Ремонт" required/>
                    <label htmlFor="category6" className="radio-btn">Ремонт</label>

                    <input id="category7" type="radio" name="category" value="Одяг та взуття" required/>
                    <label htmlFor="category7" className="radio-btn">Одяг та взуття</label>

                    <input id="category8" type="radio" name="category" value="Інше" required/>
                    <label htmlFor="category8" className="radio-btn">Інше</label>
                </div>

                <input type="hidden" name="operationType" value="" />
                <button 
                    className="balance__button balance__button_income"
                    onClick={() => setOperationType('income')}
                >
                    Дохід
                </button>
                <button 
                    className="balance__button balance__button_spending"
                    onClick={() => setOperationType('spending')}
                >
                    Витрати
                </button>
            </form>
        </section>
    )
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}


export default Balance;


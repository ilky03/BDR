import { useRef, useState } from 'react';
import useDB from '../../services/useDB';

import './balance.scss';

function Balance({ handleChangeBalance, userBalance }) {
    const { create, generateID } = useDB();
    const [operationType, setOperationType] = useState('');
    const formRef = useRef(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(formRef.current);
        formData.set('operationType', operationType);
        let data = Object.fromEntries(formData.entries());
        handleChangeBalance(+data.value, operationType);
        create(`/transaction/${Date.now()}`, data);
    }

    return (
        <section className="container balance">
            <div className="container__header">
                <h2>Поточний баланс</h2>
                <button>Редагувати</button>
            </div>
            <p className="balance__info">{userBalance}₴</p>
            <form onSubmit={handleFormSubmit} ref={formRef}>
                <input className="balance-input" name="value" type="number" placeholder='Уведіть суму' required/>
                <input type="hidden" name="id" value={generateID()}></input>
                <div className="category">
                    <input id="category1" type="radio" name="category" value="Продукти харчування" required/>
                    <label htmlFor="category1" className="radio-btn">Продукти харчування</label>

                    <input id="category2" type="radio" name="category" value="Заробітня плата" required/>
                    <label htmlFor="category2" className="radio-btn">Заробітня плата</label>

                    <input id="category3" type="radio" name="category" value="Авто" required/>
                    <label htmlFor="category3" className="radio-btn">Авто</label>

                    <input id="category4" type="radio" name="category" value="Комунальні платежі" required/>
                    <label htmlFor="category4" className="radio-btn">Комунальні платежі</label>

                    <input id="category5" type="radio" name="category" value="Фінансові операції" required/>
                    <label htmlFor="category5" className="radio-btn">Фінансові операції</label>

                    <input id="category6" type="radio" name="category" value="Інше" required/>
                    <label htmlFor="category6" className="radio-btn">Інше</label>
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

export default Balance;

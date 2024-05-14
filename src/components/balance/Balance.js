import { useRef } from 'react';
import useDB from '../../services/useDB';

import './balance.scss';

function Balance({ handleChangeBalance, userBalance }) {
    const { create } = useDB();
    const formRef = useRef(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(formRef.current);
        let data = Object.fromEntries(formData.entries());
        handleChangeBalance(+data.value);
        create(`/transaction/${Math.random()}`, data);
    }

    return (
        <section className="container balance">
            <div className="container__header">
                <h2>Поточний баланс</h2>
                <button>Редагувати</button>
            </div>
            <p className="balance__info">{userBalance}₴</p>
            <form onSubmit={handleFormSubmit} ref={formRef}>
                <input className="balance-input" name="value" type="number" placeholder='Уведіть суму'/>

                <div className="category">
                    <input id="category1" type="radio" name="category" value="Продукти харчування"/>
                    <label htmlFor="category1" className="radio-btn">Продукти харчування</label>

                    <input id="category2" type="radio" name="category" value="Заробітня плата"/>
                    <label htmlFor="category2" className="radio-btn">Заробітня плата</label>

                    <input id="category3" type="radio" name="category" value="Авто"/>
                    <label htmlFor="category3" className="radio-btn">Авто</label>

                    <input id="category4" type="radio" name="category" value="Комунальні платежі"/>
                    <label htmlFor="category4" className="radio-btn">Комунальні платежі</label>

                    <input id="category5" type="radio" name="category" value="Фінансові операції"/>
                    <label htmlFor="category5" className="radio-btn">Фінансові операції</label>

                    <input id="category6" type="radio" name="category" value="Інше"/>
                    <label htmlFor="category6" className="radio-btn">Інше</label>
                </div>

                <button
                    className="balance__button balance__button_income">Дохід</button>
                <button className="balance__button balance__button_spending">Витрати</button>

            </form>
        </section>
    )
}

export default Balance;

import './transaction.scss';

import shopCartIcon from '../../resources/img/icons/shopping-cart.svg';
import salaryIcon from '../../resources/img/icons/money.svg';
import carIcon from '../../resources/img/icons/car.svg';
import paymentsIcon from '../../resources/img/icons/payments.svg';

function Transaction() {
    return (
        <section className="container transaction">
            <div className="container__header">
                <h2>Нещодавні транзакції</h2>
                <button>Переглянути усі</button>
            </div>
            <div className="transaction__block">
                <span className="transaction__icon"><img src={shopCartIcon} alt="food icon" /></span>
                <p>Продукти харчування</p>
                <p className="transaction__info_spending">-120₴</p>
            </div>

            <div className="transaction__block">
                <span className="transaction__icon"><img src={salaryIcon} alt="salary icon" /></span>
                <p>Заробітня плата</p>
                <p className="transaction__info_income">+8200₴</p>
            </div>

            <div className="transaction__block">
                <span className="transaction__icon"><img src={carIcon} alt="food icon" /></span>
                <p>Авто</p>
                <p className="transaction__info_spending">-1200₴</p>
            </div>

            <div className="transaction__block">
                <span className="transaction__icon"><img src={paymentsIcon} alt="food icon" /></span>
                <p>Комунальні платежі</p>
                <p className="transaction__info_spending">-1710₴</p>
            </div>
        </section>
    )
}

export default Transaction;
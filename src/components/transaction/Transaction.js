import shopCartIcon from '../../resources/img/icons/shopping-cart.svg';
import salaryIcon from '../../resources/img/icons/money.svg';
import carIcon from '../../resources/img/icons/car.svg';
import paymentsIcon from '../../resources/img/icons/payments.svg';

function Transaction({category, value, operationType}) {
    const TransactionBody = () => {
        if (operationType === 'income') {
            return (
                <>
                    <span className="transaction__icon"><img src={shopCartIcon} alt="food icon" /></span>
                    <p>{category}</p>
                    <p className="transaction__info_income">+{value}₴</p>
                </>
            )
        } else {
            return (
                <>
                    <span className="transaction__icon"><img src={shopCartIcon} alt="food icon" /></span>
                    <p>{category}</p>
                    <p className="transaction__info_spending">-{value}₴</p>
                </>
            )
        }
    }
    return (
        <div className="transaction__block">
            <TransactionBody />
        </div>
    )
}

export default Transaction;
import shopCartIcon from '../../resources/img/icons/shopping-cart.svg';
import salaryIcon from '../../resources/img/icons/money.svg';
import carIcon from '../../resources/img/icons/car.svg';
import paymentsIcon from '../../resources/img/icons/payments.svg';
import repairIcon from '../../resources/img/icons/repair.svg';
import techniqueIcon from '../../resources/img/icons/technique.svg'
import clothesIcon from '../../resources/img/icons/tshirt.svg'
import otherIcon from '../../resources/img/icons/dots.svg'

function Transaction({category, value, operationType, date}) {
    let iconUrl;
    let iconDescr;
    switch(category) {
        case 'Продукти':
            iconUrl = shopCartIcon;
            iconDescr = 'shop cart';
            break;
        case 'Зарплата':
            iconUrl = salaryIcon;
            iconDescr = 'money';
            break;
        case 'Авто':
            iconUrl = carIcon;
            iconDescr = 'car';
            break;     
        case 'Комуналка':
            iconUrl = paymentsIcon;
            iconDescr = 'utilities'
            break;      
        case 'Побутова техніка':
            iconUrl = techniqueIcon;
            iconDescr = 'technique';
            break;
        case 'Ремонт':
            iconUrl = repairIcon;
            iconDescr = 'repair'
            break;
        case 'Одяг та взуття':
            iconUrl = clothesIcon;
            iconDescr = 'clothes'
            break;
        default:
            iconUrl = otherIcon;
            iconDescr = 'dots'
            break;
    }
    const TransactionBody = () => {
        if (operationType === 'income') {
            return (
                <>
                    <p className='transaction__date'>{date}</p>
                    <span className="transaction__icon"><img src={iconUrl} alt={iconDescr} /></span>
                    <p>{category}</p>
                    <p className="transaction__info_income">+{value}₴</p>
                </>
            )
        } else {
            return (
                <>
                    <p className='transaction__date'>{date}</p>
                    <span className="transaction__icon"><img src={iconUrl} alt={iconDescr} /></span>
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
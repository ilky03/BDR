import { useEffect, useState } from 'react';

import Transaction from '../transaction/Transaction';
import './transactions.scss';

function Transactions({transactionData}) {

    const [isWindowOpen, setIsWindowOpen] = useState(false);

    useEffect(() => {
        if (isWindowOpen) {
            document.body.classList.add('body-no-scroll');
        } else {
            document.body.classList.remove('body-no-scroll');
        }
    
        return () => {
            document.body.classList.remove('body-no-scroll');
        };
    }, [isWindowOpen]);

    const PopupTransaction = () => {
        return (
            <div className='popup__bg popup__transaction'>
                <div className='popup__window'>
                    <h2>Усі транзакції</h2>
                    {transactionData && transactionData.map((transact) => (
                    <Transaction 
                        key={transact.id}
                        category={transact.category}
                        value={transact.value}
                        operationType={transact.operationType}
                        date={transact.date}
                    />
                ))}
                <button className="btn" onClick={() => setIsWindowOpen(false)}>Закрити</button>
                </div>
                
            </div>
        )
    }
    return (
        <section className="container transaction">
            <div className="container__header">
                <h2>Нещодавні транзакції</h2>
                <button onClick={() => setIsWindowOpen(true)}>Переглянути усі</button>
            </div>
            {transactionData && transactionData.slice(0, 9).map((transact) => { 
            return (
                <Transaction 
                    key={transact.id}
                    category={transact.category}
                    value={transact.value}
                    operationType={transact.operationType}
                    date={transact.date}
                />
            )})}

            {isWindowOpen ? <PopupTransaction /> : null}
            
        </section>
    )
}

export default Transactions;
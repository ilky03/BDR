import { useEffect, useState } from 'react';

import useDB from '../../services/useDB';

import Transaction from '../transaction/Transaction';
import './transactions.scss';

function Transactions({dbUpdateCheck}) {

    const {makeQuery} = useDB();
    const [transactionData, setTransactionData] = useState();
    const [isWindowOpen, setIsWindowOpen] = useState(false);
    useEffect(() => {
        makeQuery('/transaction/').then((data) => {setTransactionData(data.reverse())});
    }, [dbUpdateCheck]);

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
            {transactionData && transactionData.slice(0, 10).map((transact) => (
                <Transaction 
                    key={transact.id}
                    category={transact.category}
                    value={transact.value}
                    operationType={transact.operationType}
                />
            ))}

            {isWindowOpen ? <PopupTransaction /> : null}
            
        </section>
    )
}

export default Transactions;
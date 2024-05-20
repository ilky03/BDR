import useDB from '../../services/useDB';
import { useState, useEffect } from 'react';


import Balance from '../balance/Balance';
import Quotes from '../quotes/Quotes';
import Transactions from '../transactions/Transactions';
import Wishlist from '../wishlist/Wishlist';
import Statistics from '../statistics/Statistics';
import Form from '../form/Form';

import './mainPage.scss';

function MainPage() {
    const url = '/';
    const [userData, setUserData] = useState();
    const [dbUpdateChecker, setDbUpdateChecker] = useState(false);
    const {get, update} = useDB();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [initialWishData, setInitialWishData] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const {makeQuery} = useDB();
    const [transactionData, setTransactionData] = useState();

    useEffect(() => {
        get(url).then(data => setUserData(data));
        makeQuery('/transaction/').then((data) => {setTransactionData(data.reverse())});
    }, [dbUpdateChecker]);

    const onChangeBalance = (newVal, operationType) => {
        update(url, {balance: operationType === 'income' ? +userData.balance + newVal : +userData.balance - newVal});
        setDbUpdateChecker(!dbUpdateChecker);
    }

    const onChangeFormStatus = () => {
        setIsFormOpen(!isFormOpen);
        setEditMode(false);
    }

    const onEditWish = (initialData) => {
        onChangeFormStatus();
        setInitialWishData(initialData);
        setEditMode(true);
    }

    return (
        <>
            <header className="header__main">
                <h1>З поверненням, {userData && userData.name}!</h1>
            </header>

            <main className="wrapper">
                <Balance 
                    handleChangeBalance={onChangeBalance}
                    userBalance={userData && userData.balance}/>
                <Quotes />
                <Transactions 
                    transactionData={transactionData}/>
                <Wishlist 
                    isChangedWishlist={isFormOpen}
                    handleAddNewWish={onChangeFormStatus}
                    handleEditWish={onEditWish}/>
                <Statistics 
                    transactionData={transactionData}/>
                <Form 
                    isFormOpen={isFormOpen}
                    handleChangeFormStatus={onChangeFormStatus}
                    mode={editMode ? 'edit' : 'add'}
                    initialData={initialWishData}
                     />
            </main>
        </>

    )
}

export default MainPage;
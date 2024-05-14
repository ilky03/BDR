import useDB from '../../services/useDB';
import { useState, useEffect } from 'react';


import Balance from '../balance/Balance';
import Quotes from '../quotes/Quotes';
import Transaction from '../transaction/Transaction';
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

    useEffect(() => {
        get(url).then(data => setUserData(data));
    }, [dbUpdateChecker]);

    const onChangeBalance = (newVal) => {
        update(url, {balance: +userData.balance + newVal});
        setDbUpdateChecker(!dbUpdateChecker);
    }

    const onChangeFormStatus = () => {
        setIsFormOpen(!isFormOpen);
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
                <Transaction />
                <Wishlist 
                    isChangedWishlist={isFormOpen}
                    handleAddNewWish={onChangeFormStatus}/>
                <Statistics />
                <Form 
                    isFormOpen={isFormOpen}
                    handleChangeFormStatus={onChangeFormStatus}/>
            </main>
        </>

    )
}

export default MainPage;
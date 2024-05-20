import { useState, useEffect } from 'react';

import useDB from '../../services/useDB';

import Statistics from '../statistics/Statistics';

function StatisticsPage() {
    const { makeQuery } = useDB();
    
    const [transactionData, setTransactionData] = useState();

    useEffect(() => {
        makeQuery('/transaction/').then((data) => {setTransactionData(data.reverse())});
    }, []);

    return (
        <Statistics 
            transactionData={transactionData}
            flag={true} />
    )
}

export default StatisticsPage;
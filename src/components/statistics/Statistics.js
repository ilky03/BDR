import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Doughnut, Scatter, Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    RadialLinearScale,
} from 'chart.js';
import './statistics.scss';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    RadialLinearScale
);

function Statistics({ transactionData, flag = false }) {
    const [startDate, setStartDate] = useState('01.04.24');
    const [endDate, setEndDate] = useState('20.05.24');
    const [dateForInput, setDateForInput] = useState({
        start: '2024-04-01',
        end: '2024-05-20',
    });
    const [dateRange, setDateRange] = useState([]);

    useEffect(generateDateRange, [startDate, endDate]);

    const categories = [
        'Продукти',
        'Авто',
        'Комуналка',
        'Побутова техніка',
        'Ремонт',
        'Одяг та взуття',
        'Інше',
    ];

    const dataMap = new Map(categories.map((category) => [category, 0]));
    const prevMonthDataMap = new Map(categories.map((category) => [category, 0]));
    const filteredDataMap = new Map(categories.map((category) => [category, 0]));
    
    let monthlyIncome = new Array(12).fill(0);
    let monthlySpending = new Array(12).fill(0);

    function generateDateRange() {
        let startDateArr = startDate.split('.');
        let endDateArr = endDate.split('.');
        let tempArr = [];

        let startDay = +startDateArr[0];
        let startMonth = +startDateArr[1];
        let startYear = +startDateArr[2];

        let endDay = +endDateArr[0];
        let endMonth = +endDateArr[1];
        let endYear = +endDateArr[2];

        let startDateObject = new Date(`20${startYear}-${startMonth}-${startDay}`);
        let endDateObject = new Date(`20${endYear}-${endMonth}-${endDay}`);

        while (startDateObject <= endDateObject) {
            let day = startDateObject.getDate();
            let month = startDateObject.getMonth() + 1;
            let year = startDateObject.getFullYear().toString().slice(-2);

            let formattedDay = day < 10 ? `0${day}` : day;
            let formattedMonth = month < 10 ? `0${month}` : month;

            tempArr.push(`${formattedDay}.${formattedMonth}.${year}`);

            startDateObject.setDate(startDateObject.getDate() + 1);
        }

        setDateRange(tempArr);
    }

    transactionData?.forEach(({ category, operationType, value, date }) => {
        const [day, month, year] = date.split('.').map(Number);
        const currentMonth = new Date().getMonth() + 1;

        if (operationType === 'spending') {
            monthlySpending[month - 1] += +value;
            if (month === currentMonth) {
                dataMap.set(category, (dataMap.get(category) || 0) + Number(value));
            } else if (month === currentMonth - 1) {
                prevMonthDataMap.set(category, (prevMonthDataMap.get(category) || 0) + Number(value));
            }
            if (dateRange.includes(date.slice(0, 8))) {
                filteredDataMap.set(category, (filteredDataMap.get(category) || 0) + Number(value));
            }
        }

        if (operationType === 'income') {
            monthlyIncome[month - 1] += +value;
        }
    });

    const labels = Array.from(dataMap.keys());
    const dataValues = flag ? Array.from(filteredDataMap.values()) : Array.from(dataMap.values());

    const handleChangeDate = (e) => {
        const { name, value } = e.target;
        const dateArr = value.split('-').reverse();
        dateArr[2] = dateArr[2].slice(2, 4);
        const date = dateArr.join('.');
        if (name === 'start') {
            setDateForInput({ ...dateForInput, start: value });
            setStartDate(date);
        } else {
            setDateForInput({ ...dateForInput, end: value });
            setEndDate(date);
        }
    };

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Витрати',
                data: dataValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 0, 179, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 0, 179, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        hoverOffset: 20,
    };

    const ScatterChart = () => (
        <Scatter
            datasetIdKey="id"
            data={data3}
            options={{
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                maintainAspectRatio: false,
            }}
        />
    );

    const data2 = {
        labels: labels,
        datasets: [
            {
                label: 'Витрати цього місяця',
                data: Array.from(dataMap.values()),
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Витрати минулого місяця',
                data: Array.from(prevMonthDataMap.values()),
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)',
            },
        ],
    };

    const currentMonth = new Date().getMonth() + 1; 
    const monthsToShow = [currentMonth - 3, currentMonth - 2, currentMonth - 1, currentMonth].map(month => {
        if (month <= 0) month += 12;
        return month;
    });

    const spendingData = monthsToShow.map(month => monthlySpending[month - 1]);
    const incomeData = monthsToShow.map(month => monthlyIncome[month - 1]);

    const data3 = {
        datasets: [
            {
                type: 'bar',
                label: 'Витрати',
                data: spendingData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                type: 'line',
                label: 'Прибуток',
                data: incomeData,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
        labels: monthsToShow.map(month => {
            const monthNames = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
            return monthNames[month - 1];
        }),
    };

    const RadarChart = () => (
        <Radar
            data={data2}
            options={{
                elements: {
                    line: {
                        borderWidth: 3,
                    },
                },
                maintainAspectRatio: false,
            }}
        />
    );

    const DoughnutChart = () => <Doughnut data={chartData} options={chartOptions} />;

    const StatisticsBlock = () => {
        if (flag) {
            return (
                <>
                    <header className="header__main">
                        <h1>Детальна фінансова статистика</h1>
                    </header>
                    <main className="full-statistics__wrapper">
                        <section className="full-statistics__filter">
                            <input
                                type="date"
                                name="start"
                                value={dateForInput.start}
                                onChange={handleChangeDate}
                            />
                            <input
                                type="date"
                                name="end"
                                value={dateForInput.end}
                                onChange={handleChangeDate}
                            />
                        </section>

                        <section className="full-statistics__blocks">
                            <div>
                                <DoughnutChart />
                            </div>
                            <div>
                                <ScatterChart />
                            </div>
                            <div>
                                <RadarChart />
                            </div>
                        </section>
                    </main>
                </>
            );
        } else {
            return (
                <section className="container statistics">
                    <div className="container__header">
                        <h2>Статистика</h2>
                        <NavLink to="/statistics">Детальніше</NavLink>
                    </div>
                    <div className="statistics__blocks">
                        <DoughnutChart />
                    </div>
                </section>
            );
        }
    };

    return <StatisticsBlock />;
}

export default Statistics;

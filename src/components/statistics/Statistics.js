import { Doughnut, Scatter, Bar, Line, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement, PointElement, LineElement, RadialLinearScale} from "chart.js";

import './statistics.scss';

function Statistics() {
    ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement, PointElement, LineElement, RadialLinearScale);

    const data2 = {
        labels: [
          'Комунальні',
          'Авто',
          'Продукти',
          'Одяг та взуття',
          'Техніка',
        ],
        datasets: [{
          label: 'Витрати цього місяця',
          data: [65, 59, 90, 81, 56],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: 'Витрати минулого місяця',
          data: [28, 48, 40, 19, 96],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      }

    return (
        <section className="container statistics">
            <div className="container__header">
                <h2>Статистика</h2>
                <button>Детальніше</button>
            </div>
            <div className="statistics__blocks">
                <Doughnut 
                    width={100}
                    height={50}
                    datasetIdKey='id'
                    data={{
                        labels: ['Комунальні платежі', 'Авто', 'Продукти', 'Одяг та взуття', 'Техніка'],
                        datasets: [
                            {
                                label: 'Витрати',
                                data: [12, 19, 3, 5, 2],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                  ],
                                  borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)',
                                  ],
                                  borderWidth: 1,
                            }
                        ],
                    } }
                    options={{
                        responsive: true,
                        plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: false,
                            text: 'Chart.js Doughnut Chart'
                        },
        
                        },
                        hoverOffset: 10,
                        // maintainAspectRatio: false
                    }}
                />
{/* 
                <Scatter 
                    datasetIdKey='id'
                    data={{datasets: [{
                        type: 'bar',
                        label: 'Витрати',
                        data: [10, 20, 30, 40],
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }, {
                        type: 'line',
                        label: 'Прибуток',
                        data: [10, 50, 30, 100],
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    }],
                    labels: ['Січень', 'Лютий', 'Березень', 'Квітень']
                    }}
                    options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                      }
                    },
                    maintainAspectRatio: false
                  }} 
                />

                <Radar 
                    data={data2}
                    options={{
                      elements: {
                        line: {
                          borderWidth: 3
                        }
                      },
                      maintainAspectRatio: false
                    }}
                /> */}
            </div>
        </section> 
    )
}

export default Statistics;
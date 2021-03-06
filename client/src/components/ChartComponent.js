import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartComponent = (props) => {
    const {
        chartName,
        legend,
        data,
        statsItem
    } = props;
    console.log(statsItem);

    const dataChart = {
        labels: legend,
        datasets: [
            {
                label: chartName,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(48, 63, 159,0.4)',
                borderColor: 'rgba(48, 63, 159,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(48, 63, 159,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(48, 63, 159,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data
            }
        ]
    };

    return (
        <div>
            <h2>{statsItem && statsItem.name}</h2>
            <Line style={{ width: 100, height: 100 }}
                data={dataChart}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                }} />
        </div>
    );
};

export default ChartComponent;

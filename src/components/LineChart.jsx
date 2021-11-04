import React, { Fragment } from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ coinHistory, isZero, timePeriod }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory.data.history[i].price);
    coinTimestamp.push(
      timePeriod === '24h'
        ? new Date(coinHistory.data.history[i].timestamp).toLocaleTimeString()
        : new Date(coinHistory.data.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: isZero,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Fragment>
      <div className='chart-container'>
        <div className='chart-main'>
          <Line data={data} options={options} />
        </div>
      </div>
    </Fragment>
  );
};

export default LineChart;

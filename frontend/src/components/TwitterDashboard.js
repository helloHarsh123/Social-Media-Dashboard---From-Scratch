// components/TwitterDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const TwitterDashboard = () => {
  const [tweetData, setTweetData] = useState([]);

  useEffect(() => {
    // Fetch data from backend API endpoint
    axios.get('/api/twitter/timeline')
      .then(response => {
        setTweetData(response.data);
      })
      .catch(error => {
        console.error('Error fetching tweet data:', error);
      });
  }, []);

  const chartData = {
    labels: tweetData.map(tweet => tweet.created_at),
    datasets: [{
      label: 'Tweet Likes',
      data: tweetData.map(tweet => tweet.favorite_count),
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      fill: false,
    }],
  };

  return (
    <div>
      <h2>Twitter Dashboard</h2>
      <Line data={chartData} />
    </div>
  );
};

export default TwitterDashboard;

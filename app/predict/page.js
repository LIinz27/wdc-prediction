"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Predict() {
  const currentYear = new Date().getFullYear();
  const [season, setSeason] = useState(currentYear.toString());
  const [predictionResults, setPredictionResults] = useState([]);
  const [apiData, setApiData] = useState(null);

  // Fetch data dari Ergast API
  useEffect(() => {
    if (season) {
      fetch(`https://ergast.com/api/f1/${season}/driverStandings.json`)
        .then(response => response.json())
        .then(data => {
          if (data.MRData.StandingsTable.StandingsLists.length > 0) {
            setApiData(data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [season]);

  const calculatePercentage = (position, points) => {
    const maxPoints = Math.max(...apiData.map(driver => parseFloat(driver.points)));
    return ((points / maxPoints) * (1 / position)) * 100;
  };

  const handlePrediction = () => {
    if (!apiData) {
      setPredictionResults('Waiting for data...');
      return;
    }

    const predictions = apiData.map((driverData) => {
      const driverName = `${driverData.Driver.givenName} ${driverData.Driver.familyName}`;
      const position = parseInt(driverData.position, 10);
      const points = parseFloat(driverData.points);

      const winPercentage = calculatePercentage(position, points).toFixed(2);

      return {
        driverName,
        position,
        points,
        winPercentage,
      };
    });

    setPredictionResults(predictions);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <Head>
        <title>Predict F1 Winner</title>
        <meta name="description" content="Predict the winner of the F1 season!" />
      </Head>

      <main className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Predict F1 Season Winner
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="season">
              Season (Current Year)
            </label>
            <input
              type="text"
              id="season"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="w-full p-3 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter season year (e.g., 2024)"
            />
          </div>

          <button
            onClick={handlePrediction}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
          >
            Predict WDC Chances
          </button>

          {predictionResults.length > 0 && (
            <div className="mt-6 space-y-4">
              {predictionResults.map((result, index) => (
                <div key={index} className="p-4 bg-green-100 border border-green-300 rounded-md">
                  <p className="text-green-800 text-lg">
                    {result.driverName}: Ranked {result.position} with {result.points} points. 
                    Estimated WDC Win Percentage: {result.winPercentage}%.
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

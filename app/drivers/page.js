"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function DriverList() {
  // Inisialisasi season dengan tahun sekarang
  const currentYear = new Date().getFullYear();
  const [season, setSeason] = useState(currentYear.toString());
  const [drivers, setDrivers] = useState([]);

  // Fetch data driver dari Ergast API
  useEffect(() => {
    if (season) {
      fetch(`https://ergast.com/api/f1/${season}/drivers.json`)
        .then(response => response.json())
        .then(data => {
          if (data.MRData.DriverTable.Drivers.length > 0) {
            setDrivers(data.MRData.DriverTable.Drivers);
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [season]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <Head>
        <title>F1 Drivers List</title>
        <meta name="description" content="List of F1 drivers for the selected season" />
      </Head>

      <main className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          F1 Drivers List - {season} Season
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-lg font-medium mb-2" htmlFor="season">
              Select Season
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

          {drivers.length > 0 ? (
            <ul className="space-y-4">
              {drivers.map((driver, index) => (
                <li key={index} className="p-4 bg-blue-100 border border-blue-300 rounded-md">
                  <p className="text-blue-800 text-lg">
                    {driver.givenName} {driver.familyName} ({driver.nationality}) - 
                    Car Number: {driver.permanentNumber || 'N/A'}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-md">
              <p className="text-red-800 text-lg">No drivers found for the {season} season.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

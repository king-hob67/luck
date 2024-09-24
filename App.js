import React, { useState } from 'react';
import './App.css';

// Mocked lotto historical data (3 months)
const historicalLottoData = [
  [5, 10, 15, 20, 25],
  [7, 12, 19, 28, 35],
  [2, 13, 26, 34, 45],
  [1, 9, 11, 23, 36],
  [3, 15, 22, 29, 48],
  [4, 14, 24, 33, 46],
  // ... you can add more draws here
];

/**
 * Generate the most likely lotto numbers based on the past data.
 * @param {Array} lottoData - Historical lotto draw data.
 * @returns {Array} An array of the top 5 predicted numbers.
 */
const generatePrediction = (lottoData) => {
  const numberFrequency = {};

  // Count the frequency of each number across all historical draws
  lottoData.forEach(draw => {
    draw.forEach(number => {
      numberFrequency[number] = (numberFrequency[number] || 0) + 1;
    });
  });

  // Convert the numberFrequency object into an array of [number, frequency] pairs
  const frequencyArray = Object.entries(numberFrequency);

  // Sort the array by frequency in descending order
  const sortedByFrequency = frequencyArray.sort((a, b) => b[1] - a[1]);

  // Extract the top 5 most frequent numbers
  const topNumbers = sortedByFrequency.slice(0, 5).map(entry => Number(entry[0]));

  return topNumbers;
};

function App() {
  // useState hook to manage predicted numbers state
  const [prediction, setPrediction] = useState([]);
  const [error, setError] = useState("");

  /**
   * Handle the click event to generate the predicted lotto numbers.
   * Includes error handling for empty data sets.
   */
  const handleGenerateClick = () => {
    if (historicalLottoData.length === 0) {
      // If no data is available, display an error message
      setError("No historical data available to generate predictions.");
    } else {
      // Otherwise, generate the prediction and reset the error state
      const prediction = generatePrediction(historicalLottoData);
      setPrediction(prediction);
      setError("");  // Clear any previous errors
    }
  };

  /**
   * Handle the reset button click to clear the prediction.
   */
  const handleResetClick = () => {
    setPrediction([]);
    setError("");
  };

  return (
    <div className="App">
      <h1>South African PowerBall Predictor</h1>

      {/* Generate Prediction Button */}
      <button onClick={handleGenerateClick}>Generate Lotto Prediction</button>

      {/* Reset Prediction Button */}
      {prediction.length > 0 && (
        <button onClick={handleResetClick} style={{ marginLeft: "10px" }}>
          Reset Prediction
        </button>
      )}

      {/* Display error message if any */}
      {error && <div className="error">{error}</div>}

      {/* Display predicted lotto numbers if available */}
      {prediction.length > 0 && (
        <div>
          <h2>Your predicted numbers are:</h2>
          <ul>
            {prediction.map((num, index) => (
              <li key={index}>{num}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

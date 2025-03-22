// index.js

// Grab DOM elements
const fileInput = document.getElementById('fileInput');
const parseButton = document.getElementById('parseButton');
const chartsContainer = document.getElementById('chartsContainer');

// 1) Listen for the “Parse & Visualize” button click
parseButton.addEventListener('click', () => {
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a CSV file first.');
    return;
  }

  // Parse using Papa Parse
  Papa.parse(file, {
    header: true,        // treat first row as header
    dynamicTyping: true, // automatically convert numeric fields
    complete: (results) => {
      // results.data will be an array of objects
      // Each key is a column header, each value is the cell data
      const data = results.data;

      // Clear out any old charts
      chartsContainer.innerHTML = '';

      // For each column (question), build a histogram chart
      // We skip non-numeric columns automatically
      const headers = Object.keys(data[0] || {});

      headers.forEach((header) => {
        // Grab all values under this column
        const values = data.map(row => row[header]).filter(v => v != null);

        // Check if all (or most) values are numeric
        const numericValues = values.filter(v => typeof v === 'number');

        // If numeric, we treat it as a question needing a histogram
        // (You could refine by checking the proportion of numeric vs. strings)
        if (numericValues.length > 0) {
          createHistogramChart(header, numericValues);
        }
      });
    }
  });
});

/**
 * Create a histogram for a set of numeric values.
 * We'll do manual binning, then create a bar chart with Chart.js
 */
function createHistogramChart(questionTitle, numericData) {
  // 1) Decide on bin size or number of bins
  //    This can vary depending on your data range.
  //    For example, if your data is 1-10, a binSize=1 might suffice.
  //    If data is large or widely distributed, you might want bigger bins.
  const binSize = 1; // user-chosen bin size. Adjust as needed.

  // 2) Find min & max to define range
  const minValue = Math.min(...numericData);
  const maxValue = Math.max(...numericData);

  // 3) Build bins from minValue to maxValue
  const bins = [];
  // Start from the lowest "rounded" bin
  let start = Math.floor(minValue / binSize) * binSize;
  let end = Math.ceil(maxValue / binSize) * binSize;

  for (let val = start; val <= end; val += binSize) {
    bins.push(val);
  }

  // 4) Count how many data points fall into each bin range
  //    bins[i] to bins[i+1]
  const counts = new Array(bins.length - 1).fill(0);

  numericData.forEach(value => {
    // find which bin this value belongs to
    for (let i = 0; i < bins.length - 1; i++) {
      if (value >= bins[i] && value < bins[i + 1]) {
        counts[i]++;
        break;
      }
    }
  });

  // 5) Convert bin ranges to labels like "0-1", "1-2", etc.
  const labels = [];
  for (let i = 0; i < bins.length - 1; i++) {
    labels.push(`${bins[i]} - ${bins[i+1]}`);
  }

  // 6) Dynamically create a <canvas> for Chart.js
  const canvas = document.createElement('canvas');
  chartsContainer.appendChild(canvas);

  // 7) Create a bar chart in Chart.js
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: questionTitle,
        data: counts
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Value Range'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Frequency'
          },
          beginAtZero: true
        }
      }
    }
  });
}

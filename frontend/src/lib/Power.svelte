<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import PocketBase from 'pocketbase';

  // Initialize PocketBase client
  const client = new PocketBase('http://localhost:8090');

  let chart;
  let chartData = {
    labels: [],
    datasets: [
      {
        label: 'Percentage',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  let currentTab = 'mygenerator#1'; // Default tab
  const tabNames = ['mygenerator#1', 'mygenerator#2', '明潭#2', '明潭#1'];

  // Fetch data from PocketBase
  async function fetchData(generatorName) {
    try {
      const records = await client.collection('power').getList(1, 1000, {
        filter: `name='${generatorName}'`,
        sort: '-time',
      });
      updateChartData(records.items);
    } catch (error) {
      console.error('Error fetching data from PocketBase:', error);
    }
  }

  function updateChartData(data) {
    // Transform the data into the format expected by Chart.js
    chartData.labels = data.map((item) => new Date(item.time).toLocaleString());
    chartData.datasets[0].data = data.map((item) => item.percent);

    // Update the chart if it exists
    if (chart) {
      chart.data = chartData;
      chart.update();
    }
  }

  // Setup the chart
  onMount(() => {
    // @ts-ignore
    const ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute',
            },
          },
        },
      },
    });

    // Initial fetch for the default tab
    fetchData(currentTab);
  });

  function changeTab(tabName) {
    currentTab = tabName;
    fetchData(tabName);
  }
</script>

<div>
  <canvas id="myChart"></canvas>
</div>

<div class="tabs">
  {#each tabNames as tabName}
    <button
      on:click={() => changeTab(tabName)}
      class:class-active={tabName === currentTab}
    >
      {tabName}
    </button>
  {/each}
</div>

<style>
  .tabs {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }

  .class-active {
    background-color: #333;
    color: white;
  }

  /* Add additional styling as needed */
</style>

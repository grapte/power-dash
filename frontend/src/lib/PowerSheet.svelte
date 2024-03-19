<script>
  import { onMount } from 'svelte';
  import PocketBase from 'pocketbase';

  // Initialize PocketBase client
  const client = new PocketBase(window.location.origin);

  let records = [];

  onMount(async () => {
    await fetchRecords();
    subscribeToChanges();
  });

  async function fetchRecords() {
    try {
      // Assuming we want to fetch the latest 1000 entries from the 'power' collection
      const list = await client
        .collection('power')
        .getList(1, 1000, { sort: 'time' });
      records = list.items;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function subscribeToChanges() {
    client.collection('power').subscribe('*', (e) => {
      console.log(e.action, e.record);

      // Handle different types of actions
      if (e.action === 'create') {
        // For a new record, add to the start of the array
        records = [e.record, ...records];
      }
    });
  }
</script>

<!-- Simple table to display the data -->
<table>
  <thead>
    <tr>
      <th>Capacity</th>
      <th>Used</th>
      <th>Percent</th>
      <th>Gov</th>
      <th>Name</th>
      <th>Key</th>
      <th>Type</th>
      <th>Status</th>
      <th>Note</th>
      <th>Time</th>
    </tr>
  </thead>
  <tbody>
    {#each records as record}
      <tr>
        <td>{record.capacity}</td>
        <td>{record.used}</td>
        <td>{record.percent.toFixed(2)}</td>
        <td>{record.gov ? 'Yes' : 'No'}</td>
        <td>{record.name}</td>
        <td>{record.key}</td>
        <td>{record.type}</td>
        <td>{record.status}</td>
        <td>{record.note}</td>
        <td>{new Date(record.time).toLocaleString()}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  /* Define color scheme variables */
  :root {
    --background-color: #ffffff;
    --text-color: #333333;
    --border-color: #dddddd;
    --header-background-color: #f2f2f2;
    --row-odd-background-color: #f9f9f9;
  }

  /* Adjust variables for dark mode */
  @media (prefers-color-scheme: dark) {
    :root {
      --background-color: #121212;
      --text-color: #eeeeee;
      --border-color: #333333;
      --header-background-color: #1c1c1c;
      --row-odd-background-color: #242424;
    }
  }

  /* Style the table */
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  th,
  td {
    border: 1px solid var(--border-color);
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: var(--header-background-color);
  }

  tbody tr:nth-child(odd) {
    background-color: var(--row-odd-background-color);
  }
</style>

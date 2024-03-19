<script>
  import Home from './lib/Home.svelte';
  import Power from './lib/Power.svelte';
  import PowerSheet from './lib/PowerSheet.svelte';
  import Jokes from './lib/Jokes.svelte';
  import Tab from './lib/Tab.svelte';

  let currentTab = 'Home';
</script>

<div class="container">
  <div class="tabs">
    <button on:click={() => (currentTab = 'Home')}>Home</button>
    <button on:click={() => (currentTab = 'Power')}>Power</button>
    <button on:click={() => (currentTab = 'PowerSheet')}>PowerSheet</button>
    <button on:click={() => (currentTab = 'Jokes')}>Jokes</button>
  </div>

  <div class="content">
    <Tab tab="Home" {currentTab}><Home /></Tab>
    <Tab tab="Power" {currentTab}><Power /></Tab>
    <Tab tab="PowerSheet" {currentTab}><PowerSheet /></Tab>
    <Tab tab="Jokes" {currentTab}><Jokes /></Tab>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .tabs {
    margin-top: 16px; /* Adjust the units to match your design */
    display: flex;
    justify-content: center;
    gap: 8px; /* Space between buttons */
  }

  .content {
    flex-grow: 1; /* Takes up the remaining space */
    min-height: 0; /* Fix for flexbox overflow */
    padding-top: 16px; /* Adjust the units to match your design */
  }
</style>

<script>
  import { onMount } from 'svelte';
  let joke = '';
  let isLoading = false;

  async function fetchJoke() {
    isLoading = true;
    joke = '';
    try {
      const response = await fetch(
        'https://official-joke-api.appspot.com/random_joke'
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      joke = `${data.setup} - ${data.punchline}`;
    } catch (error) {
      joke = 'Failed to fetch a joke. Please try again later.';
      console.error('Error fetching joke:', error);
    }
    isLoading = false;
  }

  onMount(() => {
    fetchJoke();
  });
</script>

<div>
  {#if isLoading}
    <p>Loading joke...</p>
  {:else}
    <p>{joke || 'Click the button to get a joke!'}</p>
  {/if}
  <button on:click={fetchJoke} disabled={isLoading}>Get Another Joke</button>
</div>

<style>
  p {
    margin: 1em 0;
  }
</style>

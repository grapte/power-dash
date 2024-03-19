<script>
  export let tab;
  export let currentTab;
</script>

{#if tab === currentTab}
  <slot />
{/if}

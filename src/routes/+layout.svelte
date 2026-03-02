<script lang="ts">
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="dim-container">
	{@render children()}
</div>

<style>
	.dim-container {
		display: grid;
		place-items: center;
		position: relative;
		z-index: 1;
    	height: 100%;
		background: black;
	}
</style>
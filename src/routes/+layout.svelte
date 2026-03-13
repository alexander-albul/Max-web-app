<script lang="ts">
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import '../index.css';

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
		max-height: 100svh;
		background: black;
		overflow: auto;
		overscroll-behavior: contain;
	}
</style>

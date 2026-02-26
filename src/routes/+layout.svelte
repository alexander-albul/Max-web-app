<script module>
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	let dimLevel = $state(0);

	function changeDim(value: number) {
		dimLevel = value;
		localStorage.setItem('dimLevel', dimLevel.toString());
	}

	function initDim() {
		const saved = localStorage.getItem('dimLevel');
		if (saved) {
			dimLevel = parseFloat(saved);
		}
	}

	onMount(() => {
		initDim();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="dim-overlay" style="opacity: {dimLevel / 100}"></div>

<div class="dim-container">
	{@render children()}
</div>

<div class="dim-control">
	<span class="dim-icon">🌙</span>
	<input
		type="range"
		class="dim-slider"
		min="0"
		max="100"
		value={dimLevel}
		oninput={(e) => changeDim(parseFloat(e.currentTarget.value))}
		title="Регулировать затемнение"
	/>
	<span class="dim-value">{dimLevel}%</span>
</div>

<style>
	.dim-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #000;
		pointer-events: none;
		z-index: 9998;
		transition: opacity 0.1s ease;
	}

	.dim-container {
		display: grid;
		place-items: center;
		position: relative;
		z-index: 1;
    height: 100%;
	
    background: black;
	}

	.dim-control {
		position: fixed;
		bottom: 20px;
		right: 20px;
		display: flex;
		align-items: center;
		gap: 10px;
		background: rgba(51, 51, 51, 0.9);
		padding: 12px 16px;
		border-radius: 25px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		z-index: 9999;
		backdrop-filter: blur(10px);
	}

	.dim-icon {
		font-size: 18px;
	}

	.dim-slider {
		width: 120px;
		height: 4px;
		cursor: pointer;
		accent-color: #888;
	}

	.dim-slider::-webkit-slider-thumb {
		appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #fff;
		cursor: pointer;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.dim-slider::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: #fff;
		cursor: pointer;
		border: none;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.dim-value {
		color: #fff;
		font-size: 12px;
		min-width: 35px;
		text-align: right;
	}
</style>

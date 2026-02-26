<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/card/step1');
	});
</script>

<div class="loading">
	<div class="spinner"></div>
</div>

<style>
	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 400px;
	}

	.spinner {
		width: 32px;
		height: 32px;
		border: 3px solid var(--background-base-secondary, #f5f5f5);
		border-top-color: var(--content-accent-default, #009b3a);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>

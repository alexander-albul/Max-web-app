<script lang="ts">
	import StatusBar from '$lib/components/StatusBar.svelte';
	import TitleBar from '$lib/components/TitleBar.svelte';

	let { children } = $props();
</script>

<div class="card-layout">
	<header class="header">
		<StatusBar>
			<TitleBar />
		</StatusBar>
	</header>

	<main class="content">
		{@render children()}
	</main>
</div>

<style>
	.card-layout {
		display: flex;
		flex-direction: column;
		height: 100%;
		max-height: 812px;
		width: 100%;
		max-width: 375px;
		margin: 0 auto;
		background: var(--background-base-primary, #ffffff);
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
		overflow: auto;
	}

	.header {
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0 16px;
		padding-bottom: 24px;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Rubik', sans-serif;
		background: var(--background-base-secondary, #f5f5f5);
		height: 100vh;
	}
</style>

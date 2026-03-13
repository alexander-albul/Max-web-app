<script lang="ts">
	import StatusBar from '$lib/components/StatusBar.svelte';
	import TitleBar from '$lib/components/TitleBar.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { afterNavigate } from '$app/navigation';
	import { tick } from 'svelte';

	let { children } = $props();
	let scrollAreaRef = $state<HTMLElement | null>(null);

	afterNavigate(async () => {
		await tick();

		if (scrollAreaRef) {
			const viewport = scrollAreaRef.querySelector<HTMLElement>('[data-scroll-area-viewport]');
			if (viewport) {
				viewport.scrollTop = 0;
			}
		}
	});
</script>

<div class="card-layout">
	<header class="header">
		<StatusBar>
			<TitleBar />
		</StatusBar>
	</header>

	<ScrollArea bind:ref={scrollAreaRef} class="flex-1 min-h-0">
		<main class="content">
			{@render children()}
		</main>
	</ScrollArea>
</div>

<style>
	.card-layout {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100svh;
		max-height: 812px;
		width: 100%;
		max-width: 375px;
		margin: 0 auto;
		background: var(--background-base-primary, #ffffff);
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
		overflow: hidden;
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
		font-family: 'Roboto', sans-serif;
		background-color: black;
		height: 100vh;
		overscroll-behavior-y: none;
	}
</style>

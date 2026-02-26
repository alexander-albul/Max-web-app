<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		visible?: boolean;
		blur?: boolean;
		opacity?: 'light' | 'medium' | 'dark';
		zIndex?: number;
		closeOnClick?: boolean;
		class?: string;
		children?: Snippet;
		onClose?: () => void;
	}

	let {
		visible = $bindable(false),
		blur = false,
		opacity = 'medium',
		zIndex = 100,
		closeOnClick = true,
		class: className = '',
		children,
		onClose
	}: Props = $props();

	function handleClick(e: MouseEvent) {
		if (closeOnClick && e.target === e.currentTarget) {
			visible = false;
			onClose?.();
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			visible = false;
			onClose?.();
		}
	}

	$effect(() => {
		if (visible) {
			document.body.style.overflow = 'hidden';
			document.addEventListener('keydown', handleKeyDown);
			return () => {
				document.body.style.overflow = '';
				document.removeEventListener('keydown', handleKeyDown);
			};
		}
	});
</script>

{#if visible}
	<div
		class="backdrop {className}"
		class:blur
		class:opacity-light={opacity === 'light'}
		class:opacity-medium={opacity === 'medium'}
		class:opacity-dark={opacity === 'dark'}
		style:z-index={zIndex}
		onclick={handleClick}
		role="presentation"
	>
		{#if children}
			<div class="backdrop-content">
				{@render children()}
			</div>
		{/if}
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		animation: fadeIn 0.2s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Opacity variants */
	.backdrop.opacity-light {
		background: rgba(0, 0, 0, 0.3);
	}

	.backdrop.opacity-medium {
		background: rgba(0, 0, 0, 0.5);
	}

	.backdrop.opacity-dark {
		background: rgba(0, 0, 0, 0.7);
	}

	/* Blur effect */
	.backdrop.blur {
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
	}

	.backdrop.blur.opacity-light {
		background: rgba(0, 0, 0, 0.2);
	}

	.backdrop.blur.opacity-medium {
		background: rgba(0, 0, 0, 0.35);
	}

	.backdrop.blur.opacity-dark {
		background: rgba(0, 0, 0, 0.5);
	}

	.backdrop-content {
		position: relative;
		z-index: 1;
		max-width: 100%;
		max-height: 100%;
		overflow: auto;
	}
</style>

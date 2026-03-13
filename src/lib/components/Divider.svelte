<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		orientation?: 'horizontal' | 'vertical';
		variant?: 'solid' | 'dashed';
		spacing?: 'none' | 's' | 'm' | 'l';
		color?: 'default' | 'subtle' | 'strong';
		class?: string;
		children?: Snippet;
	}

	let {
		orientation = 'horizontal',
		variant = 'solid',
		spacing = 'm',
		color = 'default',
		class: className = '',
		children
	}: Props = $props();

	const hasContent = $derived(!!children);
</script>

<div
	class="divider {className}"
	class:horizontal={orientation === 'horizontal'}
	class:vertical={orientation === 'vertical'}
	class:solid={variant === 'solid'}
	class:dashed={variant === 'dashed'}
	class:spacing-none={spacing === 'none'}
	class:spacing-s={spacing === 's'}
	class:spacing-m={spacing === 'm'}
	class:spacing-l={spacing === 'l'}
	class:color-default={color === 'default'}
	class:color-subtle={color === 'subtle'}
	class:color-strong={color === 'strong'}
	class:has-content={hasContent}
	role="separator"
	aria-orientation={orientation}
>
	{#if hasContent && orientation === 'horizontal'}
		<span class="line line-left"></span>
		<span class="content">
			{@render children()}
		</span>
		<span class="line line-right"></span>
	{/if}
</div>

<style>
	.divider {
		display: flex;
		align-items: center;
	}

	/* Horizontal */
	.divider.horizontal {
		width: 100%;
		flex-direction: row;
	}

	.divider.horizontal:not(.has-content) {
		height: 1px;
	}

	/* Vertical */
	.divider.vertical {
		height: 100%;
		width: 1px;
		flex-direction: column;
	}

	/* Spacing */
	.divider.horizontal.spacing-none {
		margin: 0;
	}

	.divider.horizontal.spacing-s {
		margin: var(--spacing-2x, 8px) 0;
	}

	.divider.horizontal.spacing-m {
		margin: var(--spacing-4x, 16px) 0;
	}

	.divider.horizontal.spacing-l {
		margin: var(--spacing-6x, 24px) 0;
	}

	.divider.vertical.spacing-none {
		margin: 0;
	}

	.divider.vertical.spacing-s {
		margin: 0 var(--spacing-2x, 8px);
	}

	.divider.vertical.spacing-m {
		margin: 0 var(--spacing-4x, 16px);
	}

	.divider.vertical.spacing-l {
		margin: 0 var(--spacing-6x, 24px);
	}

	/* Colors */
	.divider.color-default {
		background: var(--border-base-main, #e0e0e0);
	}

	.divider.color-subtle {
		background: var(--border-base-subtle, #f0f0f0);
	}

	.divider.color-strong {
		background: var(--border-base-strong, #bdbdbd);
	}

	/* Variants */
	.divider.dashed {
		background: transparent;
		border: none;
	}

	.divider.horizontal.dashed:not(.has-content) {
		border-top: 1px dashed;
	}

	.divider.vertical.dashed {
		border-left: 1px dashed;
	}

	.divider.dashed.color-default {
		border-color: var(--border-base-main, #e0e0e0);
	}

	.divider.dashed.color-subtle {
		border-color: var(--border-base-subtle, #f0f0f0);
	}

	.divider.dashed.color-strong {
		border-color: var(--border-base-strong, #bdbdbd);
	}

	/* With content */
	.divider.has-content {
		background: transparent;
	}

	.line {
		flex: 1;
		height: 1px;
	}

	.divider.solid .line {
		background: var(--border-base-main, #e0e0e0);
	}

	.divider.solid.color-subtle .line {
		background: var(--border-base-subtle, #f0f0f0);
	}

	.divider.solid.color-strong .line {
		background: var(--border-base-strong, #bdbdbd);
	}

	.divider.dashed .line {
		background: transparent;
		border-top: 1px dashed;
	}

	.divider.dashed.color-default .line {
		border-color: var(--border-base-main, #e0e0e0);
	}

	.divider.dashed.color-subtle .line {
		border-color: var(--border-base-subtle, #f0f0f0);
	}

	.divider.dashed.color-strong .line {
		border-color: var(--border-base-strong, #bdbdbd);
	}

	.content {
		padding: 0 var(--spacing-3x, 12px);
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-secondary, #6e6d6d);
		white-space: nowrap;
	}
</style>

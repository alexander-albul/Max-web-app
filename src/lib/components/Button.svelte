<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
		size?: 's' | 'm' | 'l';
		fullWidth?: boolean;
		disabled?: boolean;
		loading?: boolean;
		type?: 'button' | 'submit' | 'reset';
		href?: string;
		target?: string;
		iconLeft?: string;
		iconRight?: string;
		iconOnly?: boolean;
		class?: string;
		children?: Snippet;
		onClick?: (e: MouseEvent) => void;
	}

	let {
		variant = 'primary',
		size = 'm',
		fullWidth = false,
		disabled = false,
		loading = false,
		type = 'button',
		href,
		target,
		iconLeft = '',
		iconRight = '',
		iconOnly = false,
		class: className = '',
		children,
		onClick
	}: Props = $props();

	const isDisabled = $derived(disabled || loading);

	function handleClick(e: MouseEvent) {
		if (isDisabled) {
			e.preventDefault();
			return;
		}
		onClick?.(e);
	}
</script>

{#if href}
	<a
		{href}
		{target}
		class="button {className}"
		class:variant-primary={variant === 'primary'}
		class:variant-secondary={variant === 'secondary'}
		class:variant-ghost={variant === 'ghost'}
		class:variant-danger={variant === 'danger'}
		class:variant-success={variant === 'success'}
		class:size-s={size === 's'}
		class:size-m={size === 'm'}
		class:size-l={size === 'l'}
		class:full-width={fullWidth}
		class:disabled={isDisabled}
		class:loading
		class:icon-only={iconOnly}
		onclick={handleClick}
		aria-disabled={isDisabled}
	>
		{#if loading}
			<span class="loader"></span>
		{:else}
			{#if iconLeft}
				<img src={iconLeft} alt="" class="icon icon-left" />
			{/if}
			{#if children}
				<span class="label">
					{@render children()}
				</span>
			{/if}
			{#if iconRight}
				<img src={iconRight} alt="" class="icon icon-right" />
			{/if}
		{/if}
	</a>
{:else}
	<button
		{type}
		class="button {className}"
		class:variant-primary={variant === 'primary'}
		class:variant-secondary={variant === 'secondary'}
		class:variant-ghost={variant === 'ghost'}
		class:variant-danger={variant === 'danger'}
		class:variant-success={variant === 'success'}
		class:size-s={size === 's'}
		class:size-m={size === 'm'}
		class:size-l={size === 'l'}
		class:full-width={fullWidth}
		class:disabled={isDisabled}
		class:loading
		class:icon-only={iconOnly}
		disabled={isDisabled}
		onclick={handleClick}
	>
		{#if loading}
			<span class="loader"></span>
		{:else}
			{#if iconLeft}
				<img src={iconLeft} alt="" class="icon icon-left" />
			{/if}
			{#if children}
				<span class="label">
					{@render children()}
				</span>
			{/if}
			{#if iconRight}
				<img src={iconRight} alt="" class="icon icon-right" />
			{/if}
		{/if}
	</button>
{/if}

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-2x, 8px);
		border: none;
		border-radius: var(--border-radius-l, 12px);
		font-family: 'Rubik', sans-serif;
		font-weight: 500;
		cursor: pointer;
		text-decoration: none;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.button.full-width {
		width: 100%;
	}

	/* Sizes */
	.button.size-s {
		height: 36px;
		padding: 0 var(--spacing-4x, 16px);
		font-size: 14px;
		line-height: 20px;
	}

	.button.size-m {
		height: 44px;
		padding: 0 var(--spacing-5x, 20px);
		font-size: 14px;
		line-height: 20px;
	}

	.button.size-l {
		height: 52px;
		padding: 0 var(--spacing-6x, 24px);
		font-size: 16px;
		line-height: 24px;
	}

	.button.icon-only.size-s {
		width: 36px;
		padding: 0;
	}

	.button.icon-only.size-m {
		width: 44px;
		padding: 0;
	}

	.button.icon-only.size-l {
		width: 52px;
		padding: 0;
	}

	/* Primary variant */
	.button.variant-primary {
		background: var(--background-accent-default, #009b3a);
		color: var(--content-on-accent, #ffffff);
	}

	.button.variant-primary:hover:not(.disabled) {
		background: var(--background-accent-hover, #008833);
	}

	.button.variant-primary:active:not(.disabled) {
		background: var(--background-accent-pressed, #00752c);
	}

	/* Secondary variant */
	.button.variant-secondary {
		background: var(--background-base-secondary, #f5f5f5);
		color: var(--content-base-primary, #212121);
	}

	.button.variant-secondary:hover:not(.disabled) {
		background: var(--background-base-tertiary, #ebebeb);
	}

	.button.variant-secondary:active:not(.disabled) {
		background: var(--background-base-quaternary, #e0e0e0);
	}

	/* Ghost variant */
	.button.variant-ghost {
		background: transparent;
		color: var(--content-accent-default, #009b3a);
	}

	.button.variant-ghost:hover:not(.disabled) {
		background: var(--background-accent-subtle, rgba(0, 155, 58, 0.08));
	}

	.button.variant-ghost:active:not(.disabled) {
		background: var(--background-accent-subtle-pressed, rgba(0, 155, 58, 0.16));
	}

	/* Danger variant */
	.button.variant-danger {
		background: var(--background-error, #e53935);
		color: var(--content-on-error, #ffffff);
	}

	.button.variant-danger:hover:not(.disabled) {
		background: var(--background-error-hover, #d32f2f);
	}

	.button.variant-danger:active:not(.disabled) {
		background: var(--background-error-pressed, #c62828);
	}

	/* Success variant */
	.button.variant-success {
		background: var(--background-success, #43a047);
		color: var(--content-on-success, #ffffff);
	}

	.button.variant-success:hover:not(.disabled) {
		background: var(--background-success-hover, #388e3c);
	}

	.button.variant-success:active:not(.disabled) {
		background: var(--background-success-pressed, #2e7d32);
	}

	/* Disabled state */
	.button.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Loading state */
	.button.loading {
		cursor: wait;
	}

	.loader {
		width: 20px;
		height: 20px;
		border: 2px solid currentColor;
		border-top-color: transparent;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.icon {
		width: 20px;
		height: 20px;
		flex-shrink: 0;
	}

	.size-s .icon {
		width: 16px;
		height: 16px;
	}

	.size-l .icon {
		width: 24px;
		height: 24px;
	}

	.label {
		display: inline-block;
	}

	/* Focus state */
	.button:focus-visible {
		outline: 2px solid var(--border-accent-default, #009b3a);
		outline-offset: 2px;
	}
</style>

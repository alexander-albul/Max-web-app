<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Component } from 'svelte';

	interface IconProps {
		size?: number;
		class?: string;
	}

	interface Props {
		type?: 'info' | 'success' | 'warning' | 'error';
		size?: 'xs' | 's' | 'm' | 'l';
		title?: string;
		closable?: boolean;
		showIcon?: boolean;
		icon?: Snippet;
		iconProps?: IconProps;
		class?: string;
		children?: Snippet;
		actions?: Snippet;
		onClose?: () => void;
	}

	let {
		type = 'info',
		size = 'm',
		title = '',
		closable = false,
		showIcon = true,
		icon,
		iconProps = {},
		class: className = '',
		children,
		actions,
		onClose
	}: Props = $props();

	const iconSize = $derived(size === 'xs' ? 16 : size === 's' ? 20 : size === 'l' ? 28 : 24);

	let isVisible = $state(true);

	function handleClose() {
		isVisible = false;
		onClose?.();
	}
</script>

{#if isVisible}
	<div
		class="section-message {className}"
		class:type-info={type === 'info'}
		class:type-success={type === 'success'}
		class:type-warning={type === 'warning'}
		class:type-error={type === 'error'}
		class:size-xs={size === 'xs'}
		class:size-s={size === 's'}
		class:size-m={size === 'm'}
		class:size-l={size === 'l'}
		role="alert"
	>
		{#if showIcon}
			<div
				class="icon-container"
				class:icon-props={iconProps.class}
				style={iconProps.class ? '' : ''}
			>
				{#if icon}
					{@render icon()}
				{:else if type === 'info'}
					<svg class="icon" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
						<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
						<path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
						<circle cx="12" cy="8" r="1" fill="currentColor" />
					</svg>
				{:else if type === 'success'}
					<svg class="icon" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
						<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
						<path
							d="M8 12L11 15L16 9"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				{:else if type === 'warning'}
					<svg class="icon" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
						<path
							d="M12 2L2 22H22L12 2Z"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
						<circle cx="12" cy="17" r="1" fill="currentColor" />
					</svg>
				{:else if type === 'error'}
					<svg class="icon" width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
						<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
						<path d="M15 9L9 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
						<path d="M9 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
					</svg>
				{/if}
			</div>
		{/if}

		<div class="content">
			{#if title}
				<div class="title">{title}</div>
			{/if}
			{#if children}
				<div class="description">
					{@render children()}
				</div>
			{/if}
			{#if actions}
				<div class="actions">
					{@render actions()}
				</div>
			{/if}
		</div>

		{#if closable}
			<button type="button" class="close-button" onclick={handleClose} aria-label="Закрыть">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path
						d="M15 5L5 15M5 5L15 15"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		{/if}
	</div>
{/if}

<style>
	.section-message {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-3x, 12px);
		padding: var(--spacing-4x, 16px);
		border-radius: var(--border-radius-l, 12px);
	}

	/* Type variants */
	.section-message.type-info {
		background: var(--background-info-subtle, #e3f2fd);
		color: var(--content-info, #1976d2);
	}

	.section-message.type-success {
		background: var(--background-success-subtle, #e8f5e9);
		color: var(--content-success, #388e3c);
	}

	.section-message.type-warning {
		background: var(--background-warning-subtle, #fff3e0);
		color: var(--content-warning, #f57c00);
	}

	.section-message.type-error {
		background: var(--background-error-subtle, #ffebee);
		color: var(--content-error, #e53935);
	}

	/* Size variants */
	.section-message.size-xs {
		gap: var(--spacing-2x, 8px);
		padding: var(--spacing-2x, 8px) var(--spacing-3x, 12px);
		border-radius: var(--border-radius-s, 6px);
	}

	.section-message.size-s {
		gap: var(--spacing-2x, 8px);
		padding: var(--spacing-3x, 12px);
		border-radius: var(--border-radius-m, 8px);
	}

	.section-message.size-m {
		gap: var(--spacing-3x, 12px);
		padding: var(--spacing-4x, 16px);
		border-radius: var(--border-radius-l, 12px);
	}

	.section-message.size-l {
		gap: var(--spacing-4x, 16px);
		padding: var(--spacing-5x, 20px);
		border-radius: var(--border-radius-xl, 16px);
	}

	.size-xs .title {
		font-size: 12px;
		line-height: 16px;
	}

	.size-xs .description {
		font-size: 11px;
		line-height: 14px;
	}

	.size-s .title {
		font-size: 14px;
		line-height: 20px;
	}

	.size-s .description {
		font-size: 12px;
		line-height: 16px;
	}

	.size-l .title {
		font-size: 18px;
		line-height: 28px;
	}

	.size-l .description {
		font-size: 16px;
		line-height: 24px;
	}

	.icon-container {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon {
		flex-shrink: 0;
	}

	.content {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2x, 8px);
	}

	.title {
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: inherit;
	}

	.description {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-primary, #212121);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-3x, 12px);
		margin-top: var(--spacing-1x, 4px);
	}

	.close-button {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border: none;
		background: transparent;
		cursor: pointer;
		border-radius: var(--border-radius-m, 8px);
		color: inherit;
		opacity: 0.7;
		transition: all 0.2s ease;
		margin: -4px -4px -4px 0;
	}

	.close-button:hover {
		opacity: 1;
		background: rgba(0, 0, 0, 0.05);
	}
</style>

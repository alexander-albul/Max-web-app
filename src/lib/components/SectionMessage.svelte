<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		type?: 'info' | 'success' | 'warning' | 'error';
		title?: string;
		closable?: boolean;
		class?: string;
		children?: Snippet;
		actions?: Snippet;
		onClose?: () => void;
	}

	let {
		type = 'info',
		title = '',
		closable = false,
		class: className = '',
		children,
		actions,
		onClose
	}: Props = $props();

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
		role="alert"
	>
		<div class="icon-container">
			{#if type === 'info'}
				<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
					<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
					<path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
					<circle cx="12" cy="8" r="1" fill="currentColor"/>
				</svg>
			{:else if type === 'success'}
				<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
					<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
					<path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			{:else if type === 'warning'}
				<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M12 2L2 22H22L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					<path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
					<circle cx="12" cy="17" r="1" fill="currentColor"/>
				</svg>
			{:else if type === 'error'}
				<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
					<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
					<path d="M15 9L9 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
					<path d="M9 9L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
				</svg>
			{/if}
		</div>

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
					<path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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

	.icon-container {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon {
		width: 24px;
		height: 24px;
	}

	.content {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2x, 8px);
	}

	.title {
		font-family: 'Rubik', sans-serif;
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: inherit;
	}

	.description {
		font-family: 'Rubik', sans-serif;
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

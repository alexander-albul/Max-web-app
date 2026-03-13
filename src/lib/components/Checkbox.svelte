<script lang="ts">
	interface Props {
		checked?: boolean;
		indeterminate?: boolean;
		disabled?: boolean;
		label?: string;
		description?: string;
		size?: 's' | 'm';
		error?: boolean;
		class?: string;
		onChange?: (checked: boolean) => void;
	}

	let {
		checked = $bindable(false),
		indeterminate = false,
		disabled = false,
		label = '',
		description = '',
		size = 'm',
		error = false,
		class: className = '',
		onChange
	}: Props = $props();

	function handleChange(e: Event) {
		if (disabled) return;
		const target = e.target as HTMLInputElement;
		checked = target.checked;
		onChange?.(checked);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (disabled) return;
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			checked = !checked;
			onChange?.(checked);
		}
	}
</script>

<label
	class="checkbox-wrapper {className}"
	class:disabled
	class:error
	class:size-s={size === 's'}
	class:size-m={size === 'm'}
>
	<span class="checkbox-container">
		<input type="checkbox" class="checkbox-input" {checked} {disabled} onchange={handleChange} />
		<span
			class="checkbox-box"
			class:checked
			class:indeterminate
			role="checkbox"
			aria-checked={indeterminate ? 'mixed' : checked}
			tabindex={disabled ? -1 : 0}
			onkeydown={handleKeyDown}
		>
			{#if checked && !indeterminate}
				<svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
					<path
						d="M13.3334 4L6.00008 11.3333L2.66675 8"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			{/if}
			{#if indeterminate}
				<svg class="checkbox-icon" viewBox="0 0 16 16" fill="none">
					<path d="M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
				</svg>
			{/if}
		</span>
	</span>
	{#if label || description}
		<span class="checkbox-content">
			{#if label}
				<span class="checkbox-label">{label}</span>
			{/if}
			{#if description}
				<span class="checkbox-description">{description}</span>
			{/if}
		</span>
	{/if}
</label>

<style>
	.checkbox-wrapper {
		display: inline-flex;
		align-items: flex-start;
		gap: var(--spacing-3x, 12px);
		cursor: pointer;
		user-select: none;
	}

	.checkbox-wrapper.disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.checkbox-container {
		position: relative;
		flex-shrink: 0;
	}

	.checkbox-input {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
		pointer-events: none;
	}

	.checkbox-box {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid var(--border-base-main, #c8c6c6);
		border-radius: var(--border-radius-s, 4px);
		background: var(--background-base-primary, #ffffff);
		transition: all 0.2s ease;
	}

	.size-s .checkbox-box {
		width: 16px;
		height: 16px;
	}

	.size-m .checkbox-box {
		width: 20px;
		height: 20px;
	}

	.checkbox-box:hover:not(.checkbox-wrapper.disabled .checkbox-box) {
		border-color: var(--border-accent-default, #009b3a);
	}

	.checkbox-box:focus-visible {
		outline: 2px solid var(--border-accent-default, #009b3a);
		outline-offset: 2px;
	}

	.checkbox-box.checked,
	.checkbox-box.indeterminate {
		background: var(--background-accent-default, #009b3a);
		border-color: var(--border-accent-default, #009b3a);
	}

	.error .checkbox-box {
		border-color: var(--border-error, #e53935);
	}

	.error .checkbox-box.checked,
	.error .checkbox-box.indeterminate {
		background: var(--background-error, #e53935);
		border-color: var(--border-error, #e53935);
	}

	.checkbox-icon {
		color: var(--content-on-accent, #ffffff);
	}

	.size-s .checkbox-icon {
		width: 10px;
		height: 10px;
	}

	.size-m .checkbox-icon {
		width: 12px;
		height: 12px;
	}

	.checkbox-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-1x, 4px);
		padding-top: 1px;
	}

	.checkbox-label {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-primary, #212121);
	}

	.size-s .checkbox-label {
		font-size: 14px;
		line-height: 20px;
	}

	.checkbox-description {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-secondary, #6e6d6d);
	}

	.size-s .checkbox-description {
		font-size: 12px;
		line-height: 16px;
	}

	.disabled .checkbox-label,
	.disabled .checkbox-description {
		color: var(--content-base-disabled, #9e9e9e);
	}
</style>

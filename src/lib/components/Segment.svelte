<script lang="ts">
	interface SegmentOption {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		options: SegmentOption[];
		value?: string;
		size?: 's' | 'm' | 'l';
		fullWidth?: boolean;
		disabled?: boolean;
		class?: string;
		onChange?: (value: string) => void;
	}

	let {
		options = [],
		value = $bindable(options[0]?.value ?? ''),
		size = 'm',
		fullWidth = false,
		disabled = false,
		class: className = '',
		onChange
	}: Props = $props();

	let containerRef: HTMLDivElement;
	let indicatorStyle = $state('');

	function handleSelect(optionValue: string, optionDisabled?: boolean) {
		if (disabled || optionDisabled) return;
		value = optionValue;
		onChange?.(optionValue);
	}

	function updateIndicator() {
		if (!containerRef) return;
		const activeButton = containerRef.querySelector('.segment-option.active') as HTMLElement;
		if (activeButton) {
			indicatorStyle = `width: ${activeButton.offsetWidth}px; transform: translateX(${activeButton.offsetLeft}px);`;
		}
	}

	$effect(() => {
		value;
		updateIndicator();
	});

	$effect(() => {
		if (containerRef) {
			const observer = new ResizeObserver(() => updateIndicator());
			observer.observe(containerRef);
			return () => observer.disconnect();
		}
	});
</script>

<div
	bind:this={containerRef}
	class="segment-container {className}"
	class:size-s={size === 's'}
	class:size-m={size === 'm'}
	class:size-l={size === 'l'}
	class:full-width={fullWidth}
	class:disabled
	role="tablist"
>
	<div class="segment-indicator" style={indicatorStyle}></div>
	{#each options as option}
		<button
			type="button"
			class="segment-option"
			class:active={value === option.value}
			class:option-disabled={option.disabled}
			role="tab"
			aria-selected={value === option.value}
			disabled={disabled || option.disabled}
			onclick={() => handleSelect(option.value, option.disabled)}
		>
			{option.label}
		</button>
	{/each}
</div>

<style>
	.segment-container {
		display: inline-flex;
		position: relative;
		background: var(--background-base-secondary, #f5f5f5);
		border-radius: var(--border-radius-l, 12px);
		padding: 4px;
		gap: 4px;
	}

	.segment-container.full-width {
		width: 100%;
	}

	.segment-container.disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.segment-indicator {
		position: absolute;
		top: 4px;
		left: 0;
		height: calc(100% - 8px);
		background: var(--background-base-primary, #ffffff);
		border-radius: var(--border-radius-m, 8px);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
		transition: all 0.2s ease;
	}

	.segment-option {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background: transparent;
		cursor: pointer;
		font-family: 'Rubik', sans-serif;
		font-weight: 500;
		color: var(--content-base-secondary, #6e6d6d);
		transition: color 0.2s ease;
		white-space: nowrap;
	}

	.full-width .segment-option {
		flex: 1;
	}

	.size-s .segment-option {
		height: 32px;
		padding: 0 var(--spacing-3x, 12px);
		font-size: 14px;
		line-height: 20px;
	}

	.size-m .segment-option {
		height: 40px;
		padding: 0 var(--spacing-4x, 16px);
		font-size: 14px;
		line-height: 20px;
	}

	.size-l .segment-option {
		height: 48px;
		padding: 0 var(--spacing-5x, 20px);
		font-size: 16px;
		line-height: 24px;
	}

	.segment-option:hover:not(.active):not(.option-disabled) {
		color: var(--content-base-primary, #212121);
	}

	.segment-option.active {
		color: var(--content-base-primary, #212121);
	}

	.segment-option.option-disabled {
		color: var(--content-base-disabled, #bdbdbd);
		cursor: not-allowed;
	}
</style>

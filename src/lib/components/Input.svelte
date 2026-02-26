<script lang="ts">
	interface Props {
		value?: string;
		placeholder?: string;
		label?: string;
		hint?: string;
		type?: 'text' | 'tel' | 'email' | 'password' | 'number' | 'date';
		size?: 'm' | 'l';
		disabled?: boolean;
		required?: boolean;
		error?: string;
		iconRight?: string;
		iconLeft?: string;
		clearable?: boolean;
		class?: string;
		onInput?: (value: string) => void;
		onChange?: (value: string) => void;
	}

	let {
		value = $bindable(''),
		placeholder = '',
		label = '',
		hint = '',
		type = 'text',
		size = 'm',
		disabled = false,
		required = false,
		error = '',
		iconRight = '',
		iconLeft = '',
		clearable = false,
		class: className = '',
		onInput,
		onChange
	}: Props = $props();

	let isFocused = $state(false);
	let inputElement: HTMLInputElement;

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		value = target.value;
		onInput?.(value);
	}

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		onChange?.(target.value);
	}

	function handleClear() {
		value = '';
		inputElement?.focus();
		onInput?.('');
		onChange?.('');
	}

	function handleFocus() {
		isFocused = true;
	}

	function handleBlur() {
		isFocused = false;
	}

	const hasError = $derived(!!error);
	const hasValue = $derived(!!value);
	const isFloating = $derived(isFocused || hasValue);
	const showClearButton = $derived(clearable && value && !disabled);
</script>

<div class="input-wrapper {className}">
	<div
		class="input-container"
		class:focused={isFocused}
		class:disabled
		class:error={hasError}
		class:size-m={size === 'm'}
		class:size-l={size === 'l'}
		class:floating={isFloating}
	>
		{#if iconLeft}
			<div class="icon icon-left">
				<img src={iconLeft} alt="" />
			</div>
		{/if}

		<div class="content-box">
			{#if label}
				<label
					class="label"
					class:label-floating={isFloating}
					for={label}
				>
					{label}
					{#if required}
						<span class="required">*</span>
					{/if}
				</label>
			{/if}
			<input
				bind:this={inputElement}
				id={label}
				{type}
				class="input-field"
				class:has-label={!!label}
				class:input-floating={isFloating}
				placeholder={label ? '' : placeholder}
				{disabled}
				{value}
				oninput={handleInput}
				onchange={handleChange}
				onfocus={handleFocus}
				onblur={handleBlur}
			/>
		</div>

		{#if showClearButton}
			<button type="button" class="clear-button" onclick={handleClear} aria-label="Clear">
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path
						d="M12 4L4 12M4 4L12 12"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		{/if}

		{#if iconRight && !showClearButton}
			<div class="icon icon-right">
				<img src={iconRight} alt="" />
			</div>
		{/if}
	</div>

	{#if hint && !hasError}
		<p class="hint">{hint}</p>
	{/if}

	{#if hasError}
		<p class="error-message">{error}</p>
	{/if}
</div>

<style>
	.input-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.input-container {
		background: var(--background-base-primary, #f5f5f5);
		border: 1px solid var(--border-base-main, #c8c6c6);
		border-radius: var(--border-radius-l, 12px);
		display: flex;
		align-items: center;
		gap: var(--spacing-3x, 12px);
		padding: 0 var(--spacing-5x, 20px);
		position: relative;
		transition: all 0.2s ease;
	}

	.input-container.size-m {
		height: 56px;
	}

	.input-container.size-l {
		height: 64px;
	}

	.input-container.focused {
		border-color: var(--border-accent-default, #009b3a);
		background: var(--background-base-primary, #ffffff);
	}

	.input-container.error {
		border-color: var(--border-error, #e53935);
	}

	.input-container.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.content-box {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
		position: relative;
		height: 100%;
		justify-content: center;
	}

	.label {
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-secondary, #6e6d6d);
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		transition: all 0.2s ease;
		transform-origin: left center;
	}

	.label-floating {
		font-size: 12px;
		line-height: 16px;
		top: 8px;
		transform: translateY(0);
	}

	.input-container.focused .label {
		color: var(--content-accent-default, #009b3a);
	}

	.input-container.error .label {
		color: var(--content-error, #e53935);
	}

	.required {
		color: var(--content-error, #e53935);
	}

	.input-field {
		width: 100%;
		border: none;
		background: transparent;
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-primary, #212121);
		outline: none;
		padding: 0;
	}

	.input-field.has-label {
		padding-top: 16px;
	}

	.input-field::placeholder {
		color: var(--content-base-secondary, #6e6d6d);
	}

	.input-field:disabled {
		cursor: not-allowed;
	}

	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: 24px;
		height: 24px;
	}

	.icon img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.clear-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border: none;
		background: transparent;
		cursor: pointer;
		padding: 0;
		color: var(--content-base-secondary, #6e6d6d);
		flex-shrink: 0;
	}

	.clear-button:hover {
		color: var(--content-base-primary, #212121);
	}

	.hint {
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		color: var(--content-base-secondary, #6e6d6d);
		margin: 4px 0 0 0;
		padding: 0 var(--spacing-5x, 20px);
	}

	.error-message {
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		color: var(--content-error, #e53935);
		margin: 4px 0 0 0;
		padding: 0 var(--spacing-5x, 20px);
	}
</style>

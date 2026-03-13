<script lang="ts">
	interface Props {
		open: boolean;
		title: string;
		placeholder?: string;
		value: string;
		suggestions?: string[];
		onSave: (value: string) => void;
		onClose: () => void;
	}

	let { open = $bindable(false), title, placeholder = '', value, suggestions = [], onSave, onClose }: Props = $props();

	let inputValue = $state('');

	function portal(node: HTMLElement) {
		const target = document.querySelector('.card-layout');
		if (target) {
			target.appendChild(node);
		}
		return {
			destroy() {
				node.remove();
			}
		};
	}

	$effect(() => {
		if (open) {
			inputValue = value;
		}
	});

	function handleSave() {
		onSave(inputValue.trim());
		onClose();
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onClose();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
		if (event.key === 'Enter' && inputValue.trim()) {
			handleSave();
		}
	}
</script>

{#if open}
	<div
		class="modal-backdrop"
		use:portal
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="button"
		tabindex="0"
	>
		<div class="modal-content">
			<div class="modal-header">
				<h2 class="modal-title">{title}</h2>
				<button class="close-button" onclick={onClose} aria-label="Закрыть">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path
							d="M18 6L6 18M6 6L18 18"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</div>

			<div class="input-container">
				<input
					type="text"
					class="text-input"
					{placeholder}
					bind:value={inputValue}
					autofocus
				/>
				{#if suggestions.length > 0}
					<div class="suggestions">
						{#each suggestions as suggestion}
							<button
								type="button"
								class="suggestion-item"
								onclick={() => { inputValue = suggestion; }}
							>
								{suggestion}
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<div class="modal-footer">
				<button class="save-button" onclick={handleSave} disabled={!inputValue.trim()}>
					Готово
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: flex-end;
		justify-content: center;
		z-index: 1000;
		animation: fadeIn 0.2s ease-out;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.modal-content {
		background: white;
		width: 100%;
		border-radius: 16px 16px 0 0;
		display: flex;
		flex-direction: column;
		animation: slideUp 0.3s ease-out;
	}

	@keyframes slideUp {
		from { transform: translateY(100%); }
		to { transform: translateY(0); }
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px 16px;
		border-bottom: 1px solid #e0e0e0;
	}

	.modal-title {
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 20px;
		line-height: 28px;
		color: var(--content-base-primary, #212121);
		margin: 0;
	}

	.close-button {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--content-base-secondary, #6e6d6d);
	}

	.close-button:hover {
		color: var(--content-base-primary, #212121);
	}

	.input-container {
		padding: 16px;
	}

	.text-input {
		width: 100%;
		padding: 14px 16px;
		font-family: 'Roboto', sans-serif;
		font-size: 16px;
		line-height: 24px;
		border: 1px solid #e0e0e0;
		border-radius: 12px;
		outline: none;
		transition: border-color 0.2s ease;
		box-sizing: border-box;
	}

	.text-input:focus {
		border-color: var(--border-accent-default, #009b3a);
	}

	.modal-footer {
		padding: 8px 16px 24px;
	}

	.save-button {
		width: 100%;
		height: 52px;
		background: var(--background-accent-default, #009b3a);
		color: #ffffff;
		border: none;
		border-radius: 12px;
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.save-button:hover:not(:disabled) {
		background: var(--background-accent-hover, #008833);
	}

	.save-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.suggestions {
		display: flex;
		flex-direction: column;
		margin-top: 8px;
		border: 1px solid #e0e0e0;
		border-radius: 12px;
		overflow: hidden;
	}

	.suggestion-item {
		background: none;
		border: none;
		border-bottom: 1px solid #f0f0f0;
		padding: 12px 16px;
		font-family: 'Roboto', sans-serif;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-primary, #212121);
		text-align: left;
		cursor: pointer;
		transition: background 0.15s ease;
	}

	.suggestion-item:last-child {
		border-bottom: none;
	}

	.suggestion-item:hover {
		background: #f5f5f5;
	}
</style>

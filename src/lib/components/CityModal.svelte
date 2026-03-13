<script lang="ts">
	interface Props {
		open: boolean;
		cities: string[];
		onSelect: (city: string) => void;
		onClose: () => void;
	}

	let { open = $bindable(false), cities, onSelect, onClose }: Props = $props();

	let searchQuery = $state('');
	let modalElement: HTMLDivElement;

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

	const filteredCities = $derived(
		searchQuery
			? cities.filter((city) => city.toLowerCase().includes(searchQuery.toLowerCase()))
			: cities
	);

	function handleSelect(city: string) {
		onSelect(city);
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
	}

	$effect(() => {
		if (!open) {
			searchQuery = '';
		}
	});
</script>

{#if open}
	<div
		class="modal-backdrop"
		use:portal
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
		role="button"
		tabindex="0"
		bind:this={modalElement}
	>
		<div class="modal-content">
			<div class="modal-header">
				<h2 class="modal-title">Выберите город</h2>
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

			<div class="search-container">
				<svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path
						d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
						stroke="#6E6D6D"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M19 19L14.65 14.65"
						stroke="#6E6D6D"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<input
					type="text"
					class="search-input"
					placeholder="Поиск города"
					bind:value={searchQuery}
				/>
			</div>

			<div class="cities-list">
				{#if filteredCities.length > 0}
					{#each filteredCities as city}
						<button class="city-item" onclick={() => handleSelect(city)}>
							{city}
						</button>
					{/each}
				{:else}
					<div class="no-results">Город не найден</div>
				{/if}
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
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.modal-content {
		background: white;
		width: 100%;
		max-height: 80%;
		border-radius: 16px 16px 0 0;
		display: flex;
		flex-direction: column;
		animation: slideUp 0.3s ease-out;
	}

	@keyframes slideUp {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
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
		transition: color 0.2s ease;
	}

	.close-button:hover {
		color: var(--content-base-primary, #212121);
	}

	.search-container {
		position: relative;
		padding: 16px;
		border-bottom: 1px solid #e0e0e0;
	}

	.search-icon {
		position: absolute;
		left: 28px;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: 12px 16px 12px 44px;
		font-family: 'Roboto', sans-serif;
		font-size: 16px;
		line-height: 24px;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		outline: none;
		transition: border-color 0.2s ease;
	}

	.search-input:focus {
		border-color: var(--border-accent-default, #009b3a);
	}

	.cities-list {
		flex: 1;
		overflow-y: auto;
		padding: 8px 0;
	}

	.city-item {
		width: 100%;
		padding: 16px;
		text-align: left;
		background: none;
		border: none;
		font-family: 'Roboto', sans-serif;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-primary, #212121);
		cursor: pointer;
		transition: background-color 0.2s ease;
		border-bottom: 1px solid #f5f5f5;
	}

	.city-item:hover {
		background-color: #f5f5f5;
	}

	.city-item:active {
		background-color: #e0e0e0;
	}

	.no-results {
		padding: 32px 16px;
		text-align: center;
		font-family: 'Roboto', sans-serif;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-secondary, #6e6d6d);
	}
</style>

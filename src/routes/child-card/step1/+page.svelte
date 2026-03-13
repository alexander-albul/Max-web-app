<script lang="ts">
	import { goto } from '$app/navigation';
	import Stepper from '$lib/components/Stepper.svelte';
	import SectionMessage from '$lib/components/SectionMessage.svelte';
	import Button from '$lib/components/Button.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import CityModal from '$lib/components/CityModal.svelte';
	import { tatarstanCities } from '$lib/data/tatarstan-cities';

	const steps = [
		{ label: 'Оформление', description: 'Выберите дизайн карты и загрузите фото' },
		{ label: 'Анкета' },
		{ label: 'Код' },
		{ label: 'Паспорт' },
		{ label: 'Документ ребёнка' },
		{ label: 'Отделение' }
	];

	let selectedChildDesign = $state(0);
	let selectedAdultDesign = $state(0);
	let selectedCity = $state<string | null>(null);
	let isCityModalOpen = $state(false);
	let submitted = $state(false);

	const cityError = $derived(submitted && !selectedCity ? 'Обязательное поле' : '');

	// Дизайны детской карты
	const childCardDesigns = [
		{ id: 1, name: 'Стандарт', image: '/cards/child-1.jpg' },
		{ id: 2, name: 'Светодиодная', image: '/cards/child-2.jpg' },
		{ id: 3, name: 'Светодиод', image: '/cards/child-3.jpg' }
	];

	// Дизайны карты жителя РТ
	const adultCardDesigns = [
		{ id: 1, name: 'Классический', image: '/cards/adult-1.jpg' },
		{ id: 2, name: 'Современный', image: '/cards/adult-2.jpg' },
		{ id: 3, name: 'Минималистичный', image: '/cards/adult-3.jpg' }
	];

	function handleNext() {
		submitted = true;
		if (!selectedCity) {
			setTimeout(() => {
				const firstError = document.querySelector('.city-button-error, .field-error');
				firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}, 0);
			return;
		}
		goto('/child-card/step2');
	}

	function handleCitySelect(city: string) {
		selectedCity = city;
	}

	function openCityModal() {
		isCityModalOpen = true;
	}

	function closeCityModal() {
		isCityModalOpen = false;
	}
</script>

<svelte:head>
	<title>Оформление детской карты - Шаг 1</title>
</svelte:head>

<div class="page">
	<BackButton onclick={() => goto('/main-menu')} />

	<Stepper {steps} currentStep={1} title={`Заявка на выпуск \n Детской карты`} />

	<div class="content">
		<SectionMessage type="info" showIcon={false}>
			<p class="font-medium">Для заполнения заявки приготовьте:</p>
			<ul>
				<li>свой паспорт</li>
				<li>свидетельство о рождении ребёнка</li>
				<li>паспорт ребёнка, если ребёнок старше 14 лет</li>
				<li>номер телефона ребёнка</li>
			</ul>
		</SectionMessage>

		<Divider spacing="m" />

		<div class="section">
			<div class="section-header">
				<span class="section-title">Где будете получать карту?</span>
			</div>

			<div class="field-button-wrapper">
				<Button variant={'secondary'} size="l" fullWidth onClick={openCityModal} class="city-selector-button{cityError ? ' city-button-error' : ''}">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="location-icon">
						<path
							d="M12 2C16.3719 2 19.916 5.45414 19.916 9.71484C19.9159 14.8532 15.3631 19.5697 13.1631 21.5488C12.4929 22.1517 11.5071 22.1517 10.8369 21.5488C8.63685 19.5696 4.08409 14.8532 4.08398 9.71484C4.08398 5.45416 7.62815 2.00004 12 2ZM12 3.5C8.41993 3.50004 5.58398 6.31878 5.58398 9.71484C5.58404 11.8548 6.5413 14.0198 7.87402 15.9707C9.19473 17.904 10.789 19.4874 11.8408 20.4336C11.8987 20.4857 11.9543 20.501 12 20.501C12.0457 20.501 12.1013 20.4857 12.1592 20.4336C13.211 19.4874 14.8053 17.904 16.126 15.9707C17.4587 14.0198 18.416 11.8548 18.416 9.71484C18.416 6.31876 15.5801 3.5 12 3.5ZM12 6C14.2091 6 16 7.79086 16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10C8 7.79086 9.79086 6 12 6ZM12 7.5C10.6193 7.5 9.5 8.61929 9.5 10C9.5 11.3807 10.6193 12.5 12 12.5C13.3807 12.5 14.5 11.3807 14.5 10C14.5 8.61929 13.3807 7.5 12 7.5Z"
							fill={"#009b3a"}
						/>
					</svg>
					<span class="city-button-text">
						{selectedCity || 'Выберите населённый пункт'}
					</span>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="chevron-icon">
						<path
							d="M5 7.5L10 12.5L15 7.5"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</Button>
				{#if cityError}
					<p class="field-error">{cityError}</p>
				{/if}
			</div>
		</div>

		<Divider spacing="m" />

		<!-- Секция выбора дизайна детской карты -->
		<div class="section">
			<div class="section-header">
				<span class="section-title">Выберите дизайн Детской карты</span>
				<span class="section-subtitle">Карта будет выпущена в выбранном дизайне при наличии заготовок</span>
			</div>

			<div class="photo-preview">
				<img
					class="card-preview-image"
					src={childCardDesigns[selectedChildDesign].image}
					alt={childCardDesigns[selectedChildDesign].name}
				/>
			</div>

			<div class="designs-row">
				{#each childCardDesigns as design, index}
					<button
						type="button"
						class="design-card"
						class:selected={selectedChildDesign === index}
						onclick={() => (selectedChildDesign = index)}
					>
						<div
							class="design-preview"
							style="background-image: url({design.image}); background-size: cover; background-position: center;"
						></div>
						{#if selectedChildDesign === index}
							<div class="check-mark">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
									<circle cx="8" cy="8" r="8" fill="#009B3A" />
									<path
										d="M5 8L7 10L11 6"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
						{/if}
					</button>
				{/each}
			</div>
		</div>

		<Divider spacing="m" />

		<!-- Секция выбора дизайна карты жителя РТ -->
		<div class="section">
			<div class="section-header">
				<span class="section-title">Выберите дизайн Карты Жителя РТ</span>
				<span class="section-subtitle">Будет выпущена, если не была получена ранее. Выбранный дизайн будет применен при наличии заготовок</span>
			</div>

			<div class="photo-preview">
				<img
					class="card-preview-image"
					src={adultCardDesigns[selectedAdultDesign].image}
					alt={adultCardDesigns[selectedAdultDesign].name}
				/>
			</div>

			<div class="designs-row">
				{#each adultCardDesigns as design, index}
					<button
						type="button"
						class="design-card"
						class:selected={selectedAdultDesign === index}
						onclick={() => (selectedAdultDesign = index)}
					>
						<div
							class="design-preview"
							style="background-image: url({design.image}); background-size: cover; background-position: center;"
						></div>
						{#if selectedAdultDesign === index}
							<div class="check-mark">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
									<circle cx="8" cy="8" r="8" fill="#009B3A" />
									<path
										d="M5 8L7 10L11 6"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							</div>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<div class="footer">
		<Button variant="primary" fullWidth onClick={handleNext}>Продолжить</Button>
	</div>

	<CityModal
		bind:open={isCityModalOpen}
		cities={tatarstanCities}
		onSelect={handleCitySelect}
		onClose={closeCityModal}
	/>
</div>

<style>
	.page {
		position: relative;
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 24px;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 24px;
		flex: 1;
	}

	.section {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.section-header {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	ul {
		padding-left: 20px;
		margin: 0;
	}

	.section-title {
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-primary, #212121);
	}

	.section-subtitle {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-secondary, #6e6d6d);
	}

	.photo-preview {
		display: flex;
		justify-content: center;
		padding: 20px;
	}

	.card-preview-image {
		width: 200px;
		height: 126px;
		border-radius: 12px;
		object-fit: cover;
	}

	.designs-row {
		display: flex;
		gap: 12px;
		overflow-x: auto;
		padding-bottom: 8px;
		scrollbar-width: thin;
		scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
	}

	.designs-row::-webkit-scrollbar {
		height: 4px;
	}

	.designs-row::-webkit-scrollbar-track {
		background: transparent;
	}

	.designs-row::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 4px;
	}

	.design-card {
		position: relative;
		flex-shrink: 0;
		width: 122px;
		height: 77px;
		border-radius: 10px;
		border: 2px solid transparent;
		overflow: hidden;
		cursor: pointer;
		padding: 0;
		background: transparent;
		transition: border-color 0.2s ease;
	}

	.design-card.selected {
		border-color: var(--border-accent-default, #009b3a);
	}

	.design-preview {
		width: 100%;
		height: 100%;
	}

	.check-mark {
		position: absolute;
		top: 4px;
		right: 4px;
	}

	.footer {
		margin-top: auto;
		padding-top: 16px;
	}

	.field-button-wrapper {
		display: flex;
		flex-direction: column;
	}

	:global(.city-selector-button .label) {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
	}

	:global(.city-button-error) {
		border-color: var(--border-error, #e53935) !important;
	}

	.field-error {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		color: var(--content-error, #e53935);
		margin: 4px 0 0 0;
		padding: 0 20px;
	}

	.location-icon {
		flex-shrink: 0;
	}

	.city-button-text {
		flex: 1;
		text-align: left;
	}

	.chevron-icon {
		flex-shrink: 0;
	}
</style>

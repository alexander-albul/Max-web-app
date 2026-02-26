<script lang="ts">
	import { goto } from '$app/navigation';
	import Stepper from '$lib/components/Stepper.svelte';
	import SectionMessage from '$lib/components/SectionMessage.svelte';
	import Button from '$lib/components/Button.svelte';
	import Divider from '$lib/components/Divider.svelte';

	const steps = [
		{ label: 'Оформление', description: 'Выберите дизайн карты и загрузите фото' },
		{ label: 'Анкета' },
		{ label: 'Код' },
		{ label: 'Паспорт' },
		{ label: 'Отделение' }
	];

	let selectedDesign = $state(0);

	const cardDesigns = [
		{ id: 1, name: 'Классический', image: '/card-design-1.jpg' },
		{ id: 2, name: 'Современный', image: '/card-design-2.jpg' },
		{ id: 3, name: 'Минималистичный', image: '/card-design-3.jpg' }
	];

	function handleNext() {
		goto('/card/step2');
	}
</script>

<svelte:head>
	<title>Оформление карты - Шаг 1</title>
</svelte:head>

<div class="page">
	<div class="back-button">
		<button type="button" class="back-link" onclick={() => history.back()}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
	</div>

	<Stepper {steps} currentStep={1} />

	<div class="content">
		<SectionMessage type="info" title="Карта жителя Республики Татарстан">
			Оформите карту и получите доступ к льготам и скидкам на территории республики.
		</SectionMessage>

		<div class="section">
			<div class="section-header">
				<span class="section-title">Ваше фото</span>
			</div>
			<Button variant="secondary" fullWidth>
				<span class="upload-content">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
						<path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						<polyline points="17,8 12,3 7,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						<line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
					Загрузить фото
				</span>
			</Button>
		</div>

		<Divider spacing="m" />

		<div class="section">
			<div class="section-header">
				<span class="section-title">Выберите дизайн карты</span>
				<span class="section-subtitle">Вы можете выбрать понравившийся дизайн</span>
			</div>

			<div class="photo-preview">
				<div class="photo-placeholder">
					<svg width="64" height="64" viewBox="0 0 64 64" fill="none">
						<circle cx="32" cy="24" r="12" stroke="currentColor" stroke-width="2"/>
						<path d="M12 56C12 45 21 36 32 36C43 36 52 45 52 56" stroke="currentColor" stroke-width="2"/>
					</svg>
				</div>
			</div>

			<div class="designs-row">
				{#each cardDesigns as design, index}
					<button
						type="button"
						class="design-card"
						class:selected={selectedDesign === index}
						onclick={() => selectedDesign = index}
					>
						<div class="design-preview" style="background: linear-gradient(135deg, hsl({index * 60}, 70%, 60%), hsl({index * 60 + 30}, 70%, 40%));">
						</div>
						{#if selectedDesign === index}
							<div class="check-mark">
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
									<circle cx="8" cy="8" r="8" fill="#009B3A"/>
									<path d="M5 8L7 10L11 6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</div>
						{/if}
					</button>
				{/each}

				<button type="button" class="design-card more-designs">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
						<circle cx="4" cy="10" r="2" fill="currentColor"/>
						<circle cx="10" cy="10" r="2" fill="currentColor"/>
						<circle cx="16" cy="10" r="2" fill="currentColor"/>
					</svg>
					<span>Ещё</span>
				</button>
			</div>
		</div>
	</div>

	<div class="footer">
		<Button variant="primary" fullWidth onClick={handleNext}>
			Продолжить
		</Button>
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 24px;
	}

	.back-button {
		margin-bottom: -12px;
	}

	.back-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border: none;
		background: transparent;
		cursor: pointer;
		padding: 0;
		color: var(--content-base-primary, #212121);
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

	.section-title {
		font-family: 'Rubik', sans-serif;
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-primary, #212121);
	}

	.section-subtitle {
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-secondary, #6e6d6d);
	}

	.upload-content {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.photo-preview {
		display: flex;
		justify-content: center;
		padding: 20px;
	}

	.photo-placeholder {
		width: 200px;
		height: 126px;
		background: var(--background-base-secondary, #f5f5f5);
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--content-base-tertiary, #9e9e9e);
	}

	.designs-row {
		display: flex;
		gap: 12px;
		overflow-x: auto;
		padding-bottom: 8px;
	}

	.design-card {
		position: relative;
		flex-shrink: 0;
		width: 122px;
		height: 77px;
		border-radius: 8px;
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

	.design-card.more-designs {
		background: var(--background-base-secondary, #f5f5f5);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4px;
		color: var(--content-base-secondary, #6e6d6d);
		font-family: 'Rubik', sans-serif;
		font-size: 12px;
	}

	.footer {
		margin-top: auto;
		padding-top: 16px;
	}
</style>

<script lang="ts">
	import { goto } from '$app/navigation';
	import Stepper from '$lib/components/Stepper.svelte';
	import Segment from '$lib/components/Segment.svelte';
	import Button from '$lib/components/Button.svelte';
	import InteractiveMap from '$lib/components/InteractiveMap.svelte';

	const steps = [
		{ label: 'Оформление' },
		{ label: 'Анкета' },
		{ label: 'Код' },
		{ label: 'Паспорт' },
		{ label: 'Отделение', description: 'Выберите место получения карты' }
	];

	const deliveryOptions = [
		{ value: 'office', label: 'В отделении' },
		{ value: 'delivery', label: 'Доставка' }
	];

	let deliveryType = $state('office');
	let selectedOffice = $state<typeof offices[0] | null>(null);

	const offices = [
		{
			id: 1,
			address: 'Казань, ул. Альберта Камалеева, 89',
			workHours: 'Пн: 14-18, Вт-Пт: 09-18, Сб: 9-16, Вс – выходной',
			breakTime: 'Перерыв: Пн-Сб: 12-13',
			phone: '+7 800 200-53-03',
			x: 55,
			y: 30
		},
		{
			id: 2,
			address: 'Казань, ул. Баумана, 44/8',
			workHours: 'Пн-Пт: 09:00-20:00, Сб-Вс: 10:00-18:00',
			phone: '+7 800 200-53-03',
			x: 35,
			y: 45
		},
		{
			id: 3,
			address: 'Казань, пр. Ямашева, 36',
			workHours: 'Пн-Пт: 09:00-19:00, Сб: 10:00-16:00',
			phone: '+7 800 200-53-03',
			x: 70,
			y: 60
		},
		{
			id: 4,
			address: 'Казань, ул. Декабристов, 85А',
			workHours: 'Пн-Пт: 09:00-18:00',
			phone: '+7 800 200-53-03',
			x: 25,
			y: 70
		},
		{
			id: 5,
			address: 'Казань, ул. Петербургская, 52',
			workHours: 'Пн-Пт: 10:00-19:00, Сб: 10:00-15:00',
			phone: '+7 800 200-53-03',
			x: 80,
			y: 40
		}
	];

	function handleSelectOffice(office: typeof offices[0]) {
		selectedOffice = office;
	}

	function handleSubmit() {
		if (deliveryType === 'office' && !selectedOffice) {
			return;
		}
		goto('/card/success');
	}

	const canSubmit = $derived(
		deliveryType === 'delivery' || (deliveryType === 'office' && selectedOffice !== null)
	);
</script>

<svelte:head>
	<title>Оформление карты - Шаг 5</title>
</svelte:head>

<div class="page">
	<div class="back-button">
		<button type="button" class="back-link" onclick={() => history.back()}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
	</div>

	<Stepper {steps} currentStep={5} />

	<div class="content">
		<div class="delivery-section">
			<h3 class="section-title">Способ получения</h3>
			<Segment options={deliveryOptions} bind:value={deliveryType} />
		</div>

		{#if deliveryType === 'office'}
			<div class="office-section">
				<div class="section-header">
					<h3 class="section-title">Отделение банка</h3>
					{#if selectedOffice}
						<button type="button" class="link-button" onclick={() => selectedOffice = null}>
							Сбросить
						</button>
					{/if}
				</div>

				{#if selectedOffice}
					<div class="selected-office">
						<div class="office-info">
							<p class="office-address">{selectedOffice.address}</p>
							<p class="office-hours">{selectedOffice.workHours}</p>
							{#if selectedOffice.breakTime}
								<p class="office-break">{selectedOffice.breakTime}</p>
							{/if}
							<p class="office-phone">{selectedOffice.phone}</p>
						</div>
						<button type="button" class="change-button" onclick={() => selectedOffice = null}>
							Изменить
						</button>
					</div>
				{/if}

				<div class="map-section">
					<p class="map-hint">Кликните на метку для выбора отделения</p>
					<InteractiveMap
						{offices}
						bind:selectedOffice
						onSelectOffice={handleSelectOffice}
					/>
				</div>
			</div>
		{:else}
			<div class="delivery-info">
				<p class="delivery-note">
					Доставка осуществляется курьером в течение 3-5 рабочих дней после изготовления карты.
					Стоимость доставки — бесплатно.
				</p>
			</div>
		{/if}
	</div>

	<div class="footer">
		<Button variant="primary" fullWidth onClick={handleSubmit} disabled={!canSubmit}>
			Отправить заявку
		</Button>
		{#if deliveryType === 'office' && !selectedOffice}
			<p class="footer-hint">Выберите отделение на карте для продолжения</p>
		{/if}
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

	.delivery-section,
	.office-section {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.section-title {
		font-family: 'Rubik', sans-serif;
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-primary, #212121);
		margin: 0;
	}

	.link-button {
		font-family: 'Rubik', sans-serif;
		font-weight: 500;
		font-size: 14px;
		color: var(--content-accent-default, #009b3a);
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.selected-office {
		background: var(--background-base-secondary, #f5f5f5);
		border-radius: 12px;
		padding: 16px;
	}

	.office-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-bottom: 12px;
	}

	.office-address {
		font-family: 'Rubik', sans-serif;
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-primary, #212121);
		margin: 0;
	}

	.office-hours,
	.office-break,
	.office-phone {
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-secondary, #6e6d6d);
		margin: 0;
	}

	.change-button {
		font-family: 'Rubik', sans-serif;
		font-weight: 500;
		font-size: 14px;
		color: var(--content-accent-default, #009b3a);
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.map-section {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.map-hint {
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		color: var(--content-base-secondary, #6e6d6d);
		margin: 0;
	}

	.delivery-info {
		background: var(--background-base-secondary, #f5f5f5);
		border-radius: 12px;
		padding: 16px;
	}

	.delivery-note {
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-secondary, #6e6d6d);
		margin: 0;
	}

	.footer {
		margin-top: auto;
		padding-top: 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.footer-hint {
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		color: var(--content-base-secondary, #6e6d6d);
		margin: 0;
		text-align: center;
	}
</style>

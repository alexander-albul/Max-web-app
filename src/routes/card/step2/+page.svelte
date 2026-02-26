<script lang="ts">
	import { goto } from '$app/navigation';
	import Stepper from '$lib/components/Stepper.svelte';
	import Input from '$lib/components/Input.svelte';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Button from '$lib/components/Button.svelte';
	import Divider from '$lib/components/Divider.svelte';

	const steps = [
		{ label: 'Оформление' },
		{ label: 'Анкета', description: 'Заполните персональные данные' },
		{ label: 'Код' },
		{ label: 'Паспорт' },
		{ label: 'Отделение' }
	];

	// Form data
	let lastName = $state('');
	let firstName = $state('');
	let middleName = $state('');
	let noMiddleName = $state(false);
	let birthDate = $state<Date | null>(null);
	let phone = $state('');

	// Agreements
	let agreePersonalData = $state(false);
	let agreeTerms = $state(false);

	const isFormValid = $derived(
		lastName && firstName && (middleName || noMiddleName) && birthDate && phone && agreePersonalData && agreeTerms
	);

	function handleGosuslugi() {
		// Handle Gosuslugi auth
	}

	function handleNext() {
		goto('/card/step3');
	}
</script>

<svelte:head>
	<title>Оформление карты - Шаг 2</title>
</svelte:head>

<div class="page">
	<div class="back-button">
		<button type="button" class="back-link" onclick={() => history.back()}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
	</div>

	<Stepper {steps} currentStep={2} />

	<div class="content">
		<!-- Gosuslugi Block -->
		<div class="gosuslugi-block">
			<p class="gosuslugi-text">
				Вы можете авторизоваться через портал «Госуслуги» и автоматически заполнить анкету
			</p>
			<button type="button" class="gosuslugi-button" onclick={handleGosuslugi}>
				<svg width="28" height="28" viewBox="0 0 28 28" fill="none">
					<circle cx="14" cy="14" r="14" fill="#0D4CD3"/>
					<path d="M8 14L12 18L20 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
				<span>Заполнить через Госуслуги</span>
			</button>
		</div>

		<!-- Form Section -->
		<div class="form-section">
			<h3 class="section-title">Или заполните вручную</h3>

			<div class="form-fields">
				<Input
					bind:value={lastName}
					label="Фамилия"
					required
				/>

				<Input
					bind:value={firstName}
					label="Имя"
					required
				/>

				<div class="field-with-checkbox">
					<Input
						bind:value={middleName}
						label="Отчество"
						disabled={noMiddleName}
					/>
					<Checkbox
						bind:checked={noMiddleName}
						label="Нет отчества"
						size="s"
					/>
				</div>

				<DatePicker
					bind:value={birthDate}
					label="Дата рождения"
					required
					maxDate={new Date()}
				/>

				<Input
					bind:value={phone}
					label="Телефон"
					type="tel"
					required
				/>
			</div>
		</div>

		<Divider spacing="m" />

		<!-- Agreements -->
		<div class="agreements">
			<Checkbox
				bind:checked={agreePersonalData}
				label="Даю согласие на обработку персональных данных"
				description="В соответствии с Федеральным законом №152-ФЗ"
			/>
			<Checkbox
				bind:checked={agreeTerms}
				label="Принимаю условия использования сервиса"
				description="Ознакомлен с правилами и условиями"
			/>
		</div>
	</div>

	<div class="footer">
		<Button variant="primary" fullWidth onClick={handleNext} disabled={!isFormValid}>
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

	.gosuslugi-block {
		background: var(--background-base-secondary, #f5f5f5);
		border-radius: 12px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.gosuslugi-text {
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-primary, #212121);
		margin: 0;
	}

	.gosuslugi-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		height: 48px;
		background: #0D4CD3;
		color: #ffffff;
		border: none;
		border-radius: 12px;
		font-family: 'Rubik', sans-serif;
		font-weight: 500;
		font-size: 14px;
		cursor: pointer;
		transition: opacity 0.2s ease;
	}

	.gosuslugi-button:hover {
		opacity: 0.9;
	}

	.form-section {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.section-title {
		font-family: 'Rubik', sans-serif;
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-primary, #212121);
		margin: 0;
	}

	.form-fields {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.field-with-checkbox {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.agreements {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.footer {
		margin-top: auto;
		padding-top: 16px;
	}
</style>

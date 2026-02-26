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
		{ label: 'Анкета' },
		{ label: 'Код' },
		{ label: 'Паспорт', description: 'Укажите паспортные данные' },
		{ label: 'Отделение' }
	];

	// Form data
	let passportSeries = $state('');
	let passportNumber = $state('');
	let issueDate = $state<Date | null>(null);
	let issuedBy = $state('');
	let departmentCode = $state('');
	let birthPlace = $state('');

	// Agreements
	let agreePersonalData = $state(false);
	let agreeTerms = $state(false);

	const isFormValid = $derived(
		passportSeries && passportNumber && issueDate && issuedBy && departmentCode && birthPlace && agreePersonalData && agreeTerms
	);

	function handleNext() {
		goto('/card/step5');
	}
</script>

<svelte:head>
	<title>Оформление карты - Шаг 4</title>
</svelte:head>

<div class="page">
	<div class="back-button">
		<button type="button" class="back-link" onclick={() => history.back()}>
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
	</div>

	<Stepper {steps} currentStep={4} />

	<div class="content">
		<div class="form-section">
			<h3 class="section-title">Паспортные данные</h3>

			<div class="form-fields">
				<Input
					bind:value={passportSeries}
					label="Серия паспорта"
					placeholder="0000"
					required
				/>

				<Input
					bind:value={passportNumber}
					label="Номер паспорта"
					placeholder="000000"
					required
				/>

				<DatePicker
					bind:value={issueDate}
					label="Дата выдачи"
					required
					maxDate={new Date()}
				/>

				<Input
					bind:value={issuedBy}
					label="Кем выдан"
					placeholder="Наименование органа"
					required
				/>

				<Input
					bind:value={departmentCode}
					label="Код подразделения"
					placeholder="000-000"
					required
				/>

				<Input
					bind:value={birthPlace}
					label="Место рождения"
					placeholder="Город, область, страна"
					required
				/>
			</div>
		</div>

		<Divider spacing="m" />

		<!-- Agreements -->
		<div class="agreements">
			<Checkbox
				bind:checked={agreePersonalData}
				label="Подтверждаю достоверность введённых данных"
				description="Я несу ответственность за предоставленную информацию"
			/>
			<Checkbox
				bind:checked={agreeTerms}
				label="Согласен на проверку данных"
				description="Банк имеет право проверить подлинность документов"
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

<script lang="ts">
	import { goto } from '$app/navigation';
	import Stepper from '$lib/components/Stepper.svelte';
	import Input from '$lib/components/Input.svelte';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Button from '$lib/components/Button.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import InputModal from '$lib/components/InputModal.svelte';

	const steps = [
		{ label: 'Оформление' },
		{ label: 'Анкета' },
		{ label: 'Код' },
		{ label: 'Паспорт', description: 'Укажите паспортные данные' },
		{ label: 'Отделение' }
	];

	// Autofill data
	const autofill = {
		passportSeries: '1624',
		passportNumber: '456789',
		issueDate: new Date(2015, 6, 10),
		departmentCode: '165-001',
		birthPlace: 'Казань, Республика Татарстан, Россия'
	};

	const issuedBySuggestions = [
		'МВД по Республике Татарстан',
		'ОУФМС России по РТ в Советском районе г. Казани',
		'ОУФМС России по РТ в Вахитовском районе г. Казани',
		'ОУФМС России по РТ в Ново-Савиновском районе г. Казани',
		'ОУФМС России по РТ в Авиастроительном районе г. Казани',
		'ОУФМС России по РТ в Приволжском районе г. Казани',
		'ОУФМС России по РТ в Кировском районе г. Казани',
		'ОМВД России по Набережночелнинскому р-ну РТ',
		'ОУФМС России по РТ в г. Набережные Челны',
		'ОМВД России по Нижнекамскому р-ну РТ'
	];

	const addressSuggestions = [
		'г. Казань, ул. Баумана, д. 1, кв. 5',
		'г. Казань, ул. Кремлёвская, д. 18, кв. 12',
		'г. Казань, пр. Победы, д. 42, кв. 88',
		'г. Казань, ул. Чистопольская, д. 67а, кв. 3',
		'г. Казань, ул. Карла Маркса, д. 10, кв. 21',
		'г. Набережные Челны, пр. Набережночелнинский, д. 5, кв. 14',
		'г. Нижнекамск, ул. Строителей, д. 30, кв. 7',
		'г. Альметьевск, ул. Ленина, д. 22, кв. 4',
		'г. Зеленодольск, ул. Советская, д. 8, кв. 11',
		'г. Бугульма, ул. Мира, д. 15, кв. 2'
	];

	// Form data
	let passportSeries = $state('');
	let passportNumber = $state('');
	let issueDate = $state<Date | null>(null);
	let issuedBy = $state('');
	let departmentCode = $state('');
	let birthPlace = $state('');
	let registrationAddress = $state('');
	let actualAddress = $state('');
	let sameAddress = $state(false);

	// Modals
	let isIssuedByModalOpen = $state(false);
	let isRegistrationAddressModalOpen = $state(false);
	let isActualAddressModalOpen = $state(false);

	// Agreements
	let agreePersonalData = $state(false);
	let agreeTerms = $state(false);

	// Validation
	let submitted = $state(false);

	const errors = $derived({
		passportSeries: submitted && !passportSeries ? 'Обязательное поле' : '',
		passportNumber: submitted && !passportNumber ? 'Обязательное поле' : '',
		issueDate: submitted && !issueDate ? 'Обязательное поле' : '',
		departmentCode: submitted && !departmentCode ? 'Обязательное поле' : '',
		issuedBy: submitted && !issuedBy ? 'Обязательное поле' : '',
		birthPlace: submitted && !birthPlace ? 'Обязательное поле' : '',
		registrationAddress: submitted && !registrationAddress ? 'Обязательное поле' : '',
		actualAddress: submitted && !sameAddress && !actualAddress ? 'Обязательное поле' : ''
	});

	$effect(() => {
		if (sameAddress) {
			actualAddress = registrationAddress;
		}
	});

	$effect(() => {
		const stored = localStorage.getItem('gosuslugi_data');
		if (stored) {
			try {
				const data = JSON.parse(stored);
				passportSeries = data.passportSeries ?? '';
				passportNumber = data.passportNumber ?? '';
				issueDate = data.issueDate ? new Date(data.issueDate) : null;
				issuedBy = data.issuedBy ?? '';
				departmentCode = data.departmentCode ?? '';
				birthPlace = data.birthPlace ?? '';
				registrationAddress = data.registrationAddress ?? '';
				actualAddress = data.actualAddress ?? '';
			} catch {}
		}
	});

	function handleNext() {
		submitted = true;
		const isValid =
			passportSeries &&
			passportNumber &&
			issueDate &&
			issuedBy &&
			departmentCode &&
			birthPlace &&
			registrationAddress &&
			(sameAddress || actualAddress);

		if (isValid) {
			goto('/card/step5');
		} else {
			setTimeout(() => {
				const firstError = document.querySelector('.input-container.error, .field-button-error, .error-message, .field-error');
				firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}, 0);
		}
	}
</script>




<svelte:head>
	<title>Оформление карты - Шаг 4</title>
</svelte:head>

<div class="page">
	<BackButton onclick={() => history.back()} />

	<Stepper {steps} currentStep={4} />

	<div class="content">
		<div class="form-section">
			<h3 class="section-title">Паспортные данные</h3>

			<div class="form-fields">
				<Input bind:value={passportSeries} label="Серия" placeholder="0000" required error={errors.passportSeries} onclick={() => { if (!passportSeries) passportSeries = autofill.passportSeries; }} />

				<Input bind:value={passportNumber} label="Номер" placeholder="000000" required error={errors.passportNumber} onclick={() => { if (!passportNumber) passportNumber = autofill.passportNumber; }} />

				<DatePicker bind:value={issueDate} label="Дата выдачи" required maxDate={new Date()} error={errors.issueDate} onclick={() => { if (!issueDate) issueDate = autofill.issueDate; }} />

				<Input
					bind:value={departmentCode}
					label="Код подразделения"
					placeholder="000-000"
					required
					error={errors.departmentCode}
					onclick={() => { if (!departmentCode) departmentCode = autofill.departmentCode; }}
				/>

				<div class="field-button-wrapper">
					<Button
						variant="secondary"
						size="l"
						fullWidth
						onClick={() => (isIssuedByModalOpen = true)}
						class="field-button{errors.issuedBy ? ' field-button-error' : ''}"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="field-icon">
							<path
								d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<span class="field-button-text">
							{issuedBy ? `Выдан ${issuedBy}` : 'Кем выдан'}
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
					{#if errors.issuedBy}
						<p class="field-error">{errors.issuedBy}</p>
					{/if}
				</div>

				<Input
					bind:value={birthPlace}
					label="Место рождения"
					placeholder="Город, область, страна"
					required
					error={errors.birthPlace}
					onclick={() => { if (!birthPlace) birthPlace = autofill.birthPlace; }}
				/>
			</div>
		</div>

		<Divider spacing="m" />

		<div class="form-section">
			<h3 class="section-title">Адрес регистрации</h3>

			<div class="field-button-wrapper">
				<Button
					variant="secondary"
					size="l"
					fullWidth
					onClick={() => (isRegistrationAddressModalOpen = true)}
					class="field-button{errors.registrationAddress ? ' field-button-error' : ''}"
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="field-icon">
						<path
							d="M12 2C16.3719 2 19.916 5.45414 19.916 9.71484C19.9159 14.8532 15.3631 19.5697 13.1631 21.5488C12.4929 22.1517 11.5071 22.1517 10.8369 21.5488C8.63685 19.5696 4.08409 14.8532 4.08398 9.71484C4.08398 5.45416 7.62815 2.00004 12 2ZM12 3.5C8.41993 3.50004 5.58398 6.31878 5.58398 9.71484C5.58404 11.8548 6.5413 14.0198 7.87402 15.9707C9.19473 17.904 10.789 19.4874 11.8408 20.4336C11.8987 20.4857 11.9543 20.501 12 20.501C12.0457 20.501 12.1013 20.4857 12.1592 20.4336C13.211 19.4874 14.8053 17.904 16.126 15.9707C17.4587 14.0198 18.416 11.8548 18.416 9.71484C18.416 6.31876 15.5801 3.5 12 3.5ZM12 6C14.2091 6 16 7.79086 16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10C8 7.79086 9.79086 6 12 6ZM12 7.5C10.6193 7.5 9.5 8.61929 9.5 10C9.5 11.3807 10.6193 12.5 12 12.5C13.3807 12.5 14.5 11.3807 14.5 10C14.5 8.61929 13.3807 7.5 12 7.5Z"
							fill="currentColor"
						/>
					</svg>
					<span class="field-button-text">
						{registrationAddress || 'Адрес регистрации'}
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
				{#if errors.registrationAddress}
					<p class="field-error">{errors.registrationAddress}</p>
				{/if}
			</div>
		</div>

		<div class="form-section">
			<h3 class="section-title">Фактический адрес</h3>

			<div class="field-button-wrapper">
				<Button
					variant="secondary"
					size="l"
					fullWidth
					disabled={sameAddress}
					onClick={() => (isActualAddressModalOpen = true)}
					class="field-button{errors.actualAddress ? ' field-button-error' : ''}"
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="field-icon">
						<path
							d="M12 2C16.3719 2 19.916 5.45414 19.916 9.71484C19.9159 14.8532 15.3631 19.5697 13.1631 21.5488C12.4929 22.1517 11.5071 22.1517 10.8369 21.5488C8.63685 19.5696 4.08409 14.8532 4.08398 9.71484C4.08398 5.45416 7.62815 2.00004 12 2ZM12 3.5C8.41993 3.50004 5.58398 6.31878 5.58398 9.71484C5.58404 11.8548 6.5413 14.0198 7.87402 15.9707C9.19473 17.904 10.789 19.4874 11.8408 20.4336C11.8987 20.4857 11.9543 20.501 12 20.501C12.0457 20.501 12.1013 20.4857 12.1592 20.4336C13.211 19.4874 14.8053 17.904 16.126 15.9707C17.4587 14.0198 18.416 11.8548 18.416 9.71484C18.416 6.31876 15.5801 3.5 12 3.5ZM12 6C14.2091 6 16 7.79086 16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10C8 7.79086 9.79086 6 12 6ZM12 7.5C10.6193 7.5 9.5 8.61929 9.5 10C9.5 11.3807 10.6193 12.5 12 12.5C13.3807 12.5 14.5 11.3807 14.5 10C14.5 8.61929 13.3807 7.5 12 7.5Z"
							fill="currentColor"
						/>
					</svg>
					<span class="field-button-text">
						{actualAddress || 'Фактический адрес'}
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
				{#if errors.actualAddress}
					<p class="field-error">{errors.actualAddress}</p>
				{/if}
			</div>

			<Checkbox
				bind:checked={sameAddress}
				label="Фактический адрес совпадает с адресом регистрации"
			/>
		</div>

	</div>

	<div class="footer">
		<Button variant="primary" fullWidth onClick={handleNext}>
			Продолжить
		</Button>
	</div>
</div>

<InputModal
	bind:open={isIssuedByModalOpen}
	title="Кем выдан"
	placeholder="Наименование органа"
	value={issuedBy}
	suggestions={issuedBySuggestions}
	onSave={(v) => (issuedBy = v)}
	onClose={() => (isIssuedByModalOpen = false)}
/>

<InputModal
	bind:open={isRegistrationAddressModalOpen}
	title="Адрес регистрации"
	placeholder="Укажите адрес регистрации"
	value={registrationAddress}
	suggestions={addressSuggestions}
	onSave={(v) => (registrationAddress = v)}
	onClose={() => (isRegistrationAddressModalOpen = false)}
/>

<InputModal
	bind:open={isActualAddressModalOpen}
	title="Фактический адрес"
	placeholder="Укажите фактический адрес"
	value={actualAddress}
	suggestions={addressSuggestions}
	onSave={(v) => (actualAddress = v)}
	onClose={() => (isActualAddressModalOpen = false)}
/>

<style>
	.page {
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

	.form-section {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.section-title {
		font-family: 'Roboto', sans-serif;
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

	.field-button-wrapper {
		display: flex;
		flex-direction: column;
	}

	:global(.field-button .label) {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
	}

	:global(.field-button-error) {
		border-color: var(--border-error, #e53935) !important;
	}

	.field-icon {
		flex-shrink: 0;
	}

	.field-button-text {
		flex: 1;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.chevron-icon {
		flex-shrink: 0;
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
</style>

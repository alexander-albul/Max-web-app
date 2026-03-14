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
		{ label: 'Паспорт' },
		{ label: 'Документ ребёнка' },
		{ label: 'Отделение' }
	];

	const issuedBySuggestions = [
		'МВД по Республике Татарстан',
		'Отдел МВД России по Вахитовскому району г. Казани',
		'Отдел МВД России по Советскому району г. Казани',
		'Отдел МВД России по Московскому району г. Казани',
		'Отдел МВД России по Приволжскому району г. Казани',
		'Отдел МВД России по Ново-Савиновскому району г. Казани',
		'Отдел МВД России по Авиастроительному району г. Казани',
		'Отдел МВД России по Кировскому району г. Казани',
		'МВД по Республике Башкортостан',
		'ГУ МВД России по г. Москве',
		'ГУ МВД России по Московской области'
	];

	const addressSuggestions = [
		'г. Казань, ул. Баумана, д. 1, кв. 5',
		'г. Казань, ул. Пушкина, д. 12, кв. 3',
		'г. Казань, пр. Победы, д. 78, кв. 15',
		'г. Казань, ул. Чистопольская, д. 5, кв. 42',
		'г. Казань, ул. Ершова, д. 37, кв. 8',
		'г. Казань, ул. Кремлёвская, д. 18',
		'г. Набережные Челны, пр. Мира, д. 55, кв. 100',
		'г. Нижнекамск, ул. Корабельная, д. 21, кв. 7'
	];

	const documentTypes = [
		{ value: 'passport_rf', label: 'Паспорт гражданина РФ' },
		{ value: 'birth_certificate', label: 'Свидетельство о рождении' },
		{ value: 'passport_foreign', label: 'Иностранный паспорт' }
	];

	const autofill = {
		series: '8514',
		number: '112233',
		issueDate: new Date(2022, 3, 20),
		departmentCode: '165-002',
		birthPlace: 'Казань, Республика Татарстан, Россия'
	};

	// Тип документа (заблокирован по дизайну, только «Паспорт гражданина РФ»)
	let documentType = $state('passport_rf');
	let isDocTypeOpen = $state(false);

	// Данные документа ребёнка
	let series = $state('');
	let number = $state('');
	let issueDate = $state<Date | null>(null);
	let departmentCode = $state('');
	let issuedBy = $state('');
	let birthPlace = $state('');

	// Адрес ребёнка
	let sameAsParent = $state(false);
	let registrationAddress = $state('');
	let sameActualAddress = $state(false);
	let actualAddress = $state('');

	// Модальные окна
	let issuedByModalOpen = $state(false);
	let registrationAddressModalOpen = $state(false);
	let actualAddressModalOpen = $state(false);

	// Валидация
	let submitted = $state(false);

	$effect(() => {
		if (sameAsParent) {
			try {
				const saved = localStorage.getItem('gosuslugi_data');
				if (saved) {
					const data = JSON.parse(saved);
					if (data.registrationAddress) registrationAddress = data.registrationAddress;
					if (data.actualAddress) actualAddress = data.actualAddress;
					sameActualAddress = data.registrationAddress === data.actualAddress;
				}
			} catch {
				// ignore
			}
		}
	});

	$effect(() => {
		if (sameActualAddress && registrationAddress) {
			actualAddress = registrationAddress;
		}
	});

	const selectedDocType = $derived(
		documentTypes.find((t) => t.value === documentType) ?? documentTypes[0]
	);

	const errors = $derived({
		series: submitted && !series ? 'Обязательное поле' : '',
		number: submitted && !number ? 'Обязательное поле' : '',
		issueDate: submitted && !issueDate ? 'Обязательное поле' : '',
		departmentCode: submitted && !departmentCode ? 'Обязательное поле' : '',
		issuedBy: submitted && !issuedBy ? 'Обязательное поле' : '',
		birthPlace: submitted && !birthPlace ? 'Обязательное поле' : '',
		registrationAddress: submitted && !registrationAddress ? 'Обязательное поле' : '',
		actualAddress: submitted && !sameActualAddress && !actualAddress ? 'Обязательное поле' : ''
	});

	function toggleDocType() {
		isDocTypeOpen = !isDocTypeOpen;
	}

	function selectDocType(value: string) {
		documentType = value;
		isDocTypeOpen = false;
	}


	function handleNext() {
		submitted = true;
		const isValid =
			series &&
			number &&
			issueDate &&
			departmentCode &&
			issuedBy &&
			birthPlace &&
			registrationAddress &&
			(sameActualAddress || actualAddress);

		if (isValid) {
			goto('/child-card/step6');
		} else {
			setTimeout(() => {
				const firstError = document.querySelector('.error-message, .field-error');
				firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}, 0);
		}
	}
</script>

<svelte:head>
	<title>Оформление детской карты — Шаг 5</title>
</svelte:head>

<div class="page">
	<BackButton onclick={() => history.back()} />

	<Stepper {steps} currentStep={5} title={`Заявка на выпуск \n Детской карты`} />

	<div class="content">
		<!-- Документ ребёнка -->
		<div class="form-section">
			<h3 class="section-title">Документ удостоверяющий личность ребёнка</h3>

			<div class="form-fields">
				<!-- Выпадающий список типа документа -->
				<div class="select-wrapper">
					<button
						type="button"
						class="select-trigger"
						onclick={toggleDocType}
					>
						<div class="select-content">
							<span class="select-label">Тип документа</span>
							<span class="select-value">{selectedDocType.label}</span>
						</div>
						<svg class="chevron-icon" class:open={isDocTypeOpen} width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</button>
					{#if isDocTypeOpen}
						<div class="select-dropdown">
							{#each documentTypes as type}
								<button
									type="button"
									class="select-option"
									class:selected={documentType === type.value}
									onclick={() => selectDocType(type.value)}
								>
									{type.label}
								</button>
							{/each}
						</div>
					{/if}
				</div>

				<Input bind:value={series} label="Серия" size="l" error={errors.series} onclick={() => { if (!series) series = autofill.series; }} />

				<Input bind:value={number} label="Номер" size="l" error={errors.number} onclick={() => { if (!number) number = autofill.number; }} />

				<DatePicker bind:value={issueDate} label="Дата выдачи" size="l" maxDate={new Date()} error={errors.issueDate} onclick={() => { if (!issueDate) issueDate = autofill.issueDate; }} />

				<Input bind:value={departmentCode} label="Код подразделения" size="l" error={errors.departmentCode} onclick={() => { if (!departmentCode) departmentCode = autofill.departmentCode; }} />

				<div class="field-button-wrapper">
					<Button
						variant="secondary"
						size="l"
						fullWidth
						onClick={() => (issuedByModalOpen = true)}
						class="field-button{errors.issuedBy ? ' field-button-error' : ''}"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="field-icon">
							<path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
						<span class="field-button-text">
							{issuedBy ? `Выдан ${issuedBy}` : 'Кем выдан'}
						</span>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="chevron-icon-btn">
							<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</Button>
					{#if errors.issuedBy}
						<p class="field-error">{errors.issuedBy}</p>
					{/if}
				</div>

				<Input bind:value={birthPlace} label="Место рождения" size="l" error={errors.birthPlace} onclick={() => { if (!birthPlace) birthPlace = autofill.birthPlace; }} />
			</div>
		</div>

		<Divider spacing="m" />

		<!-- Адрес ребёнка -->
		<div class="form-section">
			<h3 class="section-title">Адрес ребёнка</h3>

			<div class="form-fields">
				<Checkbox
					bind:checked={sameAsParent}
					label="Адрес регистрации ребёнка и родителя совпадают"
				/>

				<div class="field-button-wrapper">
					<Button
						variant="secondary"
						size="l"
						fullWidth
						disabled={sameAsParent}
						onClick={() => (registrationAddressModalOpen = true)}
						class="field-button{errors.registrationAddress ? ' field-button-error' : ''}"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="field-icon">
							<path d="M12 2C16.3719 2 19.916 5.45414 19.916 9.71484C19.9159 14.8532 15.3631 19.5697 13.1631 21.5488C12.4929 22.1517 11.5071 22.1517 10.8369 21.5488C8.63685 19.5696 4.08409 14.8532 4.08398 9.71484C4.08398 5.45416 7.62815 2.00004 12 2ZM12 3.5C8.41993 3.50004 5.58398 6.31878 5.58398 9.71484C5.58404 11.8548 6.5413 14.0198 7.87402 15.9707C9.19473 17.904 10.789 19.4874 11.8408 20.4336C11.8987 20.4857 11.9543 20.501 12 20.501C12.0457 20.501 12.1013 20.4857 12.1592 20.4336C13.211 19.4874 14.8053 17.904 16.126 15.9707C17.4587 14.0198 18.416 11.8548 18.416 9.71484C18.416 6.31876 15.5801 3.5 12 3.5ZM12 6C14.2091 6 16 7.79086 16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10C8 7.79086 9.79086 6 12 6ZM12 7.5C10.6193 7.5 9.5 8.61929 9.5 10C9.5 11.3807 10.6193 12.5 12 12.5C13.3807 12.5 14.5 11.3807 14.5 10C14.5 8.61929 13.3807 7.5 12 7.5Z" fill="currentColor"/>
						</svg>
						<span class="field-button-text">
							{registrationAddress || 'Адрес регистрации'}
						</span>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="chevron-icon-btn">
							<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</Button>
					{#if errors.registrationAddress}
						<p class="field-error">{errors.registrationAddress}</p>
					{/if}
				</div>

				<Checkbox
					bind:checked={sameActualAddress}
					label="Фактический адрес совпадает с адресом регистрации"
				/>

				{#if !sameActualAddress}
					<div class="field-button-wrapper">
						<Button
							variant="secondary"
							size="l"
							fullWidth
							onClick={() => (actualAddressModalOpen = true)}
							class="field-button{errors.actualAddress ? ' field-button-error' : ''}"
						>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" class="field-icon">
								<path d="M12 2C16.3719 2 19.916 5.45414 19.916 9.71484C19.9159 14.8532 15.3631 19.5697 13.1631 21.5488C12.4929 22.1517 11.5071 22.1517 10.8369 21.5488C8.63685 19.5696 4.08409 14.8532 4.08398 9.71484C4.08398 5.45416 7.62815 2.00004 12 2ZM12 3.5C8.41993 3.50004 5.58398 6.31878 5.58398 9.71484C5.58404 11.8548 6.5413 14.0198 7.87402 15.9707C9.19473 17.904 10.789 19.4874 11.8408 20.4336C11.8987 20.4857 11.9543 20.501 12 20.501C12.0457 20.501 12.1013 20.4857 12.1592 20.4336C13.211 19.4874 14.8053 17.904 16.126 15.9707C17.4587 14.0198 18.416 11.8548 18.416 9.71484C18.416 6.31876 15.5801 3.5 12 3.5ZM12 6C14.2091 6 16 7.79086 16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10C8 7.79086 9.79086 6 12 6ZM12 7.5C10.6193 7.5 9.5 8.61929 9.5 10C9.5 11.3807 10.6193 12.5 12 12.5C13.3807 12.5 14.5 11.3807 14.5 10C14.5 8.61929 13.3807 7.5 12 7.5Z" fill="currentColor"/>
							</svg>
							<span class="field-button-text">
								{actualAddress || 'Фактический адрес'}
							</span>
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="chevron-icon-btn">
								<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
						</Button>
						{#if errors.actualAddress}
							<p class="field-error">{errors.actualAddress}</p>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>

	<div class="footer">
		<div class="footer-buttons">
			<Button variant="secondary" onClick={() => history.back()}>Назад</Button>
			<Button variant="primary" onClick={handleNext}>Продолжить</Button>
		</div>
	</div>
</div>

<!-- Модальное окно: Кем выдан -->
<InputModal
	bind:open={issuedByModalOpen}
	title="Кем выдан"
	placeholder="Введите название органа..."
	value={issuedBy}
	suggestions={issuedBySuggestions}
	onSave={(val) => (issuedBy = val)}
	onClose={() => (issuedByModalOpen = false)}
/>

<!-- Модальное окно: Адрес регистрации -->
<InputModal
	bind:open={registrationAddressModalOpen}
	title="Адрес регистрации"
	placeholder="Введите адрес..."
	value={registrationAddress}
	suggestions={addressSuggestions}
	onSave={(val) => {
		registrationAddress = val;
		if (sameActualAddress) actualAddress = val;
	}}
	onClose={() => (registrationAddressModalOpen = false)}
/>

<!-- Модальное окно: Фактический адрес -->
<InputModal
	bind:open={actualAddressModalOpen}
	title="Фактический адрес"
	placeholder="Введите адрес..."
	value={actualAddress}
	suggestions={addressSuggestions}
	onSave={(val) => (actualAddress = val)}
	onClose={() => (actualAddressModalOpen = false)}
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
		font-size: 18px;
		line-height: 28px;
		color: var(--content-base-primary, #2c2c2c);
		margin: 0;
	}

	.form-fields {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	/* Select */
	.select-wrapper {
		position: relative;
		width: 100%;
	}

	.select-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		width: 100%;
		height: 64px;
		padding: 8px 24px;
		background: var(--background-base-disabled, #e8e8e8);
		border: 1px solid var(--border-base-disabled, #c8c6c6);
		border-radius: var(--border-radius-l, 12px);
		cursor: pointer;
		text-align: left;
		transition: all 0.2s ease;
	}

	.select-trigger:hover {
		border-color: var(--border-accent-default, #009b3a);
	}

	.select-content {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
	}

	.select-label {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-disabled, #949494);
	}

	.select-value {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 18px;
		line-height: 28px;
		color: var(--content-base-secondary, #6e6d6d);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.chevron-icon {
		color: var(--content-base-secondary, #6e6d6d);
		flex-shrink: 0;
		transition: transform 0.2s ease;
	}

	.chevron-icon.open {
		transform: rotate(180deg);
	}

	.select-dropdown {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		right: 0;
		background: var(--background-base-primary, #ffffff);
		border: 1px solid var(--border-base-main, #c8c6c6);
		border-radius: var(--border-radius-l, 12px);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
		z-index: 100;
		overflow: hidden;
	}

	.select-option {
		display: block;
		width: 100%;
		padding: 16px 24px;
		background: transparent;
		border: none;
		text-align: left;
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-primary, #212121);
		cursor: pointer;
		transition: background 0.15s ease;
	}

	.select-option:hover {
		background: var(--background-base-secondary, #f5f5f5);
	}

	.select-option.selected {
		color: var(--content-accent-default, #009b3a);
		font-weight: 500;
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

	.chevron-icon-btn {
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

	.footer {
		margin-top: auto;
		padding-top: 16px;
	}

	.footer-buttons {
		display: flex;
		gap: 12px;
	}

	.footer-buttons :global(button) {
		flex: 1;
	}
</style>

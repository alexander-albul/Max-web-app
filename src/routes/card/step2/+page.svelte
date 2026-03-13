<script lang="ts">
	import { goto } from '$app/navigation';
	import Stepper from '$lib/components/Stepper.svelte';
	import Input from '$lib/components/Input.svelte';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Button from '$lib/components/Button.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import BackButton from '$lib/components/BackButton.svelte';

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

	// Validation
	let submitted = $state(false);

	const errors = $derived({
		lastName: submitted && !lastName ? 'Обязательное поле' : '',
		firstName: submitted && !firstName ? 'Обязательное поле' : '',
		middleName: submitted && !noMiddleName && !middleName ? 'Обязательное поле' : '',
		birthDate: submitted && !birthDate ? 'Обязательное поле' : '',
		phone: submitted && !phone ? 'Обязательное поле' : ''
	});

	function handleGosuslugi() {
		// Handle Gosuslugi auth
	}

	function handleNext() {
		submitted = true;
		const isValid =
			lastName &&
			firstName &&
			(middleName || noMiddleName) &&
			birthDate &&
			phone &&
			agreePersonalData;

		if (isValid) {
			goto('/card/step3');
		} else {
			setTimeout(() => {
				const firstError = document.querySelector('.input-container.error, .error-message');
				firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}, 0);
		}
	}
</script>

<svelte:head>
	<title>Оформление карты - Шаг 2</title>
</svelte:head>

<div class="page">
	<BackButton onclick={() => history.back()} />
	<Stepper {steps} currentStep={2} />

	<div class="content">
		<!-- Gosuslugi Block -->
		<div class="gosuslugi-block">
			<p class="text-text-l text-white">
				Заполните заявку автоматически с вашей учётной записью портала Госуслуг РФ
			</p>
			<button type="button" class="gosuslugi-button" onclick={handleGosuslugi}>
				<svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
					<path
						d="M26.6282 9.28802C26.5179 7.84506 25.4153 5.99512 24.3127 5.10714C23.0728 4.1984 21.7844 3.3585 20.4535 2.59122C19.1326 1.8031 17.7708 1.08676 16.3738 0.445284C15.6276 0.138845 14.8274 -0.0121893 14.0215 0.00129731C13.2154 -0.0157526 12.4145 0.135416 11.6693 0.445284C10.2725 1.08722 8.91068 1.80354 7.58957 2.59122C5.45783 3.88618 3.73039 5.10714 3.73039 5.10714C2.87512 5.8277 2.21541 6.74332 1.7996 7.76812C1.67394 8.07782 1.91383 8.3999 2.24805 8.3999H3.54813C3.91951 8.3999 4.25419 8.18976 4.46136 7.88154C4.75425 7.44578 5.10904 7.04998 5.51798 6.70783C5.51798 6.70783 6.94429 5.70664 8.70442 4.64477C9.79524 3.99888 10.9197 3.41149 12.073 2.8851C12.6883 2.63101 13.3496 2.50705 14.0152 2.52103C14.6805 2.50998 15.3412 2.63382 15.9574 2.8851C17.1108 3.41112 18.2353 3.99851 19.3259 4.64477C20.4248 5.27394 21.4886 5.96266 22.5123 6.70783C23.4228 7.43597 24.3332 8.95292 24.4242 10.1361C24.4242 10.1361 24.6366 11.8958 24.667 13.9801C24.6651 15.2673 24.5942 16.5535 24.4546 17.8332C24.2428 19.173 23.5529 20.3909 22.5123 21.2615C22.5123 21.2615 21.086 22.293 19.3259 23.3549C18.2351 24.0008 17.1107 24.5882 15.9574 25.1146C15.3421 25.3686 14.6808 25.4926 14.0152 25.4786C13.3504 25.4926 12.6898 25.3718 12.073 25.1237C10.9195 24.5976 9.79504 24.0102 8.70442 23.364C6.94429 22.3325 5.51798 21.2706 5.51798 21.2706C5.15792 20.9826 4.79786 20.5713 4.48661 20.106C4.28354 19.8024 3.95233 19.5998 3.58709 19.5998H2.26077C1.92227 19.5998 1.68339 19.929 1.81933 20.239C2.27214 21.2716 3.00126 22.2794 3.73039 22.8666C3.73039 22.8666 5.45783 24.1616 7.58957 25.4195C8.91044 26.2076 10.2723 26.924 11.6693 27.5655C12.4163 27.8681 13.2165 28.0154 14.0215 27.9984C14.8277 28.0154 15.6286 27.8642 16.3738 27.5544C17.7706 26.9124 19.1324 26.1961 20.4535 25.4084C22.5852 24.1135 24.3127 22.8555 24.3127 22.8555C25.5729 21.7938 26.4085 20.3086 26.6649 18.6746C26.8341 17.1141 26.92 15.5456 26.9222 13.9758C26.8855 11.434 26.6282 9.28802 26.6282 9.28802Z"
						fill="url(#paint0_linear_507_7388)"
					/>
					<path
						d="M1.12061 10.9203C1.12061 10.6111 1.3716 10.3604 1.68123 10.3604H10.3709C10.6805 10.3604 10.9315 10.6111 10.9315 10.9203V12.6003C10.9315 12.9096 10.6805 13.1603 10.3709 13.1603H1.12061V10.9203Z"
						fill="#0066B3"
					/>
					<path
						d="M1.12061 14.8398H18.7802C19.0898 14.8398 19.3408 15.0906 19.3408 15.3998V17.0798C19.3408 17.3891 19.0898 17.6398 18.7802 17.6398H1.68123C1.3716 17.6398 1.12061 17.3891 1.12061 17.0798V14.8398Z"
						fill="#EE2F53"
					/>
					<defs>
						<linearGradient
							id="paint0_linear_507_7388"
							x1="14.2494"
							y1="0"
							x2="14.2494"
							y2="27.9997"
							gradientUnits="userSpaceOnUse"
						>
							<stop stop-color="#0066B3" />
							<stop offset="0.354167" stop-color="#0066B3" />
							<stop offset="0.6875" stop-color="#EE2F53" />
							<stop offset="1" stop-color="#EE2F53" />
						</linearGradient>
					</defs>
				</svg>
				<span>Заполнить через Госуслуги</span>
			</button>
		</div>

		<!-- Form Section -->
		<div class="form-section">
			<h3 class="section-title">Или заполните вручную</h3>

			<div class="form-fields">
				<Input bind:value={lastName} label="Фамилия" required error={errors.lastName} />

				<Input bind:value={firstName} label="Имя" required error={errors.firstName} />

				<div class="field-with-checkbox">
					<Input bind:value={middleName} label="Отчество" disabled={noMiddleName} error={errors.middleName} />
					<Checkbox bind:checked={noMiddleName} label="Нет отчества" size="s" />
				</div>

				<DatePicker bind:value={birthDate} label="Дата рождения" required maxDate={new Date()} error={errors.birthDate} />

				<Input bind:value={phone} label="Телефон" type="tel" required error={errors.phone} />
			</div>
		</div>

		<Divider spacing="m" />

		<!-- Agreements -->
		<div class="agreements">
			<div class="agreement-item">
				<Checkbox bind:checked={agreePersonalData} />
				<p class="agreement-text">
					Я согласен(а) на <a href="#" class="link-green">обработку персональных данных</a>
				</p>
			</div>
			<div class="agreement-item no-checkbox">
				<div class="checkbox-spacer"></div>
				<p class="agreement-text">
					Ознакомиться с <a href="#" class="link-green">тарифами Карты Жителя</a>
				</p>
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

	.content {
		display: flex;
		flex-direction: column;
		gap: 24px;
		flex: 1;
	}

	.gosuslugi-block {
		background-color: #0d4cd3;
		border-radius: 12px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.gosuslugi-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		height: 48px;
		background: #ffffff;
		color: #0d4cd3;
		border: 1px solid #0d4cd3;
		border-radius: 8px;
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 14px;
		cursor: pointer;
		transition: opacity 0.2s ease;
		padding: 8px 10px;
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

	.field-with-checkbox {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.agreements {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.agreement-item {
		display: flex;
		align-items: flex-start;
		gap: 12px;
	}

	.checkbox-spacer {
		width: 20px;
		height: 20px;
		flex-shrink: 0;
		opacity: 0;
		margin-top: 2px;
	}

	.agreement-text {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-primary, #212121);
		margin: 0;
		padding-top: 1px;
		flex: 1;
	}

	.link-green {
		color: #009b3a;
		text-decoration: none;
	}

	.link-green:hover {
		text-decoration: underline;
	}

	.footer {
		margin-top: auto;
		padding-top: 16px;
	}
</style>

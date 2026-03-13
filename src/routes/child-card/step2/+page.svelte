<script lang="ts">
	import { goto } from '$app/navigation';
	import Stepper from '$lib/components/Stepper.svelte';
	import Input from '$lib/components/Input.svelte';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Button from '$lib/components/Button.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import Segment from '$lib/components/Segment.svelte';
	import MaleIcon from '$lib/components/icons/MaleIcon.svelte';
	import FemaleIcon from '$lib/components/icons/FemaleIcon.svelte';
	import { Calendar } from 'lucide-svelte';

	const steps = [
		{ label: 'Оформление' },
		{ label: 'Анкета', description: 'Заполните персональные данные' },
		{ label: 'Код' },
		{ label: 'Паспорт' },
		{ label: 'Документ ребёнка' },
		{ label: 'Отделение' }
	];

	// Опции для выбора пола
	const parentGenderOptions = [
		{ value: 'male', label: 'Мужской', icon: MaleIcon },
		{ value: 'female', label: 'Женский', icon: FemaleIcon }
	];

	const childGenderOptions = [
		{ value: 'male', label: 'Мальчик', icon: MaleIcon },
		{ value: 'female', label: 'Девочка', icon: FemaleIcon }
	];

	// Данные детей с госуслуг
	const childrenFromGosuslugi = [
		{
			id: 1,
			lastName: 'Романов',
			firstName: 'Алексей',
			middleName: 'Григорьевич',
			birthDate: new Date(2015, 5, 12),
			phone: '+7 999 123-45-67',
			gender: 'male' as const
		},
		{
			id: 2,
			lastName: 'Романова',
			firstName: 'Мария',
			middleName: 'Григорьевна',
			birthDate: new Date(2018, 2, 5),
			phone: '',
			gender: 'female' as const
		},
		{
			id: 3,
			lastName: 'Романов',
			firstName: 'Дмитрий',
			middleName: 'Григорьевич',
			birthDate: new Date(2020, 9, 17),
			phone: '',
			gender: 'male' as const
		}
	];

	// Данные родителя с госуслуг
	const parentFromGosuslugi = {
		lastName: 'Александров',
		firstName: 'Александр',
		middleName: 'Александрович',
		birthDate: new Date(1990, 9, 17),
		phone: '+79991234567',
		gender: 'male' as const,
		passportSeries: '1624',
		passportNumber: '456789',
		issueDate: new Date(2015, 6, 10).toISOString(),
		issuedBy: 'МВД по Республике Татарстан',
		departmentCode: '165-001',
		birthPlace: 'Казань, Республика Татарстан, Россия',
		registrationAddress: 'г. Казань, ул. Баумана, д. 1, кв. 5',
		actualAddress: 'г. Казань, ул. Баумана, д. 1, кв. 5'
	};

	// Данные родителя
	let parentLastName = $state('');
	let parentFirstName = $state('');
	let parentMiddleName = $state('');
	let parentNoMiddleName = $state(false);
	let parentGender = $state<string>('male');
	let parentBirthDate = $state<Date | null>(null);
	let parentPhone = $state('');

	// Данные ребёнка
	let childLastName = $state('');
	let childFirstName = $state('');
	let childMiddleName = $state('');
	let childNoMiddleName = $state(false);
	let childGender = $state<string>('male');
	let childBirthDate = $state<Date | null>(null);
	let childPhone = $state('');

	// Согласия
	let agreePersonalData = $state(false);

	// Валидация
	let submitted = $state(false);

	// Состояние госуслуг
	let gosuslugiSynced = $state(false);
	let selectedChildIndex = $state(0);

	const parentErrors = $derived({
		lastName: submitted && !parentLastName ? 'Обязательное поле' : '',
		firstName: submitted && !parentFirstName ? 'Обязательное поле' : '',
		middleName: submitted && !parentNoMiddleName && !parentMiddleName ? 'Обязательное поле' : '',
		birthDate: submitted && !parentBirthDate ? 'Обязательное поле' : '',
		phone: submitted && !parentPhone ? 'Обязательное поле' : ''
	});

	const childErrors = $derived({
		lastName: submitted && !childLastName ? 'Обязательное поле' : '',
		firstName: submitted && !childFirstName ? 'Обязательное поле' : '',
		middleName: submitted && !childNoMiddleName && !childMiddleName ? 'Обязательное поле' : '',
		birthDate: submitted && !childBirthDate ? 'Обязательное поле' : '',
		phone: submitted && !childPhone ? 'Обязательное поле' : ''
	});

	function handleGosuslugi() {
		// Заполняем данные родителя
		parentLastName = parentFromGosuslugi.lastName;
		parentFirstName = parentFromGosuslugi.firstName;
		parentMiddleName = parentFromGosuslugi.middleName;
		parentBirthDate = parentFromGosuslugi.birthDate;
		parentPhone = parentFromGosuslugi.phone;
		parentGender = parentFromGosuslugi.gender;

		// Заполняем данные первого ребёнка
		selectChild(0);

		// Сохраняем данные в localStorage для следующих шагов
		localStorage.setItem('gosuslugi_data', JSON.stringify(parentFromGosuslugi));

		gosuslugiSynced = true;
	}

	function selectChild(index: number) {
		selectedChildIndex = index;
		const child = childrenFromGosuslugi[index];
		childLastName = child.lastName;
		childFirstName = child.firstName;
		childMiddleName = child.middleName;
		childBirthDate = child.birthDate;
		childPhone = child.phone;
		childGender = child.gender;
	}

	function formatChildBirthDate(date: Date): string {
		return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
	}

	function handleNext() {
		submitted = true;
		const isParentValid =
			parentLastName &&
			parentFirstName &&
			(parentMiddleName || parentNoMiddleName) &&
			parentBirthDate &&
			parentPhone;

		const isChildValid =
			childLastName &&
			childFirstName &&
			(childMiddleName || childNoMiddleName) &&
			childBirthDate &&
			childPhone;

		const isValid = isParentValid && isChildValid && agreePersonalData;

		if (isValid) {
			goto('/child-card/step3');
		} else {
			setTimeout(() => {
				const firstError = document.querySelector('.input-container.error, .error-message');
				firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}, 0);
		}
	}
</script>

<svelte:head>
	<title>Оформление детской карты - Шаг 2</title>
</svelte:head>

<div class="page">
	<BackButton onclick={() => history.back()} />
	<Stepper {steps} currentStep={2} title={`Заявка на выпуск \n Детской карты`} />

	<div class="content">
		<!-- Gosuslugi Block -->
		{#if gosuslugiSynced}
			<div class="gosuslugi-synced">
				<div class="gosuslugi-synced-icon">
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 29 28" fill="none">
						<path d="M26.6282 9.28802C26.5179 7.84506 25.4153 5.99512 24.3127 5.10714C23.0728 4.1984 21.7844 3.3585 20.4535 2.59122C19.1326 1.8031 17.7708 1.08676 16.3738 0.445284C15.6276 0.138845 14.8274 -0.0121893 14.0215 0.00129731C13.2154 -0.0157526 12.4145 0.135416 11.6693 0.445284C10.2725 1.08722 8.91068 1.80354 7.58957 2.59122C5.45783 3.88618 3.73039 5.10714 3.73039 5.10714C2.87512 5.8277 2.21541 6.74332 1.7996 7.76812C1.67394 8.07782 1.91383 8.3999 2.24805 8.3999H3.54813C3.91951 8.3999 4.25419 8.18976 4.46136 7.88154C4.75425 7.44578 5.10904 7.04998 5.51798 6.70783C5.51798 6.70783 6.94429 5.70664 8.70442 4.64477C9.79524 3.99888 10.9197 3.41149 12.073 2.8851C12.6883 2.63101 13.3496 2.50705 14.0152 2.52103C14.6805 2.50998 15.3412 2.63382 15.9574 2.8851C17.1108 3.41112 18.2353 3.99851 19.3259 4.64477C20.4248 5.27394 21.4886 5.96266 22.5123 6.70783C23.4228 7.43597 24.3332 8.95292 24.4242 10.1361C24.4242 10.1361 24.6366 11.8958 24.667 13.9801C24.6651 15.2673 24.5942 16.5535 24.4546 17.8332C24.2428 19.173 23.5529 20.3909 22.5123 21.2615C22.5123 21.2615 21.086 22.293 19.3259 23.3549C18.2351 24.0008 17.1107 24.5882 15.9574 25.1146C15.3421 25.3686 14.6808 25.4926 14.0152 25.4786C13.3504 25.4926 12.6898 25.3718 12.073 25.1237C10.9195 24.5976 9.79504 24.0102 8.70442 23.364C6.94429 22.3325 5.51798 21.2706 5.51798 21.2706C5.15792 20.9826 4.79786 20.5713 4.48661 20.106C4.28354 19.8024 3.95233 19.5998 3.58709 19.5998H2.26077C1.92227 19.5998 1.68339 19.929 1.81933 20.239C2.27214 21.2716 3.00126 22.2794 3.73039 22.8666C3.73039 22.8666 5.45783 24.1616 7.58957 25.4195C8.91044 26.2076 10.2723 26.924 11.6693 27.5655C12.4163 27.8681 13.2165 28.0154 14.0215 27.9984C14.8277 28.0154 15.6286 27.8642 16.3738 27.5544C17.7706 26.9124 19.1324 26.1961 20.4535 25.4084C22.5852 24.1135 24.3127 22.8555 24.3127 22.8555C25.5729 21.7938 26.4085 20.3086 26.6649 18.6746C26.8341 17.1141 26.92 15.5456 26.9222 13.9758C26.8855 11.434 26.6282 9.28802 26.6282 9.28802Z" fill="url(#gs_grad_synced_child)"/>
						<path d="M1.12061 10.9203C1.12061 10.6111 1.3716 10.3604 1.68123 10.3604H10.3709C10.6805 10.3604 10.9315 10.6111 10.9315 10.9203V12.6003C10.9315 12.9096 10.6805 13.1603 10.3709 13.1603H1.12061V10.9203Z" fill="#0066B3"/>
						<path d="M1.12061 14.8398H18.7802C19.0898 14.8398 19.3408 15.0906 19.3408 15.3998V17.0798C19.3408 17.3891 19.0898 17.6398 18.7802 17.6398H1.68123C1.3716 17.6398 1.12061 17.3891 1.12061 17.0798V14.8398Z" fill="#EE2F53"/>
						<defs>
							<linearGradient id="gs_grad_synced_child" x1="14.2494" y1="0" x2="14.2494" y2="27.9997" gradientUnits="userSpaceOnUse">
								<stop stop-color="#0066B3"/>
								<stop offset="0.354167" stop-color="#0066B3"/>
								<stop offset="0.6875" stop-color="#EE2F53"/>
								<stop offset="1" stop-color="#EE2F53"/>
							</linearGradient>
						</defs>
					</svg>
				</div>
				<div class="gosuslugi-synced-text">
					<p class="gosuslugi-synced-title">Данные успешно синхронизированы</p>
					<p class="gosuslugi-synced-desc">Проверьте все заполненные поля</p>
				</div>
			</div>
		{:else}
			<div class="gosuslugi-block">
				<p class="gosuslugi-text">
					Заполните заявку автоматически с вашей учётной записью портала Госуслуг РФ
				</p>
				<button type="button" class="gosuslugi-button" onclick={handleGosuslugi}>
					<svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
						<path
							d="M26.6282 9.28802C26.5179 7.84506 25.4153 5.99512 24.3127 5.10714C23.0728 4.1984 21.7844 3.3585 20.4535 2.59122C19.1326 1.8031 17.7708 1.08676 16.3738 0.445284C15.6276 0.138845 14.8274 -0.0121893 14.0215 0.00129731C13.2154 -0.0157526 12.4145 0.135416 11.6693 0.445284C10.2725 1.08722 8.91068 1.80354 7.58957 2.59122C5.45783 3.88618 3.73039 5.10714 3.73039 5.10714C2.87512 5.8277 2.21541 6.74332 1.7996 7.76812C1.67394 8.07782 1.91383 8.3999 2.24805 8.3999H3.54813C3.91951 8.3999 4.25419 8.18976 4.46136 7.88154C4.75425 7.44578 5.10904 7.04998 5.51798 6.70783C5.51798 6.70783 6.94429 5.70664 8.70442 4.64477C9.79524 3.99888 10.9197 3.41149 12.073 2.8851C12.6883 2.63101 13.3496 2.50705 14.0152 2.52103C14.6805 2.50998 15.3412 2.63382 15.9574 2.8851C17.1108 3.41112 18.2353 3.99851 19.3259 4.64477C20.4248 5.27394 21.4886 5.96266 22.5123 6.70783C23.4228 7.43597 24.3332 8.95292 24.4242 10.1361C24.4242 10.1361 24.6366 11.8958 24.667 13.9801C24.6651 15.2673 24.5942 16.5535 24.4546 17.8332C24.2428 19.173 23.5529 20.3909 22.5123 21.2615C22.5123 21.2615 21.086 22.293 19.3259 23.3549C18.2351 24.0008 17.1107 24.5882 15.9574 25.1146C15.3421 25.3686 14.6808 25.4926 14.0152 25.4786C13.3504 25.4926 12.6898 25.3718 12.073 25.1237C10.9195 24.5976 9.79504 24.0102 8.70442 23.364C6.94429 22.3325 5.51798 21.2706 5.51798 21.2706C5.15792 20.9826 4.79786 20.5713 4.48661 20.106C4.28354 19.8024 3.95233 19.5998 3.58709 19.5998H2.26077C1.92227 19.5998 1.68339 19.929 1.81933 20.239C2.27214 21.2716 3.00126 22.2794 3.73039 22.8666C3.73039 22.8666 5.45783 24.1616 7.58957 25.4195C8.91044 26.2076 10.2723 26.924 11.6693 27.5655C12.4163 27.8681 13.2165 28.0154 14.0215 27.9984C14.8277 28.0154 15.6286 27.8642 16.3738 27.5544C17.7706 26.9124 19.1324 26.1961 20.4535 25.4084C22.5852 24.1135 24.3127 22.8555 24.3127 22.8555C25.5729 21.7938 26.4085 20.3086 26.6649 18.6746C26.8341 17.1141 26.92 15.5456 26.9222 13.9758C26.8855 11.434 26.6282 9.28802 26.6282 9.28802Z"
							fill="url(#paint0_linear_child)"
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
								id="paint0_linear_child"
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
		{/if}

		<!-- Данные родителя -->
		<div class="form-section">
			<h3 class="section-title">Данные родителя</h3>

			<div class="form-fields">
				<Input bind:value={parentLastName} label="Фамилия" required error={parentErrors.lastName} />

				<Input bind:value={parentFirstName} label="Имя" required error={parentErrors.firstName} />

				<div class="field-with-checkbox">
					<Input bind:value={parentMiddleName} label="Отчество" disabled={parentNoMiddleName} error={parentErrors.middleName} />
					<Checkbox bind:checked={parentNoMiddleName} label="Нет отчества по паспорту" size="s" />
				</div>

				<div class="gender-section">
					<span class="gender-label">Пол родителя</span>
					<Segment options={parentGenderOptions} bind:value={parentGender} fullWidth />
				</div>

				<DatePicker bind:value={parentBirthDate} label="Дата рождения" required maxDate={new Date()} error={parentErrors.birthDate} />

				<Input bind:value={parentPhone} label="Номер телефона" type="tel" required error={parentErrors.phone} />
			</div>
		</div>

		<Divider spacing="m" />

		<!-- Данные ребёнка -->
		<div class="form-section">
			<div class="child-section-header">
				<h3 class="section-title">Данные ребёнка</h3>
				{#if gosuslugiSynced}
					<span class="section-subtitle">Заполнено на основе Госуслуг</span>
				{/if}
			</div>

			<!-- Слайдер выбора ребёнка (только при синхронизации с госуслугами) -->
			{#if gosuslugiSynced}
				<div class="children-slider-container">
					<button type="button" class="manual-fill-button" onclick={() => {
						childLastName = '';
						childFirstName = '';
						childMiddleName = '';
						childBirthDate = null;
						childPhone = '';
						childGender = 'male';
						selectedChildIndex = -1;
					}}>
						Заполнить вручную
					</button>
					<div class="children-slider">
						{#each childrenFromGosuslugi as child, index}
							<button
								type="button"
								class="child-card"
								class:selected={selectedChildIndex === index}
								onclick={() => selectChild(index)}
							>
								<div class="child-card-name">{child.lastName}</div>
								<div class="child-card-name">{child.firstName}</div>
								<div class="child-card-name">{child.middleName}</div>
								<div class="child-card-date">
									<Calendar size={16} />
									{formatChildBirthDate(child.birthDate)}
								</div>
							</button>
						{/each}
					</div>
				</div>
			{/if}

			<div class="form-fields">
				<Input bind:value={childLastName} label="Фамилия" required error={childErrors.lastName} />

				<Input bind:value={childFirstName} label="Имя" required error={childErrors.firstName} />

				<div class="field-with-checkbox">
					<Input bind:value={childMiddleName} label="Отчество (при наличии)" disabled={childNoMiddleName} error={childErrors.middleName} />
					<Checkbox bind:checked={childNoMiddleName} label="Нет отчества по паспорту" size="s" />
				</div>

				<DatePicker bind:value={childBirthDate} label="Дата рождения" required maxDate={new Date()} error={childErrors.birthDate} />

				<Input bind:value={childPhone} label="Номер телефона" type="tel" required error={childErrors.phone} />

				<div class="gender-section">
					<span class="gender-label">Пол ребёнка</span>
					<Segment options={childGenderOptions} bind:value={childGender} fullWidth />
				</div>
			</div>
		</div>

		<Divider spacing="m" />

		<!-- Согласия -->
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
					Ознакомиться с <a href="#" class="link-green">тарифами Детской КЖ</a>
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
		<div class="footer-buttons">
			<Button variant="secondary" onClick={() => history.back()}>
				Назад
			</Button>
			<Button variant="primary" onClick={handleNext}>
				Продолжить
			</Button>
		</div>
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

	.gosuslugi-synced {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px;
		border: 1px solid #e0e0e0;
		border-radius: 12px;
		background: #ffffff;
	}

	.gosuslugi-synced-icon {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.gosuslugi-synced-text {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.gosuslugi-synced-title {
		font-family: 'Roboto', sans-serif;
		font-weight: 700;
		font-size: 14px;
		line-height: 20px;
		color: #212121;
		margin: 0;
	}

	.gosuslugi-synced-desc {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		color: #6e6d6d;
		margin: 0;
	}

	.gosuslugi-block {
		background-color: #0d4cd3;
		border-radius: 12px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.gosuslugi-text {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		color: #ffffff;
		margin: 0;
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

	.child-section-header {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.section-title {
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-primary, #212121);
		margin: 0;
	}

	.section-subtitle {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-secondary, #6e6d6d);
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

	.gender-section {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.gender-label {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-secondary, #6e6d6d);
	}

	/* Слайдер выбора детей */
	.children-slider-container {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.manual-fill-button {
		align-self: flex-start;
		padding: 8px 16px;
		border: 1px solid #009b3a;
		border-radius: 8px;
		background: #ffffff;
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 14px;
		line-height: 20px;
		color: #009b3a;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.manual-fill-button:hover {
		background: rgba(0, 155, 58, 0.08);
	}

	.children-slider {
		display: flex;
		gap: 12px;
		overflow-x: auto;
		padding-bottom: 8px;
		scrollbar-width: thin;
		scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
	}

	.children-slider::-webkit-scrollbar {
		height: 4px;
	}

	.children-slider::-webkit-scrollbar-track {
		background: transparent;
	}

	.children-slider::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 4px;
	}

	.child-card {
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 4px;
		padding: 12px;
		min-width: 140px;
		border: 2px solid #e0e0e0;
		border-radius: 12px;
		background: #ffffff;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: left;
	}

	.child-card:hover {
		border-color: #009b3a;
	}

	.child-card.selected {
		border-color: #009b3a;
		background: rgba(0, 155, 58, 0.04);
	}

	.child-card-name {
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 14px;
		line-height: 18px;
		color: #212121;
	}

	.child-card-date {
		display: flex;
		align-items: center;
		gap: 4px;
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		color: #6e6d6d;
		margin-top: 4px;
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

	.footer-buttons {
		display: flex;
		gap: 12px;
	}

	.footer-buttons :global(button) {
		flex: 1;
	}
</style>

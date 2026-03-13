<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import ArrowLeft from '$lib/icons/ArrowLeft.svelte';
	import MaxCloseIcon from '$lib/icons/max/MaxCloseIcon.svelte';
	import MaxOptionsIcon from '$lib/icons/max/MaxOptionsIcon.svelte';
	import MaxVerifiedIcon from '$lib/icons/max/MaxVerifiedIcon.svelte';

	// Form state
	let surname = $state('');
	let name = $state('');
	let patronymic = $state('');
	let hasNoPatronymic = $state(false);
	let birthDate = $state('');
	let phoneNumber = $state('');
	let agreeToDataProcessing = $state(false);
	let acknowledgeRates = $state(false);

	// Handlers
	function handleBack() {
		console.log('Back clicked');
	}

	function handleContinue() {
		console.log('Continue clicked');
		console.log({
			surname,
			name,
			patronymic,
			hasNoPatronymic,
			birthDate,
			phoneNumber,
			agreeToDataProcessing,
			acknowledgeRates
		});
	}

	function handleGosuslugi() {
		console.log('Gosuslugi clicked');
	}

	// SVG assets - mapping to the exported files
	const iconArrowLeft = '/0055d00b3895794c08040bb13f233a31864bfe96.svg';
	const iconCalendar = '/2d9a26bfcec5dd6f703b5f64ae11767fb95752c6.svg';
	const gosuslugiLogo = '/8978b4e1250c8a1763d13c0bc7e255113ced3d53.svg';
	const wifiIcon = '/6567f9dccfdb421bc3a2b259625a056bc1de180d.svg';
	const cellularIcon = '/66cf1c6d8acd89efcb169e49cf4d643a3c21736b.svg';
	const battery = '/statusbar-wifi.svg';
</script>

<div class="app-container">
	<!-- Header Section -->
	<div class="header">
		<!-- Status Bar -->
		<div class="status-bar">
			<div class="status-bar-content">
				<p class="time">12:48</p>
				<div class="status-icons">
					<img src={cellularIcon} alt="" class="cellular-icon" />
					<img src={wifiIcon} alt="" class="wifi-icon" />
					<img src={battery} alt="" class="battery-shape" />
				</div>
			</div>
		</div>

		<!-- Title Bar -->
		<div class="title-bar">
			<div class="title-bar-content">
				<button class="icon-button-small" aria-label="Close">
					<MaxCloseIcon />
				</button>
				<div class="title-center">
					<p class="title-text">Карта жителя</p>
					<MaxVerifiedIcon />
				</div>
				<button class="icon-button-small" style="background: transparent;" aria-label="More">
					<MaxOptionsIcon />
				</button>
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<div class="main-content">
		<!-- Back Button -->
		<div class="back-button-container">
			<button class="back-button" onclick={handleBack} aria-label="Back">
				<ArrowLeft />
			</button>
		</div>

		<!-- Stepper -->
		<div class="stepper-section">
			<div class="stepper">
				<div class="step step-completed"></div>
				<div class="step step-active"></div>
				<div class="step step-next"></div>
				<div class="step step-next"></div>
			</div>
			<div class="stepper-hint">
				<p class="stepper-title">
					Заявка на выпуск<br />
					Детской карты
				</p>
				<p class="stepper-counter">
					<span class="counter-current">2/</span><span class="counter-total">4</span>
				</p>
			</div>
		</div>

		<!-- Gosuslugi Section -->
		<div class="gosuslugi-card">
			<p class="gosuslugi-text">
				Заполните заявку автоматически<br />
				с вашей учётной записью портала Госуслуг РФ
			</p>
			<button class="gosuslugi-button" onclick={handleGosuslugi}>
				<img src={gosuslugiLogo} alt="" class="gosuslugi-logo" />
				<span>Заполнить через Госуслуги</span>
			</button>
		</div>

		<!-- Form Section -->
		<div class="form-section">
			<!-- Title -->
			<div class="section-title">
				<h2>Ваши данные</h2>
			</div>

			<!-- Form Fields -->
			<div class="form-fields">
				<Input bind:value={surname} label="Фамилия" />

				<Input bind:value={name} label="Имя" />

				<div class="patronymic-section">
					<Input bind:value={patronymic} label="Отчество" disabled={hasNoPatronymic} />
					<label class="checkbox-label">
						<input type="checkbox" class="checkbox" bind:checked={hasNoPatronymic} />
						<span class="checkbox-text">Нет отчества по паспорту</span>
					</label>
				</div>

				<Input bind:value={birthDate} label="Дата рождения" iconRight={iconCalendar} />

				<Input bind:value={phoneNumber} label="Номер телефона" type="tel" />
			</div>

			<!-- Divider -->
			<div class="divider"></div>

			<!-- Checkboxes -->
			<div class="checkboxes-section">
				<label class="checkbox-label-full">
					<input type="checkbox" class="checkbox" bind:checked={agreeToDataProcessing} />
					<span class="checkbox-text">
						Я согласен(а) на <span class="link">обработку персональных данных</span>
					</span>
				</label>
				<label class="checkbox-label-full">
					<input type="checkbox" class="checkbox" bind:checked={acknowledgeRates} />
					<span class="checkbox-text">
						Ознакомиться с <span class="link">тарифами Карты Жителя</span>
					</span>
				</label>
			</div>

			<!-- Buttons -->
			<div class="button-group">
				<button class="button button-secondary" onclick={handleBack}>Назад</button>
				<button class="button button-primary" onclick={handleContinue}>Продолжить</button>
			</div>
		</div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Roboto', sans-serif;
		background: #f5f5f5;
		height: 100vh;
	}

	.app-container {
		background: white;
		max-width: 375px;
		margin: 0 auto;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		border-radius: 24px;
		box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.03);
		overflow: hidden;
		position: relative;
	}

	/* Header */
	.header {
		background: #565656;
		position: sticky;
		top: 0;
		z-index: 10;
		display: flex;
		flex-direction: column;
		gap: 13px;
	}

	.status-bar {
		height: 44px;
		position: relative;
		width: 100%;
	}

	.status-bar-content {
		height: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 14.5px 0 16px;
	}

	.time {
		font-family: 'Roboto', sans-serif;
		font-weight: 600;
		font-size: 15px;
		line-height: normal;
		letter-spacing: -0.3px;
		color: black;
		margin: 0;
	}

	.status-icons {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.cellular-icon {
		width: 17px;
		height: 10.667px;
	}

	.wifi-icon {
		width: 15.272px;
		height: 10.966px;
	}

	.battery {
		position: relative;
		width: 24.5px;
		height: 11.869px;
		display: flex;
		align-items: center;
	}

	.battery-shape {
		width: 22px;
		height: 10.5px;
	}

	.battery-cap {
		width: 1.5px;
		height: 3.869px;
		margin-left: 1px;
	}

	.battery-fill {
		position: absolute;
		left: 2px;
		top: 50%;
		transform: translateY(-50%);
		width: 18px;
		height: 6.5px;
		background: black;
		border-radius: 1px;
	}

	.title-bar {
		background: white;
		height: 48px;
		border-top-left-radius: 16px;
		border-top-right-radius: 16px;
		overflow: hidden;
		position: relative;
	}

	.title-bar-content {
		position: absolute;
		left: 16px;
		top: 16px;
		width: 343px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.icon-button-small {
		width: 24px;
		height: 24px;
		border-radius: 9999px;
		background: #e8e8e8;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 0;
	}

	.icon-button-small img {
		width: 16px;
		height: 16px;
	}

	.title-center {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.title-text {
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: #212121;
		margin: 0;
		text-align: center;
	}

	.checkmark-icon {
		width: 16px;
		height: 16px;
	}

	/* Main Content */
	.main-content {
		padding: 0 16px 24px;
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.back-button-container {
		background: white;
		padding-top: 12px;
		position: sticky;
		top: 0;
		z-index: 5;
	}

	.back-button {
		width: 24px;
		height: 24px;
		background: transparent;
		border: none;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		padding: 0;
	}

	.back-button img {
		width: 24px;
		height: 24px;
	}

	/* Stepper */
	.stepper-section {
		display: flex;
		flex-direction: column;
		gap: 28px;
	}

	.stepper {
		display: flex;
		gap: 4px;
		width: 100%;
	}

	.step {
		flex: 1;
		height: 8px;
		border-radius: 4px;
		background: #e8e8e8;
		position: relative;
	}

	.step-completed {
		background: #009b3a;
		border-radius: 8px;
	}

	.step-completed::after {
		content: '';
		display: block;
		width: 100%;
		height: 8px;
		background: #009b3a;
		border-radius: 8px;
	}

	.step-active {
		background: #e8e8e8;
	}

	.step-active::after {
		content: '';
		display: block;
		width: 75%;
		height: 8px;
		background: #009b3a;
		border-radius: 4px;
	}

	.stepper-hint {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.stepper-title {
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 24px;
		line-height: 32px;
		color: #212121;
		margin: 0;
		flex: 1;
	}

	.stepper-counter {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 24px;
		line-height: 32px;
		text-align: right;
		margin: 0;
	}

	.counter-current {
		color: #212121;
	}

	.counter-total {
		color: #6e6d6d;
	}

	/* Gosuslugi Card */
	.gosuslugi-card {
		position: relative;
		background: white;
		border: 1px solid #9a9a9a;
		border-radius: 8px;
		padding: 16px;
		box-shadow: 0px 0px 40px 0px rgba(138, 138, 138, 0.16);
	}

	.gosuslugi-text {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 18px;
		line-height: 28px;
		color: #2c2c2c;
		margin: 0 0 16px 0;
	}

	.gosuslugi-button {
		width: 100%;
		height: 48px;
		background: white;
		border: 1px solid #0d4cd3;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		cursor: pointer;
		padding: 8px 10px;
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 18px;
		line-height: 32px;
		color: #0d4cd3;
	}

	.gosuslugi-logo {
		width: 28.031px;
		height: 28px;
	}

	/* Form Section */
	.form-section {
		display: flex;
		flex-direction: column;
		gap: 40px;
	}

	.section-title h2 {
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 18px;
		line-height: 28px;
		color: #2c2c2c;
		margin: 0;
		padding-bottom: 8px;
	}

	.form-fields {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.patronymic-section {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 12px;
		cursor: pointer;
	}

	.checkbox-label-full {
		display: flex;
		align-items: flex-start;
		gap: 12px;
		cursor: pointer;
	}

	.checkbox {
		width: 20px;
		height: 20px;
		min-width: 20px;
		min-height: 20px;
		background: #f5f5f5;
		border: 1px solid #c8c6c6;
		border-radius: 6px;
		cursor: pointer;
		margin: 2px 0;
	}

	.checkbox-text {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
		color: #212121;
	}

	.link {
		color: #009b3a;
	}

	.divider {
		width: 100%;
		height: 1px;
		background: #e8e8e8;
	}

	.checkboxes-section {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	/* Buttons */
	.button-group {
		display: flex;
		gap: 16px;
		width: 100%;
	}

	.button {
		flex: 1;
		height: 56px;
		border-radius: 12px;
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
		cursor: pointer;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button-secondary {
		background: transparent;
		border: 1px solid #009b3a;
		color: #009b3a;
	}

	.button-primary {
		background: #009b3a;
		color: white;
	}

	.button:active {
		opacity: 0.8;
	}
</style>

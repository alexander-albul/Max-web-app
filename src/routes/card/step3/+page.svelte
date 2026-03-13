<script lang="ts">
	import { goto } from '$app/navigation';
	import Stepper from '$lib/components/Stepper.svelte';
	import Button from '$lib/components/Button.svelte';
	import BackButton from '$lib/components/BackButton.svelte';

	const steps = [
		{ label: 'Оформление' },
		{ label: 'Анкета' },
		{ label: 'Подтверждение', description: 'Введите код из SMS' },
		{ label: 'Паспорт' },
		{ label: 'Отделение' }
	];

	let code = $state(['', '', '', '']);
	let timer = $state(59);
	let canResend = $state(false);
	let inputs: HTMLInputElement[] = [];

	const isCodeComplete = $derived(code.every((digit) => digit !== ''));

	$effect(() => {
		if (timer > 0 && !canResend) {
			const interval = setInterval(() => {
				timer--;
				if (timer === 0) {
					canResend = true;
				}
			}, 1000);
			return () => clearInterval(interval);
		}
	});

	function handleInput(index: number, event: Event) {
		const input = event.target as HTMLInputElement;
		const value = input.value.replace(/\D/g, '');

		if (value.length > 0) {
			code[index] = value[0];
			if (index < 3) {
				inputs[index + 1]?.focus();
			}
		}
	}

	function handleKeyDown(index: number, event: KeyboardEvent) {
		if (event.key === 'Backspace' && code[index] === '' && index > 0) {
			inputs[index - 1]?.focus();
		}
	}

	function handlePaste(event: ClipboardEvent) {
		event.preventDefault();
		const pastedData = event.clipboardData?.getData('text').replace(/\D/g, '').slice(0, 4);
		if (pastedData) {
			for (let i = 0; i < pastedData.length; i++) {
				code[i] = pastedData[i];
			}
			inputs[Math.min(pastedData.length, 3)]?.focus();
		}
	}

	function handleResend() {
		timer = 59;
		canResend = false;
		code = ['', '', '', ''];
		inputs[0]?.focus();
	}

	function handleNext() {
		goto('/card/step4');
	}
</script>

<svelte:head>
	<title>Оформление карты - Шаг 3</title>
</svelte:head>

<div class="page">
	<BackButton onclick={() => history.back()} />

	<Stepper {steps} currentStep={3} />

	<div class="content">
		<div class="code-section">
			<div class="code-header">
				<h2 class="code-title">Введите код</h2>
				<p class="code-subtitle">Код отправлен на номер +7 (9**) ***-**-89</p>
			</div>

			<div class="code-inputs">
				{#each code as digit, index}
					<input
						bind:this={inputs[index]}
						type="text"
						inputmode="numeric"
						maxlength="1"
						class="code-input"
						class:filled={digit !== ''}
						value={digit}
						oninput={(e) => handleInput(index, e)}
						onkeydown={(e) => handleKeyDown(index, e)}
						onpaste={handlePaste}
					/>
				{/each}
			</div>

			<div class="resend-section">
				{#if canResend}
					<button type="button" class="resend-button" onclick={handleResend}>
						Отправить код повторно
					</button>
				{:else}
					<p class="resend-timer">
						Вы можете выслать код повторно через {timer} секунд
					</p>
				{/if}
			</div>
		</div>
	</div>

	<div class="footer">
		<Button variant="primary" fullWidth onClick={handleNext} disabled={!isCodeComplete}>
			Подтвердить
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
		flex: 1;
	}

	.code-section {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.code-header {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.code-title {
		font-family: 'Roboto', sans-serif;
		font-weight: 600;
		font-size: 24px;
		line-height: 32px;
		color: var(--content-base-primary, #212121);
		margin: 0;
	}

	.code-subtitle {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-secondary, #6e6d6d);
		margin: 0;
	}

	.code-inputs {
		display: flex;
		gap: 12px;
		justify-content: center;
	}

	.code-input {
		width: 56px;
		height: 64px;
		border: 2px solid var(--border-base-main, #c8c6c6);
		border-radius: 12px;
		background: var(--background-base-primary, #ffffff);
		font-family: 'Roboto', sans-serif;
		font-weight: 600;
		font-size: 24px;
		text-align: center;
		color: var(--content-base-primary, #212121);
		outline: none;
		transition: border-color 0.2s ease;
	}

	.code-input:focus {
		border-color: var(--border-accent-default, #009b3a);
	}

	.code-input.filled {
		border-color: var(--border-accent-default, #009b3a);
		background: var(--background-accent-subtle, rgba(0, 155, 58, 0.08));
	}

	.resend-section {
		text-align: center;
	}

	.resend-timer {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-secondary, #6e6d6d);
		margin: 0;
	}

	.resend-button {
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-accent-default, #009b3a);
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.resend-button:hover {
		text-decoration: underline;
	}

	.footer {
		margin-top: auto;
		padding-top: 16px;
	}
</style>

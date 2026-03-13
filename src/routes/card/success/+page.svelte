<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
	<title>Заявка отправлена</title>
</svelte:head>

<div class="page">
	<div class="content">
		<div class="header-section">
			<h1 class="title">Заявка отправлена</h1>
			<p class="description">
				В случае необходимости с вами свяжется сотрудник банка. Уточнить статус готовности карты вы
				можете в приложении Ак Барс Онлайн или из смс сообщения от банка.
			</p>
		</div>

		<img class="phone-ad" src="/success/Phone_ad.png" alt="Phone ad" />
	</div>

	<div class="footer">
		<Button variant="primary" fullWidth onClick={() => goto('/')}>На главную</Button>
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

	.header-section {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.title {
		font-family: 'Roboto', sans-serif;
		font-weight: 600;
		font-size: 28px;
		line-height: 36px;
		color: var(--content-base-primary, #212121);
		margin: 0;
	}

	.description {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-secondary, #6e6d6d);
		margin: 0;
	}

	.app-promo {
		background: var(--background-base-secondary, #f5f5f5);
		border-radius: 16px;
		padding: 20px;
	}

	.promo-content {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.promo-text {
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-primary, #212121);
		margin: 0;
		text-align: center;
	}

	.store-buttons {
		display: flex;
		gap: 12px;
		justify-content: center;
	}

	.store-button {
		display: block;
		transition: opacity 0.2s ease;
	}

	.store-button:hover {
		opacity: 0.8;
	}

	.app-preview {
		display: flex;
		justify-content: center;
		padding-top: 16px;
	}

	.phone-mockup {
		width: 200px;
		height: 280px;
		background: #1a1a1a;
		border-radius: 24px;
		padding: 8px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	}

	.phone-screen {
		width: 100%;
		height: 100%;
		background: linear-gradient(180deg, #009b3a 0%, #007a2e 100%);
		border-radius: 18px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.app-header {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.app-logo {
		width: 32px;
		height: 32px;
		background: white;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 12px;
		color: #009b3a;
	}

	.app-name {
		color: white;
		font-weight: 500;
		font-size: 12px;
	}

	.app-card {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card-gradient {
		width: 140px;
		height: 88px;
		background: linear-gradient(135deg, #ffd700 0%, #ff8c00 100%);
		border-radius: 8px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.app-features {
		display: flex;
		justify-content: space-around;
	}

	.feature {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.feature-icon {
		width: 24px;
		height: 24px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 6px;
	}

	.feature span {
		color: white;
		font-size: 10px;
		font-weight: 500;
	}

	.phone-ad {
		width: 100%;
		height: auto;
		display: block;
		object-fit: contain;
	}

	.footer {
		margin-top: auto;
		padding-top: 16px;
	}
</style>

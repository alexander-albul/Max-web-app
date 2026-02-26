<script lang="ts">
	interface Props {
		title?: string;
		showBack?: boolean;
		showVerified?: boolean;
		showMenu?: boolean;
		class?: string;
		onBack?: () => void;
		onMenu?: () => void;
	}

	let {
		title = 'Карта жителя',
		showBack = true,
		showVerified = true,
		showMenu = true,
		class: className = '',
		onBack,
		onMenu
	}: Props = $props();

	function handleBack() {
		if (onBack) {
			onBack();
		} else {
			history.back();
		}
	}
</script>

<div class="title-bar {className}">
	<div class="title-content">
		{#if showBack}
			<button type="button" class="icon-button" onclick={handleBack} aria-label="Назад">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>
		{:else}
			<div class="spacer"></div>
		{/if}

		<div class="title-center">
			<span class="title">{title}</span>
			{#if showVerified}
				<svg class="verified-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
					<path d="M8 0L9.79 1.52L12.12 1.21L12.93 3.4L15.07 4.35L14.57 6.65L16 8.57L14.57 10.49L15.07 12.79L12.93 13.74L12.12 15.93L9.79 15.62L8 17.14L6.21 15.62L3.88 15.93L3.07 13.74L0.93 12.79L1.43 10.49L0 8.57L1.43 6.65L0.93 4.35L3.07 3.4L3.88 1.21L6.21 1.52L8 0Z" fill="#009B3A"/>
					<path d="M5.5 8.5L7 10L10.5 6.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			{/if}
		</div>

		{#if showMenu}
			<button type="button" class="icon-button" onclick={onMenu} aria-label="Меню">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<circle cx="12" cy="5" r="1.5" fill="currentColor"/>
					<circle cx="12" cy="12" r="1.5" fill="currentColor"/>
					<circle cx="12" cy="19" r="1.5" fill="currentColor"/>
				</svg>
			</button>
		{:else}
			<div class="spacer"></div>
		{/if}
	</div>
</div>

<style>
	.title-bar {
		padding: 13px 0;
		background: var(--background-base-primary, #ffffff);
	}

	.title-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 16px;
		height: 24px;
	}

	.icon-button {
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

	.icon-button:hover {
		opacity: 0.7;
	}

	.spacer {
		width: 24px;
		height: 24px;
	}

	.title-center {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.title {
		font-family: 'Rubik', sans-serif;
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-primary, #212121);
	}

	.verified-icon {
		flex-shrink: 0;
	}
</style>

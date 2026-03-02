<script lang="ts">
	import MaxCloseIcon from '$lib/icons/max/MaxCloseIcon.svelte';
	import MaxOptionsIcon from '$lib/icons/max/MaxOptionsIcon.svelte';
	import MaxVerifiedIcon from '$lib/icons/max/MaxVerifiedIcon.svelte';

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
			<button type="button" class="icon-button" onclick={handleBack} aria-label="Закрыть">
				<MaxCloseIcon />
			</button>
		{:else}
			<div class="spacer"></div>
		{/if}
		<div class="title-center">
			<span class="title">{title}</span>
			{#if showVerified}
				<MaxVerifiedIcon />
			{/if}
		</div>

		{#if showMenu}
			<button type="button" class="icon-button" onclick={onMenu} aria-label="Меню">
				<MaxOptionsIcon />
			</button>
		{:else}
			<div class="spacer"></div>
		{/if}
	</div>
</div>

<style>
	.title-bar {
		padding: 16px 0;
		padding-bottom: 32px;
		background: var(--background-base-primary, #ffffff);
		border-radius: 16px 16px 0 0;
	}

	.title-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 16px;
		height: 32px;
	}

	.icon-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
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
		width: 32px;
		height: 32px;
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
</style>

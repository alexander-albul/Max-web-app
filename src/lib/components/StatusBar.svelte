<script lang="ts">
	interface Props {
		time?: string;
		class?: string;
	}

	let {
		time = '9:41',
		class: className = ''
	}: Props = $props();

	// Get current time
	let currentTime = $state(time);

	$effect(() => {
		if (time === '9:41') {
			const updateTime = () => {
				const now = new Date();
				currentTime = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
			};
			updateTime();
			const interval = setInterval(updateTime, 1000);
			return () => clearInterval(interval);
		}
	});
</script>

<div class="status-bar {className}">
	<div class="status-left">
		<span class="time">{currentTime}</span>
	</div>
	<div class="status-center">
		<div class="dynamic-island"></div>
	</div>
	<div class="status-right">
		<svg class="icon" width="18" height="12" viewBox="0 0 18 12" fill="none">
			<path d="M1 4.5C2.5 2.5 5 1 9 1C13 1 15.5 2.5 17 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
			<path d="M3.5 7C4.5 5.5 6.5 4.5 9 4.5C11.5 4.5 13.5 5.5 14.5 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
			<circle cx="9" cy="10" r="1.5" fill="currentColor"/>
		</svg>
		<svg class="icon" width="17" height="12" viewBox="0 0 17 12" fill="none">
			<rect x="1" y="2" width="2" height="8" rx="0.5" fill="currentColor"/>
			<rect x="5" y="1" width="2" height="9" rx="0.5" fill="currentColor"/>
			<rect x="9" y="0" width="2" height="10" rx="0.5" fill="currentColor"/>
			<rect x="13" y="0" width="2" height="10" rx="0.5" fill="currentColor"/>
		</svg>
		<div class="battery">
			<div class="battery-body">
				<div class="battery-level"></div>
			</div>
			<div class="battery-cap"></div>
		</div>
	</div>
</div>

<style>
	.status-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 44px;
		padding: 0 16px;
		background: var(--background-base-primary, #ffffff);
	}

	.status-left {
		flex: 1;
	}

	.time {
		font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
		font-weight: 600;
		font-size: 15px;
		color: var(--content-base-primary, #000000);
	}

	.status-center {
		flex: 1;
		display: flex;
		justify-content: center;
	}

	.dynamic-island {
		width: 120px;
		height: 32px;
		background: #000000;
		border-radius: 20px;
	}

	.status-right {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 6px;
	}

	.icon {
		color: var(--content-base-primary, #000000);
	}

	.battery {
		display: flex;
		align-items: center;
		gap: 1px;
	}

	.battery-body {
		width: 25px;
		height: 12px;
		border: 1.5px solid var(--content-base-primary, #000000);
		border-radius: 3px;
		padding: 2px;
	}

	.battery-level {
		width: 100%;
		height: 100%;
		background: var(--content-base-primary, #000000);
		border-radius: 1px;
	}

	.battery-cap {
		width: 2px;
		height: 5px;
		background: var(--content-base-primary, #000000);
		border-radius: 0 1px 1px 0;
	}
</style>

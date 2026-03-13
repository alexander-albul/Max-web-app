<script lang="ts">
	interface Step {
		label: string;
		description?: string;
	}

	interface Props {
		title?: string;
		currentStep?: number;
		totalSteps?: number;
		steps?: Step[];
		class?: string;
	}

	let {
		title = 'Анкета на выпуск\nКарты жителя РТ',
		currentStep = 1,
		totalSteps,
		steps = [],
		class: className = ''
	}: Props = $props();

	// Calculate total steps from either totalSteps prop or steps array length
	const total = $derived(totalSteps ?? steps.length ?? 4);

	// Create array of step indices for iteration
	const stepIndices = $derived(Array.from({ length: total }, (_, i) => i + 1));
</script>

<div class="stepper {className}">
	<!-- Segmented progress bar -->
	<div class="progress-bar">
		{#each stepIndices as stepNumber}
			{@const isCompleted = stepNumber < currentStep}
			{@const isCurrent = stepNumber === currentStep}

			<div class="segment" class:completed={isCompleted} class:current={isCurrent}>
				{#if isCurrent}
					<div class="segment-progress"></div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Content below the bar -->
	<div class="content">
		<div class="title">
			{#each title.split('\n') as line}
				<span>{line}</span>
			{/each}
		</div>
		<div class="counter">{currentStep}/{total}</div>
	</div>
</div>

<style>
	.stepper {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.progress-bar {
		display: flex;
		gap: 4px;
	}

	.segment {
		flex: 1;
		height: 4px;
		border-radius: 2px;
		background: var(--background-base-tertiary, #e0e0e0);
		position: relative;
		overflow: hidden;
	}

	.segment.completed {
		background: var(--background-accent-default, #009b3a);
	}

	.segment.current {
		background: var(--background-base-tertiary, #e0e0e0);
	}

	.segment-progress {
		position: absolute;
		left: 0;
		top: 0;
		width: 24px;
		height: 100%;
		background: var(--background-accent-default, #009b3a);
		border-radius: 2px;
	}

	.content {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.title {
		display: flex;
		flex-direction: column;
		color: var(--content-base-primary, #212121);

		/* [Default]/Text/XL_strong */
		font-family: Roboto;
		font-size: 24px;
		font-style: normal;
		font-weight: 500;
		line-height: 32px; /* 133.333% */
	}

	.counter {
		/* [Default]/Text/XL */
		font-family: Roboto;
		font-size: 24px;
		font-style: normal;
		font-weight: 400;
		line-height: 32px;
		color: var(--content-base-secondary, #6e6d6d);
	}
</style>

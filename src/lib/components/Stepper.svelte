<script lang="ts">
	interface Step {
		label: string;
		description?: string;
	}

	interface Props {
		steps: Step[];
		currentStep?: number;
		class?: string;
	}

	let {
		steps = [],
		currentStep = 1,
		class: className = ''
	}: Props = $props();
</script>

<div class="stepper {className}">
	<div class="steps">
		{#each steps as step, index}
			{@const stepNumber = index + 1}
			{@const isCompleted = stepNumber < currentStep}
			{@const isCurrent = stepNumber === currentStep}
			{@const isPending = stepNumber > currentStep}

			<div class="step" class:completed={isCompleted} class:current={isCurrent} class:pending={isPending}>
				<div class="step-indicator">
					{#if isCompleted}
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
							<path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					{:else}
						<span class="step-number">{stepNumber}</span>
					{/if}
				</div>
				{#if index < steps.length - 1}
					<div class="step-connector" class:completed={isCompleted}></div>
				{/if}
			</div>
		{/each}
	</div>

	{#if steps[currentStep - 1]}
		<div class="step-info">
			<span class="step-label">{steps[currentStep - 1].label}</span>
			{#if steps[currentStep - 1].description}
				<span class="step-description">{steps[currentStep - 1].description}</span>
			{/if}
		</div>
	{/if}
</div>

<style>
	.stepper {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.steps {
		display: flex;
		align-items: center;
	}

	.step {
		display: flex;
		align-items: center;
		flex: 1;
	}

	.step:last-child {
		flex: 0;
	}

	.step-indicator {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		font-family: 'Rubik', sans-serif;
		font-weight: 500;
		font-size: 14px;
		transition: all 0.2s ease;
		flex-shrink: 0;
	}

	.step.completed .step-indicator {
		background: var(--background-accent-default, #009b3a);
		color: var(--content-on-accent, #ffffff);
	}

	.step.current .step-indicator {
		background: var(--background-accent-default, #009b3a);
		color: var(--content-on-accent, #ffffff);
	}

	.step.pending .step-indicator {
		background: var(--background-base-secondary, #f5f5f5);
		color: var(--content-base-secondary, #6e6d6d);
	}

	.step-number {
		line-height: 1;
	}

	.step-connector {
		flex: 1;
		height: 2px;
		background: var(--background-base-tertiary, #e0e0e0);
		margin: 0 8px;
		transition: background 0.2s ease;
	}

	.step-connector.completed {
		background: var(--background-accent-default, #009b3a);
	}

	.step-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.step-label {
		font-family: 'Rubik', sans-serif;
		font-weight: 500;
		font-size: 20px;
		line-height: 28px;
		color: var(--content-base-primary, #212121);
	}

	.step-description {
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-secondary, #6e6d6d);
	}
</style>

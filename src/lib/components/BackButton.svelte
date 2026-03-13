<script lang="ts">
	interface Props {
		onclick?: () => void;
	}

	let { onclick }: Props = $props();

	function handleClick() {
		if (onclick) {
			onclick();
		}
	}
</script>

<div class="back-button">
	<button type="button" class="back-link" {onclick}>
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<path
				d="M15 18L9 12L15 6"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>
</div>

<style>
	.back-button {
		margin-bottom: -12px;
	}

	.back-link {
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
</style>

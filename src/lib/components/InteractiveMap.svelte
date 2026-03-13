<script lang="ts">
	import { onMount } from 'svelte';

	interface Office {
		id: number;
		address: string;
		workHours: string;
		breakTime?: string;
		phone: string;
		x: number; // percent position
		y: number; // percent position
	}

	interface Props {
		offices: Office[];
		selectedOffice?: Office | null;
		class?: string;
		onSelectOffice?: (office: Office) => void;
	}

	let {
		offices = [],
		selectedOffice = $bindable(null),
		class: className = '',
		onSelectOffice
	}: Props = $props();

	let containerRef: HTMLDivElement;
	let mapRef: HTMLDivElement;

	// Transform state
	let scale = $state(1);
	let translateX = $state(0);
	let translateY = $state(0);

	// Interaction state
	let isDragging = $state(false);
	let startX = $state(0);
	let startY = $state(0);
	let lastTranslateX = $state(0);
	let lastTranslateY = $state(0);

	// Popup state
	let activePin = $state<Office | null>(null);
	let popupPosition = $state({ x: 0, y: 0 });

	const MIN_SCALE = 0.5;
	const MAX_SCALE = 3;

	function handleWheel(e: WheelEvent) {
		e.preventDefault();
		const delta = e.deltaY > 0 ? -0.1 : 0.1;
		const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale + delta));
		scale = newScale;
	}

	function handlePointerDown(e: PointerEvent) {
		if (
			(e.target as HTMLElement).closest('.map-pin') ||
			(e.target as HTMLElement).closest('.pin-popup')
		) {
			return;
		}
		isDragging = true;
		startX = e.clientX;
		startY = e.clientY;
		lastTranslateX = translateX;
		lastTranslateY = translateY;
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
	}

	function handlePointerMove(e: PointerEvent) {
		if (!isDragging) return;
		const dx = e.clientX - startX;
		const dy = e.clientY - startY;
		translateX = lastTranslateX + dx;
		translateY = lastTranslateY + dy;
	}

	function handlePointerUp(e: PointerEvent) {
		isDragging = false;
		(e.target as HTMLElement).releasePointerCapture(e.pointerId);
	}

	function handlePinClick(office: Office, e: MouseEvent) {
		e.stopPropagation();

		if (activePin?.id === office.id) {
			activePin = null;
			return;
		}

		activePin = office;

		// Calculate popup position
		const pin = e.currentTarget as HTMLElement;
		const rect = pin.getBoundingClientRect();
		const containerRect = containerRef.getBoundingClientRect();

		popupPosition = {
			x: rect.left - containerRect.left + rect.width / 2,
			y: rect.top - containerRect.top
		};
	}

	function handleSelectOffice() {
		if (activePin) {
			selectedOffice = activePin;
			onSelectOffice?.(activePin);
			activePin = null;
		}
	}

	function handleZoomIn() {
		scale = Math.min(MAX_SCALE, scale + 0.25);
	}

	function handleZoomOut() {
		scale = Math.max(MIN_SCALE, scale - 0.25);
	}

	function handleMapClick(e: MouseEvent) {
		if (
			!(e.target as HTMLElement).closest('.map-pin') &&
			!(e.target as HTMLElement).closest('.pin-popup')
		) {
			activePin = null;
		}
	}

	// Touch handling for pinch zoom
	let initialDistance = $state(0);
	let initialScale = $state(1);

	function getDistance(touches: TouchList): number {
		return Math.hypot(
			touches[0].clientX - touches[1].clientX,
			touches[0].clientY - touches[1].clientY
		);
	}

	function handleTouchStart(e: TouchEvent) {
		if (e.touches.length === 2) {
			initialDistance = getDistance(e.touches);
			initialScale = scale;
		}
	}

	function handleTouchMove(e: TouchEvent) {
		if (e.touches.length === 2) {
			e.preventDefault();
			const currentDistance = getDistance(e.touches);
			const newScale = initialScale * (currentDistance / initialDistance);
			scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
		}
	}
</script>

<div
	class="map-container {className}"
	bind:this={containerRef}
	onwheel={handleWheel}
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	onpointerup={handlePointerUp}
	onpointercancel={handlePointerUp}
	ontouchstart={handleTouchStart}
	ontouchmove={handleTouchMove}
	onclick={handleMapClick}
	role="application"
	aria-label="Интерактивная карта"
>
	<div
		class="map-content"
		bind:this={mapRef}
		style="transform: translate({translateX}px, {translateY}px) scale({scale})"
	>
		<!-- Map background -->
		<div class="map-background">
			<!-- Simplified map grid -->
			<svg class="map-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
				<defs>
					<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
						<path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e0e0e0" stroke-width="0.5" />
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="#f0f4f0" />
				<rect width="100%" height="100%" fill="url(#grid)" />

				<!-- Roads -->
				<path d="M 0 150 L 400 150" stroke="#ffffff" stroke-width="8" />
				<path d="M 200 0 L 200 300" stroke="#ffffff" stroke-width="8" />
				<path d="M 50 50 L 350 250" stroke="#ffffff" stroke-width="6" />
				<path d="M 50 250 L 350 50" stroke="#ffffff" stroke-width="6" />

				<!-- Buildings -->
				<rect x="60" y="60" width="40" height="30" fill="#d0d0d0" rx="2" />
				<rect x="140" y="40" width="50" height="40" fill="#d0d0d0" rx="2" />
				<rect x="260" y="70" width="45" height="35" fill="#d0d0d0" rx="2" />
				<rect x="80" y="180" width="60" height="45" fill="#d0d0d0" rx="2" />
				<rect x="200" y="200" width="55" height="40" fill="#d0d0d0" rx="2" />
				<rect x="300" y="180" width="50" height="50" fill="#d0d0d0" rx="2" />

				<!-- Parks -->
				<ellipse cx="320" cy="80" rx="30" ry="25" fill="#c8e6c9" />
				<ellipse cx="100" cy="240" rx="35" ry="30" fill="#c8e6c9" />
			</svg>
		</div>

		<!-- Pins -->
		{#each offices as office}
			<button
				type="button"
				class="map-pin"
				class:active={activePin?.id === office.id}
				class:selected={selectedOffice?.id === office.id}
				style="left: {office.x}%; top: {office.y}%"
				onclick={(e) => handlePinClick(office, e)}
				aria-label={office.address}
			>
				<svg width="30" height="36" viewBox="0 0 30 36" fill="none">
					<path
						d="M15 0C6.72 0 0 6.72 0 15C0 26.25 15 36 15 36C15 36 30 26.25 30 15C30 6.72 23.28 0 15 0Z"
						fill="currentColor"
					/>
					<circle cx="15" cy="13" r="6" fill="white" />
				</svg>
			</button>
		{/each}
	</div>

	<!-- Pin Popup -->
	{#if activePin}
		<div class="pin-popup" style="left: {popupPosition.x}px; top: {popupPosition.y}px">
			<div class="popup-content">
				<p class="popup-address">{activePin.address}</p>
				<p class="popup-hours">{activePin.workHours}</p>
				{#if activePin.breakTime}
					<p class="popup-break">{activePin.breakTime}</p>
				{/if}
				<p class="popup-phone">{activePin.phone}</p>
				<button type="button" class="popup-button" onclick={handleSelectOffice}>
					Забрать здесь
				</button>
			</div>
		</div>
	{/if}

	<!-- Zoom Controls -->
	<div class="zoom-controls">
		<button type="button" class="zoom-button" onclick={handleZoomIn} aria-label="Приблизить">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
				<path d="M10 4V16M4 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			</svg>
		</button>
		<button type="button" class="zoom-button" onclick={handleZoomOut} aria-label="Отдалить">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
				<path d="M4 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			</svg>
		</button>
	</div>
</div>

<style>
	.map-container {
		position: relative;
		width: 100%;
		height: 300px;
		border-radius: 12px;
		overflow: hidden;
		cursor: grab;
		touch-action: none;
		user-select: none;
	}

	.map-container:active {
		cursor: grabbing;
	}

	.map-content {
		position: absolute;
		width: 100%;
		height: 100%;
		transform-origin: center center;
		transition: transform 0.1s ease-out;
	}

	.map-background {
		width: 100%;
		height: 100%;
	}

	.map-svg {
		width: 100%;
		height: 100%;
	}

	.map-pin {
		position: absolute;
		transform: translate(-50%, -100%);
		background: transparent;
		border: none;
		padding: 0;
		cursor: pointer;
		color: var(--content-accent-default, #009b3a);
		transition:
			transform 0.2s ease,
			color 0.2s ease;
		z-index: 10;
	}

	.map-pin:hover {
		transform: translate(-50%, -100%) scale(1.1);
	}

	.map-pin.active,
	.map-pin.selected {
		color: var(--content-accent-hover, #007a2e);
		transform: translate(-50%, -100%) scale(1.15);
		z-index: 20;
	}

	.pin-popup {
		position: absolute;
		transform: translate(-50%, calc(-100% - 44px));
		z-index: 100;
		animation: popupFadeIn 0.2s ease;
	}

	@keyframes popupFadeIn {
		from {
			opacity: 0;
			transform: translate(-50%, calc(-100% - 36px));
		}
		to {
			opacity: 1;
			transform: translate(-50%, calc(-100% - 44px));
		}
	}

	.popup-content {
		background: var(--background-base-primary, #ffffff);
		border-radius: 12px;
		padding: 16px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		min-width: 240px;
		max-width: 280px;
	}

	.popup-content::after {
		content: '';
		position: absolute;
		bottom: -8px;
		left: 50%;
		transform: translateX(-50%);
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-top: 8px solid var(--background-base-primary, #ffffff);
	}

	.popup-address {
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-primary, #212121);
		margin: 0 0 8px 0;
	}

	.popup-hours,
	.popup-break {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		color: var(--content-base-secondary, #6e6d6d);
		margin: 0 0 4px 0;
	}

	.popup-phone {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		color: var(--content-base-secondary, #6e6d6d);
		margin: 0 0 12px 0;
	}

	.popup-button {
		width: 100%;
		height: 44px;
		background: var(--background-accent-default, #009b3a);
		color: var(--content-on-accent, #ffffff);
		border: none;
		border-radius: 8px;
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 14px;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.popup-button:hover {
		background: var(--background-accent-hover, #008833);
	}

	.zoom-controls {
		position: absolute;
		bottom: 16px;
		right: 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		z-index: 50;
	}

	.zoom-button {
		width: 40px;
		height: 40px;
		background: var(--background-base-primary, #ffffff);
		border: 1px solid var(--border-base-main, #e0e0e0);
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		color: var(--content-base-primary, #212121);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition: background 0.2s ease;
	}

	.zoom-button:hover {
		background: var(--background-base-secondary, #f5f5f5);
	}

	.zoom-button:active {
		background: var(--background-base-tertiary, #ebebeb);
	}
</style>

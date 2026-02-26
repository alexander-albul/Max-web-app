<script lang="ts">
	interface Props {
		value?: Date | null;
		placeholder?: string;
		label?: string;
		hint?: string;
		size?: 'm' | 'l';
		disabled?: boolean;
		required?: boolean;
		error?: string;
		minDate?: Date;
		maxDate?: Date;
		class?: string;
		onChange?: (date: Date | null) => void;
	}

	let {
		value = $bindable(null),
		placeholder = 'Выберите дату',
		label = '',
		hint = '',
		size = 'm',
		disabled = false,
		required = false,
		error = '',
		minDate,
		maxDate,
		class: className = '',
		onChange
	}: Props = $props();

	let isOpen = $state(false);
	let isFocused = $state(false);
	let currentMonth = $state(value ? new Date(value) : new Date());
	let containerRef: HTMLDivElement;

	const DAYS_OF_WEEK = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
	const MONTHS = [
		'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
		'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
	];

	const hasError = $derived(!!error);
	const hasValue = $derived(!!value);
	const isFloating = $derived(isFocused || hasValue || isOpen);

	const displayValue = $derived(
		value ? value.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''
	);

	const calendarDays = $derived.by(() => {
		const year = currentMonth.getFullYear();
		const month = currentMonth.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const startPadding = (firstDay.getDay() + 6) % 7;
		const days: Array<{ date: Date; isCurrentMonth: boolean; isToday: boolean; isSelected: boolean; isDisabled: boolean }> = [];

		// Previous month days
		for (let i = startPadding - 1; i >= 0; i--) {
			const date = new Date(year, month, -i);
			days.push({
				date,
				isCurrentMonth: false,
				isToday: isSameDay(date, new Date()),
				isSelected: value ? isSameDay(date, value) : false,
				isDisabled: isDateDisabled(date)
			});
		}

		// Current month days
		for (let i = 1; i <= lastDay.getDate(); i++) {
			const date = new Date(year, month, i);
			days.push({
				date,
				isCurrentMonth: true,
				isToday: isSameDay(date, new Date()),
				isSelected: value ? isSameDay(date, value) : false,
				isDisabled: isDateDisabled(date)
			});
		}

		// Next month days
		const remainingDays = 42 - days.length;
		for (let i = 1; i <= remainingDays; i++) {
			const date = new Date(year, month + 1, i);
			days.push({
				date,
				isCurrentMonth: false,
				isToday: isSameDay(date, new Date()),
				isSelected: value ? isSameDay(date, value) : false,
				isDisabled: isDateDisabled(date)
			});
		}

		return days;
	});

	function isSameDay(date1: Date, date2: Date): boolean {
		return (
			date1.getFullYear() === date2.getFullYear() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getDate() === date2.getDate()
		);
	}

	function isDateDisabled(date: Date): boolean {
		if (minDate && date < minDate) return true;
		if (maxDate && date > maxDate) return true;
		return false;
	}

	function handleToggle() {
		if (disabled) return;
		isOpen = !isOpen;
		isFocused = isOpen;
	}

	function handleDateSelect(date: Date) {
		if (isDateDisabled(date)) return;
		value = date;
		isOpen = false;
		isFocused = false;
		onChange?.(date);
	}

	function handlePrevMonth() {
		currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
	}

	function handleNextMonth() {
		currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
	}

	function handleClear(e: MouseEvent) {
		e.stopPropagation();
		value = null;
		onChange?.(null);
	}

	function handleClickOutside(e: MouseEvent) {
		if (containerRef && !containerRef.contains(e.target as Node)) {
			isOpen = false;
			isFocused = false;
		}
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	});
</script>

<div class="datepicker-wrapper {className}" bind:this={containerRef}>
	<button
		type="button"
		class="datepicker-trigger"
		class:focused={isFocused}
		class:disabled
		class:error={hasError}
		class:size-m={size === 'm'}
		class:size-l={size === 'l'}
		class:floating={isFloating}
		onclick={handleToggle}
		{disabled}
	>
		<div class="content-box">
			{#if label}
				<span class="label" class:label-floating={isFloating}>
					{label}
					{#if required}
						<span class="required">*</span>
					{/if}
				</span>
			{/if}
			<span class="value" class:has-label={!!label} class:placeholder={!value}>
				{value ? displayValue : (label ? '' : placeholder)}
			</span>
		</div>

		<div class="actions">
			{#if value && !disabled}
				<button type="button" class="clear-button" onclick={handleClear} aria-label="Очистить">
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
			{/if}
			<svg class="calendar-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M16 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M8 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="M3 10H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</div>
	</button>

	{#if isOpen}
		<div class="calendar-dropdown">
			<div class="calendar-header">
				<button type="button" class="nav-button" onclick={handlePrevMonth} aria-label="Предыдущий месяц">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
				<span class="month-year">
					{MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
				</span>
				<button type="button" class="nav-button" onclick={handleNextMonth} aria-label="Следующий месяц">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
						<path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
			</div>

			<div class="calendar-grid">
				<div class="weekdays">
					{#each DAYS_OF_WEEK as day}
						<span class="weekday">{day}</span>
					{/each}
				</div>
				<div class="days">
					{#each calendarDays as day}
						<button
							type="button"
							class="day"
							class:other-month={!day.isCurrentMonth}
							class:today={day.isToday}
							class:selected={day.isSelected}
							class:disabled={day.isDisabled}
							onclick={() => handleDateSelect(day.date)}
							disabled={day.isDisabled}
						>
							{day.date.getDate()}
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	{#if hint && !hasError}
		<p class="hint">{hint}</p>
	{/if}

	{#if hasError}
		<p class="error-message">{error}</p>
	{/if}
</div>

<style>
	.datepicker-wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.datepicker-trigger {
		background: var(--background-base-primary, #f5f5f5);
		border: 1px solid var(--border-base-main, #c8c6c6);
		border-radius: var(--border-radius-l, 12px);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-3x, 12px);
		padding: 0 var(--spacing-5x, 20px);
		position: relative;
		transition: all 0.2s ease;
		cursor: pointer;
		text-align: left;
		width: 100%;
	}

	.datepicker-trigger.size-m {
		height: 56px;
	}

	.datepicker-trigger.size-l {
		height: 64px;
	}

	.datepicker-trigger.focused {
		border-color: var(--border-accent-default, #009b3a);
		background: var(--background-base-primary, #ffffff);
	}

	.datepicker-trigger.error {
		border-color: var(--border-error, #e53935);
	}

	.datepicker-trigger.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.content-box {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
		position: relative;
		height: 100%;
		justify-content: center;
	}

	.label {
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-secondary, #6e6d6d);
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		transition: all 0.2s ease;
	}

	.label-floating {
		font-size: 12px;
		line-height: 16px;
		top: 8px;
		transform: translateY(0);
	}

	.focused .label {
		color: var(--content-accent-default, #009b3a);
	}

	.error .label {
		color: var(--content-error, #e53935);
	}

	.required {
		color: var(--content-error, #e53935);
	}

	.value {
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-primary, #212121);
	}

	.value.has-label {
		padding-top: 16px;
	}

	.value.placeholder {
		color: var(--content-base-secondary, #6e6d6d);
	}

	.actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-2x, 8px);
	}

	.clear-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border: none;
		background: transparent;
		cursor: pointer;
		padding: 0;
		color: var(--content-base-secondary, #6e6d6d);
	}

	.clear-button:hover {
		color: var(--content-base-primary, #212121);
	}

	.calendar-icon {
		color: var(--content-base-secondary, #6e6d6d);
		flex-shrink: 0;
	}

	.calendar-dropdown {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		background: var(--background-base-primary, #ffffff);
		border: 1px solid var(--border-base-main, #c8c6c6);
		border-radius: var(--border-radius-l, 12px);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
		padding: var(--spacing-4x, 16px);
		z-index: 1000;
		min-width: 280px;
	}

	.calendar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--spacing-4x, 16px);
	}

	.nav-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: none;
		background: transparent;
		cursor: pointer;
		border-radius: var(--border-radius-m, 8px);
		color: var(--content-base-primary, #212121);
		transition: background 0.2s ease;
	}

	.nav-button:hover {
		background: var(--background-base-secondary, #f5f5f5);
	}

	.month-year {
		font-family: 'Rubik', sans-serif;
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-primary, #212121);
	}

	.calendar-grid {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-2x, 8px);
	}

	.weekdays {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 4px;
	}

	.weekday {
		font-family: 'Rubik', sans-serif;
		font-weight: 500;
		font-size: 12px;
		line-height: 16px;
		color: var(--content-base-secondary, #6e6d6d);
		text-align: center;
		padding: 4px;
	}

	.days {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 4px;
	}

	.day {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: none;
		background: transparent;
		cursor: pointer;
		border-radius: var(--border-radius-m, 8px);
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-primary, #212121);
		transition: all 0.2s ease;
	}

	.day:hover:not(.disabled):not(.selected) {
		background: var(--background-base-secondary, #f5f5f5);
	}

	.day.other-month {
		color: var(--content-base-tertiary, #9e9e9e);
	}

	.day.today {
		font-weight: 600;
		color: var(--content-accent-default, #009b3a);
	}

	.day.selected {
		background: var(--background-accent-default, #009b3a);
		color: var(--content-on-accent, #ffffff);
	}

	.day.disabled {
		color: var(--content-base-disabled, #bdbdbd);
		cursor: not-allowed;
	}

	.hint {
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		color: var(--content-base-secondary, #6e6d6d);
		margin: 4px 0 0 0;
		padding: 0 var(--spacing-5x, 20px);
	}

	.error-message {
		font-family: 'Rubik', sans-serif;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		color: var(--content-error, #e53935);
		margin: 4px 0 0 0;
		padding: 0 var(--spacing-5x, 20px);
	}
</style>

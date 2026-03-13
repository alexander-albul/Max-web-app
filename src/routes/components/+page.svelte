<script lang="ts">
	import Checkbox from '$lib/components/Checkbox.svelte';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import Segment from '$lib/components/Segment.svelte';
	import Button from '$lib/components/Button.svelte';
	import SectionMessage from '$lib/components/SectionMessage.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import Backdrop from '$lib/components/Backdrop.svelte';

	// Checkbox states
	let checkbox1 = $state(false);
	let checkbox2 = $state(true);
	let checkbox3 = $state(false);

	// DatePicker state
	let selectedDate = $state<Date | null>(null);

	// Segment state
	let selectedSegment = $state('option1');
	const segmentOptions = [
		{ value: 'option1', label: 'Опция 1' },
		{ value: 'option2', label: 'Опция 2' },
		{ value: 'option3', label: 'Опция 3' }
	];

	let selectedSize = $state('m');
	const sizeOptions = [
		{ value: 's', label: 'S' },
		{ value: 'm', label: 'M' },
		{ value: 'l', label: 'L' }
	];

	// Button loading state
	let isLoading = $state(false);

	function handleButtonClick() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 2000);
	}

	// Backdrop state
	let showBackdrop = $state(false);
</script>

<svelte:head>
	<title>Компоненты</title>
</svelte:head>

<div class="page">
	<h1>Компоненты UI</h1>

	<!-- Checkbox Section -->
	<section class="section">
		<h2>Checkbox</h2>
		<div class="component-grid">
			<div class="demo-block">
				<h3>Базовые варианты</h3>
				<div class="demo-row">
					<Checkbox bind:checked={checkbox1} label="Обычный чекбокс" />
				</div>
				<div class="demo-row">
					<Checkbox bind:checked={checkbox2} label="Выбранный чекбокс" description="С описанием" />
				</div>
				<div class="demo-row">
					<Checkbox indeterminate={true} label="Неопределённое состояние" />
				</div>
			</div>

			<div class="demo-block">
				<h3>Состояния</h3>
				<div class="demo-row">
					<Checkbox disabled label="Отключённый" />
				</div>
				<div class="demo-row">
					<Checkbox disabled checked={true} label="Отключённый выбранный" />
				</div>
				<div class="demo-row">
					<Checkbox error bind:checked={checkbox3} label="С ошибкой" />
				</div>
			</div>

			<div class="demo-block">
				<h3>Размеры</h3>
				<div class="demo-row">
					<Checkbox size="s" label="Маленький (S)" />
				</div>
				<div class="demo-row">
					<Checkbox size="m" label="Средний (M)" />
				</div>
			</div>
		</div>
	</section>

	<Divider spacing="l" />

	<!-- DatePicker Section -->
	<section class="section">
		<h2>DatePicker</h2>
		<div class="component-grid">
			<div class="demo-block">
				<h3>Базовый</h3>
				<DatePicker bind:value={selectedDate} label="Дата рождения" hint="Выберите дату" />
				{#if selectedDate}
					<p class="selected-value">Выбрано: {selectedDate.toLocaleDateString('ru-RU')}</p>
				{/if}
			</div>

			<div class="demo-block">
				<h3>С ограничениями</h3>
				<DatePicker label="Дата бронирования" minDate={new Date()} hint="Только будущие даты" />
			</div>

			<div class="demo-block">
				<h3>Состояния</h3>
				<DatePicker label="Отключённый" disabled />
				<div style="margin-top: 16px;">
					<DatePicker label="С ошибкой" error="Поле обязательно" required />
				</div>
			</div>
		</div>
	</section>

	<Divider spacing="l" />

	<!-- Segment Section -->
	<section class="section">
		<h2>Segment</h2>
		<div class="component-grid">
			<div class="demo-block">
				<h3>Базовый</h3>
				<Segment options={segmentOptions} bind:value={selectedSegment} />
				<p class="selected-value">Выбрано: {selectedSegment}</p>
			</div>

			<div class="demo-block">
				<h3>Размеры</h3>
				<div class="demo-row">
					<Segment options={sizeOptions} size="s" value="s" />
				</div>
				<div class="demo-row">
					<Segment options={sizeOptions} size="m" value="m" />
				</div>
				<div class="demo-row">
					<Segment options={sizeOptions} size="l" value="l" />
				</div>
			</div>

			<div class="demo-block">
				<h3>На всю ширину</h3>
				<Segment options={segmentOptions} fullWidth />
			</div>
		</div>
	</section>

	<Divider spacing="l" />

	<!-- Button Section -->
	<section class="section">
		<h2>Button</h2>
		<div class="component-grid">
			<div class="demo-block">
				<h3>Варианты</h3>
				<div class="button-row">
					<Button variant="primary">Primary</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="danger">Danger</Button>
					<Button variant="success">Success</Button>
				</div>
			</div>

			<div class="demo-block">
				<h3>Размеры</h3>
				<div class="button-row">
					<Button size="s">Small</Button>
					<Button size="m">Medium</Button>
					<Button size="l">Large</Button>
				</div>
			</div>

			<div class="demo-block">
				<h3>Состояния</h3>
				<div class="button-row">
					<Button disabled>Отключена</Button>
					<Button loading={isLoading} onClick={handleButtonClick}>
						{isLoading ? 'Загрузка...' : 'Нажми меня'}
					</Button>
				</div>
			</div>

			<div class="demo-block">
				<h3>На всю ширину</h3>
				<Button fullWidth>Кнопка на всю ширину</Button>
			</div>
		</div>
	</section>

	<Divider spacing="l" />

	<!-- SectionMessage Section -->
	<section class="section">
		<h2>SectionMessage</h2>
		<div class="messages-grid">
			<SectionMessage type="info" title="Информация">
				Это информационное сообщение для пользователя.
			</SectionMessage>

			<SectionMessage type="success" title="Успех">Операция выполнена успешно!</SectionMessage>

			<SectionMessage type="warning" title="Внимание">
				Пожалуйста, обратите внимание на эту информацию.
			</SectionMessage>

			<SectionMessage type="error" title="Ошибка" closable>
				Произошла ошибка при выполнении операции.
			</SectionMessage>

			<SectionMessage type="info" title="С действиями">
				{#snippet actions()}
					<Button variant="ghost" size="s">Подробнее</Button>
					<Button variant="ghost" size="s">Отмена</Button>
				{/snippet}
				Сообщение с кнопками действий.
			</SectionMessage>
		</div>
	</section>

	<Divider spacing="l" />

	<!-- Divider Section -->
	<section class="section">
		<h2>Divider</h2>
		<div class="component-grid">
			<div class="demo-block">
				<h3>Обычный</h3>
				<p>Текст до разделителя</p>
				<Divider />
				<p>Текст после разделителя</p>
			</div>

			<div class="demo-block">
				<h3>Пунктирный</h3>
				<p>Текст до разделителя</p>
				<Divider variant="dashed" />
				<p>Текст после разделителя</p>
			</div>

			<div class="demo-block">
				<h3>С текстом</h3>
				<Divider>или</Divider>
				<div style="margin-top: 16px;">
					<Divider variant="dashed">продолжить</Divider>
				</div>
			</div>

			<div class="demo-block">
				<h3>Вертикальный</h3>
				<div class="vertical-demo">
					<span>Слева</span>
					<Divider orientation="vertical" spacing="m" />
					<span>Справа</span>
				</div>
			</div>
		</div>
	</section>

	<Divider spacing="l" />

	<!-- Backdrop Section -->
	<section class="section">
		<h2>Backdrop</h2>
		<div class="component-grid">
			<div class="demo-block">
				<h3>Демонстрация</h3>
				<Button onClick={() => (showBackdrop = true)}>Показать Backdrop</Button>
			</div>
		</div>
	</section>

	<Backdrop bind:visible={showBackdrop} blur>
		<div class="modal-demo">
			<h3>Модальное окно</h3>
			<p>Это пример содержимого внутри Backdrop.</p>
			<p>Нажмите Escape или кликните вне окна для закрытия.</p>
			<Button onClick={() => (showBackdrop = false)}>Закрыть</Button>
		</div>
	</Backdrop>
</div>

<style>
	.page {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--spacing-6x, 24px);
	}

	h1 {
		font-family: 'Roboto', sans-serif;
		font-weight: 700;
		font-size: 32px;
		line-height: 40px;
		color: var(--content-base-primary, #212121);
		margin: 0 0 var(--spacing-8x, 32px) 0;
	}

	h2 {
		font-family: 'Roboto', sans-serif;
		font-weight: 600;
		font-size: 24px;
		line-height: 32px;
		color: var(--content-base-primary, #212121);
		margin: 0 0 var(--spacing-5x, 20px) 0;
	}

	h3 {
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 16px;
		line-height: 24px;
		color: var(--content-base-secondary, #6e6d6d);
		margin: 0 0 var(--spacing-3x, 12px) 0;
	}

	p {
		font-family: 'Roboto', sans-serif;
		font-size: 14px;
		line-height: 20px;
		color: var(--content-base-primary, #212121);
		margin: 0;
	}

	.section {
		margin-bottom: var(--spacing-4x, 16px);
	}

	.component-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--spacing-6x, 24px);
	}

	.demo-block {
		background: var(--background-base-primary, #ffffff);
		border: 1px solid var(--border-base-main, #e0e0e0);
		border-radius: var(--border-radius-l, 12px);
		padding: var(--spacing-5x, 20px);
	}

	.demo-row {
		margin-bottom: var(--spacing-3x, 12px);
	}

	.demo-row:last-child {
		margin-bottom: 0;
	}

	.button-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-3x, 12px);
		align-items: center;
	}

	.messages-grid {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4x, 16px);
	}

	.selected-value {
		margin-top: var(--spacing-3x, 12px);
		font-size: 14px;
		color: var(--content-base-secondary, #6e6d6d);
	}

	.vertical-demo {
		display: flex;
		align-items: center;
		height: 40px;
	}

	.modal-demo {
		background: var(--background-base-primary, #ffffff);
		border-radius: var(--border-radius-xl, 16px);
		padding: var(--spacing-6x, 24px);
		min-width: 320px;
		max-width: 480px;
		text-align: center;
	}

	.modal-demo h3 {
		color: var(--content-base-primary, #212121);
		margin-bottom: var(--spacing-4x, 16px);
	}

	.modal-demo p {
		margin-bottom: var(--spacing-3x, 12px);
	}
</style>

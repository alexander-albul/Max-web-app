<script lang="ts">
	import { goto } from '$app/navigation';
	import StatusBar from '$lib/components/StatusBar.svelte';
	import TitleBar from '$lib/components/TitleBar.svelte';
</script>

<svelte:head>
	<title>Карта жителя</title>
</svelte:head>

<div class="phone-frame">
	<div class="screen">
		<header class="header">
			<StatusBar>
				<TitleBar onBack={() => goto('/', { replaceState: true })} />
			</StatusBar>
		</header>

		<!-- Scroll content -->
		<div class="scroll-area">
			<!-- Banner: Карта жителя -->
			<button class="banner banner-green" onclick={() => goto('/card/step1')}>
				<div class="banner-text">
					<span class="banner-title green-title">Выпустить Карту жителя</span>
					<span class="banner-sub green-sub">для жителей Республики Татарстан</span>
				</div>
				<div class="banner-images">
					<img class="banner-icon-percent" src="/main-page/percent.png" alt="" />
					<img class="banner-card" src="/main-page/image-365.png" alt="Карта жителя" />
				</div>
			</button>

			<!-- Banner: Детская карта -->
			<button class="banner banner-purple" onclick={() => goto('/child-card/step1')}>
				<div class="banner-text">
					<span class="banner-title purple-title">Выпустить</span>
					<span class="banner-title purple-title">Детскую карту жителя</span>
					<span class="banner-sub purple-sub">для юных жителей Республики Татарстан</span>
				</div>
				<div class="banner-images">
					<img class="banner-icon-cube" src="/main-page/cube.png" alt="" />
					<img class="banner-card" src="/main-page/image-373.png" alt="Детская карта" />
				</div>
			</button>

			<!-- Сервисы -->
			<h2 class="section-title">Сервисы</h2>

			<div class="services">
				<button class="service-item">
					<div class="service-icon service-icon-orange">
						<img src="/main-page/coins.png" alt="" />
					</div>
					<div class="service-text">
						<span class="service-name">Финансовая грамотность</span>
						<span class="service-desc">Узнайте, как управлять финансами</span>
					</div>
				</button>

				<div class="divider"></div>

				<button class="service-item">
					<div class="service-icon service-icon-green">
						<img src="/main-page/scale.png" alt="" />
					</div>
					<div class="service-text">
						<span class="service-name">Юридическая помощь</span>
						<span class="service-desc">Бесплатная помощь юриста</span>
					</div>
				</button>
			</div>
		</div>

		<!-- Tab bar -->
		<nav class="tabbar">
			<button class="tab tab-active">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M10.205 3.54115C11.2348 2.65857 12.7542 2.65856 13.7841 3.54115L15.2499 4.79799C15.252 4.36664 15.3805 3.94657 15.6229 3.61635C15.8672 3.28384 16.2668 3.00029 16.7772 3.00013H18.2216C18.7322 3.00013 19.1315 3.28375 19.3758 3.61635C19.6206 3.94943 19.7499 4.37336 19.7499 4.80873V8.65443L21.4833 10.1388C21.7977 10.4083 21.8337 10.8819 21.5643 11.1964C21.3581 11.4371 21.0324 11.5156 20.7499 11.4181V19.0675C20.7499 20.6347 19.3425 21.7501 17.8094 21.7501H14.2001C13.6479 21.7501 13.2002 21.3023 13.2001 20.7501V16.5001H10.7997V20.7501C10.7995 21.3023 10.3519 21.7501 9.79968 21.7501H6.1903C4.65725 21.7501 3.24987 20.6347 3.24987 19.0675V11.4142C2.96514 11.517 2.63434 11.4399 2.42565 11.1964C2.15634 10.882 2.19256 10.4093 2.50671 10.1398L10.205 3.54115ZM12.8075 4.67982C12.3395 4.27905 11.6495 4.27908 11.1815 4.67982L4.74987 10.1925V19.0675C4.74987 19.635 5.30328 20.2501 6.1903 20.2501H9.29968V16.0001C9.29968 15.4479 9.74746 15.0002 10.2997 15.0001H13.7001C14.2522 15.0003 14.7001 15.4479 14.7001 16.0001V20.2501H17.8094C18.6965 20.2501 19.2499 19.635 19.2499 19.0675V10.2013L12.8075 4.67982ZM16.8348 4.50013L16.8319 4.50404C16.7951 4.55423 16.7499 4.65982 16.7499 4.80873V6.08314L18.2499 7.3683V4.80873C18.2499 4.65987 18.2047 4.55426 18.1678 4.50404L18.1639 4.50013H16.8348Z" fill="#009B3A"/>
				</svg>
				<span>Главная</span>
			</button>
			<button class="tab">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M19 3C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5L4.7959 20.9893C3.78722 20.887 3 20.0357 3 19V5C3 3.89543 3.89543 3 5 3H19ZM5.5 4.5C4.94772 4.5 4.5 4.94772 4.5 5.5V18.5C4.5 19.0523 4.94772 19.5 5.5 19.5H18.5C19.0523 19.5 19.5 19.0523 19.5 18.5V5.5C19.5 4.94772 19.0523 4.5 18.5 4.5H5.5ZM16 13C17.1046 13 18 13.8954 18 15V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V15C6 13.8954 6.89543 13 8 13H16ZM8 14.5C7.72386 14.5 7.5 14.7239 7.5 15V16C7.5 16.2761 7.72386 16.5 8 16.5H16C16.2761 16.5 16.5 16.2761 16.5 16V15C16.5 14.7239 16.2761 14.5 16 14.5H8ZM17.25 9.5C17.6642 9.5 18 9.83579 18 10.25C18 10.6642 17.6642 11 17.25 11H6.75C6.33579 11 6 10.6642 6 10.25C6 9.83579 6.33579 9.5 6.75 9.5H17.25ZM13.25 6C13.6642 6 14 6.33579 14 6.75C14 7.16421 13.6642 7.5 13.25 7.5H6.75C6.33579 7.5 6 7.16421 6 6.75C6 6.33579 6.33579 6 6.75 6H13.25Z" fill="#6E6D6D"/>
				</svg>
				<span>Новости</span>
			</button>
			<button class="tab">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M17 13C19.2091 13 21 14.7909 21 17C21 19.2091 19.2091 21 17 21C14.7909 21 13 19.2091 13 17C13 14.7909 14.7909 13 17 13ZM18.7178 4.22168C19.0107 3.92896 19.4855 3.92886 19.7783 4.22168C20.0712 4.51452 20.071 4.98932 19.7783 5.28223L5.28223 19.7783C4.98931 20.071 4.5145 20.0711 4.22168 19.7783C3.92887 19.4855 3.92902 19.0107 4.22168 18.7178L18.7178 4.22168ZM17 14.5C15.6193 14.5 14.5 15.6193 14.5 17C14.5 18.3807 15.6193 19.5 17 19.5C18.3807 19.5 19.5 18.3807 19.5 17C19.5 15.6193 18.3807 14.5 17 14.5ZM7 3C9.20914 3 11 4.79086 11 7C11 9.20914 9.20914 11 7 11C4.79086 11 3 9.20914 3 7C3 4.79086 4.79086 3 7 3ZM7 4.5C5.61929 4.5 4.5 5.61929 4.5 7C4.5 8.38071 5.61929 9.5 7 9.5C8.38071 9.5 9.5 8.38071 9.5 7C9.5 5.61929 8.38071 4.5 7 4.5Z" fill="#6E6D6D"/>
				</svg>
				<span>Акции</span>
			</button>
		</nav>
	</div>
</div>

<style>
	.phone-frame {
		display: flex;
		flex-direction: column;
		height: 100svh;
		max-height: 812px;
		width: 100%;
		max-width: 375px;
		overflow: hidden;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
	}

	.screen {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background: #f2f2f7;
		overflow: hidden;
	}

	.header {
		position: sticky;
		top: 0;
		z-index: 100;
		flex-shrink: 0;
	}

	/* Scroll area */
	.scroll-area {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		padding: 16px 16px 0;
		display: flex;
		flex-direction: column;
		gap: 12px;
		scrollbar-width: none;
	}

	.scroll-area::-webkit-scrollbar {
		display: none;
	}

	/* Banners */
	.banner {
		width: 100%;
		border: none;
		border-radius: 16px;
		padding: 16px;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		cursor: pointer;
		text-align: left;
		position: relative;
		overflow: hidden;
		min-height: 88px;
		flex-shrink: 0;
	}

	.banner-green {
		background: #c8f0d0;
	}

	.banner-purple {
		background: #e0d4f5;
	}

	.banner-text {
		display: flex;
		flex-direction: column;
		gap: 2px;
		z-index: 1;
		max-width: 50%;
		padding-top: 2px;
	}

	.banner-title {
		font-family: 'Roboto', sans-serif;
		font-weight: 700;
		font-size: 14px;
		line-height: 18px;
	}

	.green-title {
		color: #004D1C;
	}

	.purple-title {
		color: #603F83;
	}

	.banner-sub {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		margin-top: 2px;
	}

	.green-sub {
		color: #004D1C;
	}

	.purple-sub {
		color: #603F83;
	}

	.banner-images {
		position: absolute;
		right: 12px;
		top: 50%;
		transform: translateY(-50%);
		width: 130px;
		height: 80px;
	}

	.banner-card {
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 100px;
		height: auto;
		border-radius: 6px;
		object-fit: contain;
	}

	.banner-icon-percent {
		position: absolute;
		width: 40px;
		height: 40px;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		z-index: 2;
	}

	.banner-icon-cube {
		position: absolute;
		width: 38px;
		height: 38px;
		left: 4px;
		top: 50%;
		transform: translateY(-50%);
		z-index: 2;
	}

	/* Section title */
	.section-title {
		font-family: 'Roboto', sans-serif;
		font-weight: 700;
		font-size: 20px;
		color: #212121;
		margin: 8px 0 0;
		padding: 0;
		flex-shrink: 0;
	}

	/* Services */
	.services {
		background: #ffffff;
		border-radius: 16px;
		overflow: hidden;
		flex-shrink: 0;
		margin-bottom: 16px;
	}

	.service-item {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 16px;
		background: none;
		border: none;
		cursor: pointer;
		width: 100%;
		text-align: left;
	}

	.service-icon {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.service-icon img {
		width: 36px;
		height: 36px;
		object-fit: contain;
	}

	.service-icon-orange {
		background: #fef3e2;
	}

	.service-icon-green {
		background: #e6f4ea;
	}

	.service-text {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.service-name {
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 15px;
		color: #212121;
		line-height: 20px;
	}

	.service-desc {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 13px;
		color: #757575;
		line-height: 18px;
	}

	.divider {
		height: 1px;
		background: #f0f0f0;
		margin: 0 16px;
	}

	/* Tab bar */
	.tabbar {
		display: flex;
		align-items: flex-start;
		background: #ffffff;
		border-top: 1px solid rgba(0, 0, 0, 0.06);
		padding: 8px 0 24px;
		flex-shrink: 0;
	}

	.tab {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px 0;
	}

	.tab span {
		font-family: 'Roboto', sans-serif;
		font-size: 10px;
		font-weight: 400;
		color: #9e9e9e;
	}

	.tab-active span {
		color: #009b3a;
		font-weight: 500;
	}
</style>

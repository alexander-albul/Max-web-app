<script lang="ts">
	import { goto } from '$app/navigation';
	import { ChevronLeft, MoreHorizontal, Paperclip, Smile, Mic, LayoutGrid } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Карта жителя РТ</title>
</svelte:head>

<div class="messenger">
	<!-- Header -->
	<div class="header">
		<button class="back-btn" aria-label="Назад">
			<ChevronLeft size={24} color="#007aff" />
		</button>

		<div class="chat-info">
			<div class="avatar">
				<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="18" cy="18" r="18" fill="#e8e8e8"/>
					<text x="18" y="23" text-anchor="middle" font-size="16" fill="#888">Р</text>
				</svg>
			</div>
			<div class="chat-meta">
				<span class="chat-name">Карта жителя РТ (Тест)</span>
				<span class="chat-sub">Бот</span>
			</div>
		</div>

		<button class="more-btn" aria-label="Ещё">
			<MoreHorizontal size={22} color="#007aff" />
		</button>
	</div>

	<!-- Chat area -->
	<div class="chat-area">
		<div class="date-badge">Сегодня</div>
		<div class="system-msg">Вы начали общение с ботом</div>
	</div>

	<!-- Bottom bar -->
	<div class="bottom-bar">
		<button class="open-btn" onclick={() => goto('/card')}>
			<LayoutGrid size={18} color="white" />
			<span>Открыть</span>
		</button>

		<button class="attach-btn" aria-label="Прикрепить">
			<Paperclip size={20} color="#8e8e93" />
		</button>

		<div class="input-wrap">
			<input class="msg-input" type="text" placeholder="Сообщение" readonly />
		</div>

		<button class="emoji-btn" aria-label="Эмодзи">
			<Smile size={20} color="#8e8e93" />
		</button>

		<button class="mic-btn" aria-label="Голос">
			<Mic size={20} color="#8e8e93" />
		</button>
	</div>
</div>

<style>
	.messenger {
		display: flex;
		flex-direction: column;
		width: 375px;
		height: 812px;
		background: #b8d9f0;
		background-image:
			linear-gradient(160deg, #a8d4ee 0%, #c5e4f5 50%, #b0d8f0 100%);
		overflow: hidden;
		position: relative;
		border-radius: 24px;
	}

	.messenger::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image: url('/pattern_space.svg');
		background-size: 500px;
		background-repeat: repeat;
		opacity: 0.35;
		pointer-events: none;
		z-index: 0;
	}

	.header {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 12px 10px;
		background: rgba(255,255,255,0.55);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid rgba(255,255,255,0.4);
	}

	.back-btn,
	.more-btn {
		background: none;
		border: none;
		padding: 4px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.chat-info {
		display: flex;
		align-items: center;
		gap: 10px;
		flex: 1;
	}

	.avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		overflow: hidden;
		flex-shrink: 0;
	}

	.chat-meta {
		display: flex;
		flex-direction: column;
	}

	.chat-name {
		font-family: 'Roboto', sans-serif;
		font-weight: 600;
		font-size: 15px;
		line-height: 20px;
		color: #1c1c1e;
	}

	.chat-sub {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		color: #6e6d6d;
	}

	.chat-area {
		position: relative;
		z-index: 1;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		padding: 16px;
		gap: 8px;
	}

	.date-badge {
		background: rgba(100, 130, 180, 0.55);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		color: white;
		font-family: 'Roboto', sans-serif;
		font-size: 13px;
		font-weight: 500;
		padding: 4px 12px;
		border-radius: 12px;
	}

	.system-msg {
		background: rgba(100, 130, 180, 0.55);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		color: white;
		font-family: 'Roboto', sans-serif;
		font-size: 13px;
		font-weight: 400;
		padding: 6px 14px;
		border-radius: 12px;
	}

	.bottom-bar {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 12px 20px;
		background: rgba(255,255,255,0.7);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-top: 1px solid rgba(255,255,255,0.5);
	}

	.open-btn {
		display: flex;
		align-items: center;
		gap: 6px;
		background: #007aff;
		color: white;
		border: none;
		border-radius: 20px;
		padding: 8px 14px;
		font-family: 'Roboto', sans-serif;
		font-weight: 500;
		font-size: 15px;
		cursor: pointer;
		flex-shrink: 0;
		transition: opacity 0.15s;
	}

	.open-btn:hover {
		opacity: 0.9;
	}

	.open-btn:active {
		opacity: 0.75;
	}

	.attach-btn,
	.emoji-btn,
	.mic-btn {
		background: none;
		border: none;
		padding: 4px;
		cursor: default;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.input-wrap {
		flex: 1;
		background: rgba(255,255,255,0.8);
		border-radius: 20px;
		padding: 0 12px;
		height: 36px;
		display: flex;
		align-items: center;
		border: 1px solid rgba(0,0,0,0.08);
	}

	.msg-input {
		width: 100%;
		background: none;
		border: none;
		outline: none;
		font-family: 'Roboto', sans-serif;
		font-size: 15px;
		color: #8e8e93;
		cursor: default;
	}
</style>

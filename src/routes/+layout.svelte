<script>
	import { onMount } from 'svelte';
	import { Sun, Moon } from 'lucide-svelte';
	import '../app.css';

	let darkMode = false;
	let headerOpacity = 1;

	onMount(() => {
		// 从 localStorage 读取主题设置
		const saved = localStorage.getItem('darkMode');
		if (saved !== null) {
			darkMode = saved === 'true';
		} else {
			// 默认跟随系统设置
			darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		applyTheme();

		// 监听滚动事件，改变 header 透明度
		const handleScroll = () => {
			const scrollY = window.scrollY;
			// 滚动 0-200px 时，从完全不透明渐变到完全透明
			const newOpacity = Math.max(0, 1 - scrollY / 200);
			headerOpacity = newOpacity;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function toggleTheme() {
		darkMode = !darkMode;
		localStorage.setItem('darkMode', darkMode);
		applyTheme();
	}

	function applyTheme() {
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
</script>

<div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
	<!-- 固定在顶部的 header -->
	<header 
		class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
		style="background-color: rgba({darkMode ? '17, 24, 39' : '255, 255, 255'}, {headerOpacity}); backdrop-filter: blur(8px);"
	>
		<div class="max-w-4xl mx-auto px-4 py-6 md:px-8 lg:px-12">
			<div class="flex justify-between items-start">
				<div>
					<h1 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Markdown 静态站</h1>
					<p class="text-gray-600 dark:text-gray-400 mt-2">极简风格 · 响应式设计</p>
				</div>
				<button
					on:click={toggleTheme}
					class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
					aria-label="切换主题"
				>
					{#if darkMode}
						<Sun class="w-6 h-6 text-gray-300" />
					{:else}
						<Moon class="w-6 h-6 text-gray-600" />
					{/if}
				</button>
			</div>
		</div>
	</header>

	<!-- 主内容区，添加顶部 padding 避免被 header 遮挡 -->
	<div class="max-w-4xl mx-auto pt-32">
		<main>
			<slot />
		</main>

		<footer class="border-t border-gray-200 dark:border-gray-700 px-4 py-6 md:px-8 lg:px-12 text-center text-gray-600 dark:text-gray-400 text-sm">
			<p>Built with Svelte, Tailwind CSS</p>
		</footer>
	</div>
</div>
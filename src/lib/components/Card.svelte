<!--
	Card 组件 - 带有圆角细边框的卡片组件
	
	特性：
	- 圆角边框，支持暗色主题
	- 可配置的标题栏和底栏
	- 宽度适配内容（默认 w-fit）
	- 悬停阴影效果
	
	属性：
	@prop {string} title - 标题文本（可选）
	@prop {string} footer - 底栏文本（可选）
	@prop {string} borderColor - 边框颜色类（默认: 'border-gray-200 dark:border-gray-700'）
	@prop {string} titleBg - 标题栏背景色类（默认: 'bg-gray-50 dark:bg-gray-800'）
	@prop {string} footerBg - 底栏背景色类（默认: 'bg-gray-50 dark:bg-gray-800'）
	@prop {string} rounded - 圆角大小类（默认: 'rounded-lg'）
	
	插槽：
	- default: 卡片主要内容
	- title: 自定义标题栏内容（替代 title 属性）
	- footer: 自定义底栏内容（替代 footer 属性）
	
	使用示例：
	
	基础使用：
	<Card title="标题" footer="底栏文本">
		<p>这是卡片内容</p>
	</Card>
	
	自定义插槽：
	<Card>
		<svelte:fragment slot="title">
			<h2>自定义标题</h2>
		</svelte:fragment>
		
		<p>卡片主体内容</p>
		
		<svelte:fragment slot="footer">
			<button>操作按钮</button>
		</svelte:fragment>
	</Card>
	
	自定义样式：
	<Card 
		title="自定义样式" 
		borderColor="border-blue-300 dark:border-blue-700"
		titleBg="bg-blue-50 dark:bg-blue-900"
		rounded="rounded-xl">
		内容
	</Card>
	
	撑满宽度：
	<Card title="全宽卡片" class="w-full">
		内容
	</Card>
-->

<script>
	export let title = '';
	export let footer = '';
	export let borderColor = 'border-gray-200 dark:border-gray-700';
	export let titleBg = 'bg-gray-50 dark:bg-gray-800';
	export let footerBg = 'bg-gray-50 dark:bg-gray-800';
	export let rounded = 'rounded-lg';
</script>

<div class="card {rounded} border {borderColor} overflow-hidden bg-white dark:bg-gray-900 shadow-sm w-fit">
	{#if title || $$slots.title}
		<div class="title-bar px-4 py-3 {titleBg} border-b {borderColor}">
			<slot name="title">
				<h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
			</slot>
		</div>
	{/if}

	<div class="card-content p-4 text-gray-900 dark:text-gray-100">
		<slot />
	</div>

	{#if footer || $$slots.footer}
		<div class="footer-bar px-4 py-3 {footerBg} border-t {borderColor}">
			<slot name="footer">
				<p class="text-sm text-gray-600 dark:text-gray-400">{footer}</p>
			</slot>
		</div>
	{/if}
</div>

<style>
	.card {
		transition: box-shadow 0.2s ease-in-out;
	}

	.card:hover {
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}
</style>

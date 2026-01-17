<!--
	Button 组件 - 圆角按钮组件
	
	特性：
	- 圆角设计，支持暗色主题
	- 鼠标悬停和点击动态效果
	- 支持图标和文字组合
	- 多种变体样式（primary, secondary, outline, ghost）
	- 支持禁用状态
	
	属性：
	@prop {string} variant - 按钮变体（默认: 'primary'）可选: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
	@prop {string} size - 按钮大小（默认: 'md'）可选: 'sm' | 'md' | 'lg'
	@prop {boolean} disabled - 是否禁用（默认: false）
	@prop {string} type - 按钮类型（默认: 'button'）
	@prop {string} rounded - 圆角大小（默认: 'rounded-lg'）
	
	插槽：
	- icon: 图标插槽（可选）
	- default: 按钮文字内容
	
	使用示例：
	
	基础使用：
	<Button>点击我</Button>
	
	带图标：
	<Button>
		<svelte:fragment slot="icon">
			<svg>...</svg>
		</svelte:fragment>
		保存
	</Button>
	
	不同变体：
	<Button variant="primary">主要按钮</Button>
	<Button variant="secondary">次要按钮</Button>
	<Button variant="outline">轮廓按钮</Button>
	<Button variant="ghost">幽灵按钮</Button>
	<Button variant="danger">危险按钮</Button>
	
	不同大小：
	<Button size="sm">小按钮</Button>
	<Button size="md">中等按钮</Button>
	<Button size="lg">大按钮</Button>
	
	禁用状态：
	<Button disabled>禁用按钮</Button>
-->

<script>
	export let variant = 'primary';
	export let size = 'md';
	export let disabled = false;
	export let type = 'button';
	export let rounded = 'rounded-lg';

	const variants = {
		primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700',
		secondary: 'bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white dark:bg-gray-500 dark:hover:bg-gray-600 dark:active:bg-gray-700',
		outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 dark:active:bg-blue-900',
		ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700',
		danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700'
	};

	const sizes = {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg'
	};

	$: variantClass = variants[variant] || variants.primary;
	$: sizeClass = sizes[size] || sizes.md;
</script>

<button
	{type}
	{disabled}
	class="btn {rounded} {variantClass} {sizeClass} font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none inline-flex items-center justify-center gap-2 {$$props.class || ''}"
	on:click
	on:mouseenter
	on:mouseleave
	on:focus
	on:blur
>
	{#if $$slots.icon}
		<span class="icon-wrapper">
			<slot name="icon" />
		</span>
	{/if}
	<slot />
</button>

<style>
	.btn {
		cursor: pointer;
		user-select: none;
	}

	.btn:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	.btn:active:not(:disabled) {
		transform: translateY(0);
	}

	.icon-wrapper {
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
</style>

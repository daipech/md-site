<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';

	let markdown = '';
	let loading = true;
	let error = null;

	$: md_name = $page.params.md_name;

	onMount(async () => {
		await loadMarkdown();
	});

	async function loadMarkdown() {
		loading = true;
		error = null;
		
		try {
			const response = await fetch(`/content/${md_name}.md`);
			
			if (!response.ok) {
				throw new Error(`未找到文件: ${md_name}.md`);
			}
			
			markdown = await response.text();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	// 监听路由参数变化，重新加载内容
	$: if (md_name) {
		loadMarkdown();
	}
</script>

<svelte:head>
	<title>{md_name} - Markdown 静态站</title>
	<meta name="description" content={md_name} />
</svelte:head>

{#if loading}
	<div class="px-4 py-8 md:px-8 lg:px-12 text-center text-gray-500 dark:text-gray-400">
		加载中...
	</div>
{:else if error}
	<div class="px-4 py-8 md:px-8 lg:px-12 text-center text-red-600 dark:text-red-400">
		{error}
	</div>
{:else}
	<MarkdownRenderer {markdown} />
{/if}

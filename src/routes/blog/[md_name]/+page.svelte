<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
	import { getPageTitle } from '$lib/config.js';

	let markdown = '';
	let loading = true;
	let error = null;
	let pageTitle = '';

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
			
			// 从markdown中提取第一个h1标题
			const h1Match = markdown.match(/^#\s+(.+)$/m);
			pageTitle = h1Match ? h1Match[1] : md_name;
		} catch (err) {
			error = err.message;
			pageTitle = md_name;
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
	<title>{getPageTitle(pageTitle)}</title>
	<meta name="description" content={pageTitle} />
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

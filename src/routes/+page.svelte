<script>
	import { onMount } from 'svelte';
	import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
	import Card from '$lib/components/Card.svelte';
	import Button from '../lib/components/Button.svelte';
	
	let markdown = '';
	let loading = true;

	onMount(async () => {
		try {
			const response = await fetch('/content/index.md');
			markdown = await response.text();
		} catch (error) {
			console.error('加载 index.md 失败:', error);
			markdown = '# 加载失败\n\n无法加载主页内容。';
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Markdown 静态站</title>
	<meta name="description" content="极简风格的 Markdown 静态站点" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<Card title="标题">
  <p>这是卡片内容</p>
  <div id="ww_88b23114a2566" v="1.3" loc="id" a={`{"t":"horizontal","lang":"zh","sl_lpl":1,"ids":[],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"image","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}`}><a href="https://weatherwidget.org/" id="ww_88b23114a2566_u" target="_blank">Free weather widget</a></div><script async src="https://app3.weatherwidget.org/js/?id=ww_88b23114a2566"></script>
  <svelte:fragment slot="footer">
    <Button variant="outline">操作按钮</Button>
  </svelte:fragment>
</Card>

{#if loading}
	<div class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
		加载中...
	</div>
{:else}
	<MarkdownRenderer {markdown} />
{/if}
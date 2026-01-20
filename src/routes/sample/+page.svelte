<script>
	import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
	import sampleContent from '$lib/content/sample.md?raw';
</script>

<svelte:head>
	<title>Sample - Markdown 静态站</title>
	<meta name="description" content="Sample Markdown 示例页面" />
</svelte:head>

<div class="px-4 py-8 md:px-8 lg:px-12 max-w-4xl mx-auto">
	<MarkdownRenderer markdown={sampleContent} />
</div>

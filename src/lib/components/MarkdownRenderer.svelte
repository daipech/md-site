<script>
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import { markedHighlight } from 'marked-highlight';
	import hljs from 'highlight.js';
	import mermaid from 'mermaid';
	import admonition from 'marked-admonition-extension';
	import 'marked-admonition-extension/dist/index.css';

	export let markdown = '';

	let content = '';
	let container;
	let currentTheme = 'default';

	// Configure marked with highlight.js and admonition extension
	marked.use(
		markedHighlight({
			langPrefix: 'hljs language-',
			highlight(code, lang) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				return hljs.highlight(code, { language }).value;
			}
		})
	);
	
	// Add admonition extension support (pass the object directly, not as a function call)
	marked.use(admonition);

	function initMermaid() {
		const isDark = document.documentElement.classList.contains('dark');
		const theme = isDark ? 'dark' : 'default';
		
		if (theme !== currentTheme) {
			currentTheme = theme;
			mermaid.initialize({
				startOnLoad: false,
				theme: theme,
				themeVariables: isDark ? {
					darkMode: true,
					background: '#111827',
					primaryColor: '#374151',
					primaryTextColor: '#e5e7eb',
					primaryBorderColor: '#4b5563',
					lineColor: '#9ca3af',
					secondaryColor: '#1f2937',
					tertiaryColor: '#111827'
				} : {
					darkMode: false,
					background: '#ffffff',
					primaryColor: '#f3f4f6',
					primaryTextColor: '#1f2937',
					primaryBorderColor: '#d1d5db',
					lineColor: '#6b7280',
					secondaryColor: '#e5e7eb',
					tertiaryColor: '#f9fafb'
				}
			});
		}
	}

	// Configure mermaid
	onMount(() => {
		initMermaid();
		renderMarkdown();
		
		// 监听主题变化
		const observer = new MutationObserver(() => {
			initMermaid();
			renderMarkdown();
		});
		
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class']
		});
		
		return () => observer.disconnect();
	});

	async function renderMarkdown() {
		// First, render markdown to HTML
		content = marked(markdown);

		// Wait for DOM update
		await new Promise((resolve) => setTimeout(resolve, 0));

		// Then render mermaid diagrams
		if (container) {
			const mermaidBlocks = container.querySelectorAll('code.language-mermaid');
			
			for (let i = 0; i < mermaidBlocks.length; i++) {
				const block = mermaidBlocks[i];
				const code = block.textContent;
				const pre = block.parentElement;

				try {
					const id = `mermaid-${Date.now()}-${i}`;
					const { svg } = await mermaid.render(id, code);
					
					const div = document.createElement('div');
					div.className = 'mermaid-diagram flex justify-center my-6';
					div.innerHTML = svg;
					
					// 清理 SVG 中的 pattern 元素（斜线图案）
					const svgElement = div.querySelector('svg');
					if (svgElement) {
						const patterns = svgElement.querySelectorAll('pattern');
						patterns.forEach(p => p.remove());
						
						const elementsWithPattern = svgElement.querySelectorAll('[fill^="url(#"]');
						elementsWithPattern.forEach(el => {
							el.setAttribute('fill', 'none');
						});
					}
					
					pre.replaceWith(div);
				} catch (error) {
					console.error('Mermaid rendering error:', error);
				}
			}
		}
	}

	$: if (markdown) {
		renderMarkdown();
	}
</script>

<article
	bind:this={container}
	class="prose prose-slate dark:prose-invert max-w-none px-4 py-8 md:px-8 lg:px-12"
>
	{@html content}
</article>

<style>
	:global(.prose) {
		@apply text-gray-800 dark:text-gray-200;
	}

	:global(.prose h1) {
		@apply text-3xl md:text-4xl font-bold mb-6 mt-8 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2;
	}

	:global(.prose h2) {
		@apply text-2xl md:text-3xl font-bold mb-4 mt-6 text-gray-900 dark:text-gray-100;
	}

	:global(.prose h3) {
		@apply text-xl md:text-2xl font-semibold mb-3 mt-5 text-gray-900 dark:text-gray-100;
	}

	:global(.prose h4) {
		@apply text-lg md:text-xl font-semibold mb-2 mt-4 text-gray-900 dark:text-gray-100;
	}

	:global(.prose p) {
		@apply mb-4 leading-7 text-gray-700 dark:text-gray-300;
	}

	:global(.prose ul),
	:global(.prose ol) {
		@apply mb-4 pl-6 space-y-2;
	}

	:global(.prose li) {
		@apply text-gray-700 dark:text-gray-300;
	}

	:global(.prose ul > li) {
		@apply list-disc;
	}

	:global(.prose ol > li) {
		@apply list-decimal;
	}

	:global(.prose blockquote) {
		@apply border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4 text-gray-600 dark:text-gray-400;
	}

	:global(.prose table) {
		@apply w-full border-collapse my-6;
	}

	:global(.prose th) {
		@apply border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-800 font-semibold text-left;
	}

	:global(.prose td) {
		@apply border border-gray-300 dark:border-gray-600 px-4 py-2;
	}

	:global(.prose img) {
		@apply max-w-full h-auto rounded-lg my-6;
	}

	:global(.prose hr) {
		@apply my-8 border-gray-200 dark:border-gray-700;
	}

	:global(.prose a) {
		@apply text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300;
	}

	:global(.prose code) {
		@apply bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded text-sm;
	}

	:global(.prose pre) {
		@apply bg-gray-50 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto my-4;
	}

	:global(.prose pre code) {
		@apply bg-transparent text-gray-800 dark:text-gray-100 p-0;
	}

	:global(.mermaid-diagram) {
		@apply overflow-x-auto bg-white dark:bg-gray-900 rounded-lg p-4 my-6;
		overflow: hidden;
		contain: paint;
		isolation: isolate;
		position: relative;
	}

	:global(.mermaid-diagram svg) {
		@apply max-w-full h-auto;
		display: block;
		overflow: hidden;
	}

	/* Dark theme support for admonitions */
	:global(.dark .admonition) {
		box-shadow: 0 0 0.4rem 0 rgba(255, 255, 255, 0.1);
	}

	:global(.dark .admonition-note) {
		--color: rgba(255, 255, 255, 0.87);
		--bg-color: #1e293b;
		--shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3), 0 0 0 0.05rem rgba(255, 255, 255, 0.1);
	}

	:global(.dark .admonition-abstract) {
		--color: rgba(255, 255, 255, 0.87);
		--bg-color: #1e293b;
		--shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3), 0 0 0 0.05rem rgba(255, 255, 255, 0.1);
	}

	:global(.dark .admonition-info) {
		--color: rgba(255, 255, 255, 0.87);
		--bg-color: #1e293b;
		--shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3), 0 0 0 0.05rem rgba(255, 255, 255, 0.1);
	}

	:global(.dark .admonition-tip) {
		--color: rgba(255, 255, 255, 0.87);
		--bg-color: #1e293b;
		--shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3), 0 0 0 0.05rem rgba(255, 255, 255, 0.1);
	}

	:global(.dark .admonition-success) {
		--color: rgba(255, 255, 255, 0.87);
		--bg-color: #1e293b;
		--shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3), 0 0 0 0.05rem rgba(255, 255, 255, 0.1);
	}

	:global(.dark .admonition-question) {
		--color: rgba(255, 255, 255, 0.87);
		--bg-color: #1e293b;
		--shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3), 0 0 0 0.05rem rgba(255, 255, 255, 0.1);
	}

	:global(.dark .admonition-warning) {
		--color: rgba(255, 255, 255, 0.87);
		--bg-color: #1e293b;
		--shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3), 0 0 0 0.05rem rgba(255, 255, 255, 0.1);
	}

	:global(.dark .admonition-failure) {
		--color: rgba(255, 255, 255, 0.87);
		--bg-color: #1e293b;
		--shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3), 0 0 0 0.05rem rgba(255, 255, 255, 0.1);
	}

	:global(.dark .admonition-danger) {
		--color: rgba(255, 255, 255, 0.87);
		--bg-color: #1e293b;
		--shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3), 0 0 0 0.05rem rgba(255, 255, 255, 0.1);
	}

	:global(.dark .admonition-bug) {
		--color: rgba(255, 255, 255, 0.87);
		--bg-color: #1e293b;
		--shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3), 0 0 0 0.05rem rgba(255, 255, 255, 0.1);
	}

	:global(.dark .admonition-example) {
		--color: rgba(255, 255, 255, 0.87);
		--bg-color: #1e293b;
		--shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3), 0 0 0 0.05rem rgba(255, 255, 255, 0.1);
	}

	:global(.dark .admonition-quote) {
		--color: rgba(255, 255, 255, 0.87);
		--bg-color: #1e293b;
		--shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3), 0 0 0 0.05rem rgba(255, 255, 255, 0.1);
	}

	:global(.dark .admonition-hint) {
		--color: rgba(255, 255, 255, 0.87);
		--bg-color: #1e293b;
		--shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3), 0 0 0 0.05rem rgba(255, 255, 255, 0.1);
	}

	:global(.dark .admonition-caution) {
		--color: rgba(255, 255, 255, 0.87);
		--bg-color: #1e293b;
		--shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3), 0 0 0 0.05rem rgba(255, 255, 255, 0.1);
	}

	:global(.dark .admonition-error) {
		--color: rgba(255, 255, 255, 0.87);
		--bg-color: #1e293b;
		--shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3), 0 0 0 0.05rem rgba(255, 255, 255, 0.1);
	}

	:global(.dark .admonition-attention) {
		--color: rgba(255, 255, 255, 0.87);
		--bg-color: #1e293b;
		--shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.3), 0 0 0 0.05rem rgba(255, 255, 255, 0.1);
	}
</style>
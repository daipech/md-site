// 站点配置
export const siteConfig = {
	// 站点名称
	name: 'Markdown 静态站',
	
	// 站点描述
	description: '极简风格的 Markdown 静态站点',
	
	// 站点标题分隔符
	titleSeparator: ' - '
};

// 生成页面标题
export function getPageTitle(pageTitle) {
	if (!pageTitle) return siteConfig.name;
	return `${pageTitle}${siteConfig.titleSeparator}${siteConfig.name}`;
}

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 网站基础URL
const baseUrl = 'https://bairdweng.github.io/rc-match-ai';

// 读取hotParts.json数据
const hotPartsData = JSON.parse(fs.readFileSync(
  path.join(__dirname, '../src/data/hotParts.json'), 
  'utf8'
));

// 生成语义化URL slug的函数
const generateArticleSlug = (article) => {
  const brand = article.modelInfo?.brand || 'unknown';
  const model = article.modelInfo?.model || 'unknown';
  const part = article.part || 'unknown';
  
  const formatForUrl = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '');
  };
  
  return `${article.id}-${formatForUrl(brand)}-${formatForUrl(model)}-${formatForUrl(part)}`;
};

// 定义网站的主要页面
const pages = [
  {
    url: '/',
    changefreq: 'daily',
    priority: '1.0',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/search',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// 添加文章页面到sitemap
const articles = hotPartsData.upgradeRecords
  .filter(record => record.type === 'article')
  .map(article => ({
    url: `/articles/${generateArticleSlug(article)}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: new Date(article.timestamp).toISOString().split('T')[0]
  }));

// 合并所有页面
const allPages = [...pages, ...articles];

// 生成sitemap XML内容
const generateSitemap = () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  allPages.forEach(page => {
    xml += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  xml += '</urlset>';
  return xml;
};

// 写入sitemap.xml文件
const sitemapContent = generateSitemap();
const publicDir = path.join(__dirname, '../public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
console.log('Sitemap generated successfully!');
console.log(`Sitemap location: ${path.join(publicDir, 'sitemap.xml')}`);
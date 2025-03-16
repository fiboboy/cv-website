/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://dziubenko.ru',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://dziubenko.ru/sitemap.xml',
    ],
  },
  exclude: ['/api/*', '/404', '/500'],
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
} 
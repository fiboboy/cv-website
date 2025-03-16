/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mikhail.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://mikhail.vercel.app/sitemap.xml',
    ],
  },
  exclude: ['/api/*', '/404', '/500'],
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
} 
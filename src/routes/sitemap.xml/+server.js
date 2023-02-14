// here we can dynamic import routes to get page list?
//should note we only want to include public routes so maybe nest (public)?
// const modules = import.meta.glob('../../routes/**')
// console.log(modules)

export async function GET({ url }) {
	let urlPaths = `
  <url>
    <loc>${url.origin}</loc>
    <lastmod>${new Date()}</lastmod>
  </url>
  <url>
    <loc>${url.origin}/login</loc>
    <lastmod>${new Date()}</lastmod>
  </url>
  `

	return new Response(
		`
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      ${urlPaths}
    </urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml',
			},
		}
	)
}

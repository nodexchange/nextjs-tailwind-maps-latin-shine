import fs from 'fs';
import path from 'path';

function generateSiteMap(articles) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://www.latinshine.co.uk</loc>
       <changefreq>monthly</changefreq>
      <priority>1.0</priority>
     </url>
     <url>
       <loc>https://www.latinshine.co.uk/latest-news</loc>
     </url>
     <url>
       <loc>https://www.latinshine.co.uk/classes</loc>
     </url>
     <url>
       <loc>https://www.latinshine.co.uk/location</loc>
     </url>
     <url>
       <loc>https://www.latinshine.co.uk/about-bachata</loc>
     </url>
     <url>
       <loc>https://www.latinshine.co.uk/about-salsa</loc>
     </url>
     <url>
       <loc>https://www.latinshine.co.uk/why-dance</loc>
     </url>
     <url>
       <loc>https://www.latinshine.co.uk/instructors</loc>
     </url>
     <url>
       <loc>https://www.latinshine.co.uk/reserve</loc>
     </url>
     <url>
       <loc>https://www.latinshine.co.uk/payments</loc>
     </url>
     <url>
       <loc>https://www.latinshine.co.uk/privacy</loc>
     </url>
     <url>
       <loc>https://www.latinshine.co.uk/terms</loc>
     </url>
     ${articles
       .map(({ href }) => {
         return `
       <url>
           <loc>${`https://www.latinshine.co.uk/news/${href}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const filePath = path.join(process.cwd(), 'public', 'data', 'articles.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(data.articles);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;

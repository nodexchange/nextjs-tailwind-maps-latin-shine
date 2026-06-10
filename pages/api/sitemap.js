import { SitemapStream, streamToPromise } from 'sitemap';

export default async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
      cacheTime: 600000,
    });

    // // List of posts
    // const posts = [];

    // // Create each URL row
    // posts.forEach(post => {
    //   smStream.write({
    //     url: `/post/${post.slug}`,
    //     changefreq: 'daily',
    //     priority: 0.9
    //   });
    // });

    smStream.write({
      url: `/`,
      changefreq: 'monthly',
      priority: 1
    });
    smStream.write({
      url: `/location`,
      changefreq: 'yearly',
      priority: 0.3
    });
    smStream.write({
      url: `/reserve`,
      changefreq: 'yearly',
      priority: 0.3
    });
    smStream.write({
      url: `/dataprotection`,
      changefreq: 'yearly',
      priority: 0.3
    });
    smStream.write({
      url: `/privacy`,
      changefreq: 'yearly',
      priority: 0.3
    });
    smStream.write({
      url: `/terms`,
      changefreq: 'yearly',
      priority: 0.3
    });

    // End sitemap stream
    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      'Content-Type': 'application/xml',
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch (e) {
    res.send(JSON.stringify(e));
  }
};

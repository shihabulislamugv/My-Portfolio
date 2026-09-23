const fs = require('fs');
const path = require('path');

const urls = [
  'https://www.behance.net/gallery/252952097/LoveKonnection-Dating-App-UXUI-Case-Study',
  'https://www.behance.net/gallery/239553571/This-is-Mauritius-Travel-App-UXUI-Case-Study',
  'https://www.behance.net/gallery/235791995/Memorial-Moments-Magazine-A-Story-Telling-App'
];

async function run() {
  for (const url of urls) {
    console.log('Fetching with fetch():', url);
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9',
        }
      });
      console.log('Status:', res.status, res.url);
      const html = await res.text();
      
      const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
      const ogTitleMatch = html.match(/<meta property="og:title" content="([^"]+)"/i);
      const ogDescMatch = html.match(/<meta property="og:description" content="([^"]+)"/i) || html.match(/<meta name="description" content="([^"]+)"/i);
      const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
      
      const imgMatches = html.match(/https:\/\/mir-s3-cdn-cf\.behance\.net\/project_modules\/[^\s"'<>]+\.(?:jpg|png|webp)/g) || [];
      const primaryMatches = html.match(/https:\/\/mir-s3-cdn-cf\.behance\.net\/projects\/[^\s"'<>]+\.(?:jpg|png|webp)/g) || [];
      
      console.log('Result:');
      console.log('Title:', ogTitleMatch ? ogTitleMatch[1] : (titleMatch ? titleMatch[1] : 'N/A'));
      console.log('Desc:', ogDescMatch ? ogDescMatch[1] : 'N/A');
      console.log('OG Image:', ogImageMatch ? ogImageMatch[1] : 'N/A');
      console.log('Modules Images:', [...new Set(imgMatches)].slice(0, 3));
      console.log('Primary Images:', [...new Set(primaryMatches)].slice(0, 3));
      console.log('----------------------------------------');
    } catch (err) {
      console.error('Error fetching', url, err.message);
    }
  }
}

run();

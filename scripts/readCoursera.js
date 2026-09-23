const fs = require('fs');

async function run() {
  try {
    const res = await fetch('https://www.coursera.org/account/accomplishments/verify/J4W0KI4VK2S6', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    
    const title = html.match(/<title>([^<]+)<\/title>/i);
    const ogTitle = html.match(/<meta property="og:title" content="([^"]+)"/i);
    const ogDesc = html.match(/<meta property="og:description" content="([^"]+)"/i);
    const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/i);
    
    console.log('Title:', title ? title[1] : 'N/A');
    console.log('OG Title:', ogTitle ? ogTitle[1] : 'N/A');
    console.log('OG Desc:', ogDesc ? ogDesc[1] : 'N/A');
    console.log('OG Image:', ogImage ? ogImage[1] : 'N/A');
    
    // Also look for course name or certificate text in the body
    const matches = html.match(/"courseName":"([^"]+)"/);
    if (matches) console.log('CourseName:', matches[1]);
    
    const certMatch = html.match(/"productName":"([^"]+)"/);
    if (certMatch) console.log('ProductName:', certMatch[1]);
  } catch (err) {
    console.error(err);
  }
}

run();

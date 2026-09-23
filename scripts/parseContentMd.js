const fs = require('fs');

const html = fs.readFileSync('C:/Users/Shihabul Islam/.gemini/antigravity/brain/bc36a8ae-1ee2-4364-8b95-bdafc65e1d68/.system_generated/steps/807/content.md', 'utf8');

console.log('HTML Length:', html.length);

// Search for any course, certificate, product, or name strings
const regexList = [
  /courseName["']?\s*:\s*["']([^"']+)["']/i,
  /productName["']?\s*:\s*["']([^"']+)["']/i,
  /certificate["']?\s*:\s*["']([^"']+)["']/i,
  /<h1[^>]*>([^<]+)<\/h1>/i,
  /<h2[^>]*>([^<]+)<\/h2>/i,
  /Shihabul/i,
  /accomplishment/i,
  /"name"\s*:\s*"([^"]+)"/g
];

for (const r of regexList) {
  const m = html.match(r);
  console.log(r, m ? m.slice(0, 3) : 'No match');
}

// Find all JSON script tags
const jsonMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi);
if (jsonMatches) {
  jsonMatches.forEach((jm, i) => {
    console.log(`JSON-LD ${i}:`, jm.slice(0, 200));
  });
}

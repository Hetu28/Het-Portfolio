const fs = require('fs');

const html = fs.readFileSync('public/screenshots/live_app_full_body.html', 'utf8');
const elements = JSON.parse(fs.readFileSync('public/screenshots/live_app_elements.json', 'utf8'));

console.log('Total elements extracted:', elements.length);

// Find headings
const headings = elements.filter(e => ['H1', 'H2', 'H3', 'H4', 'H5'].includes(e.tag));
console.log('\n--- HEADINGS ---');
headings.forEach(h => {
  console.log(`${h.tag}: "${h.text.replace(/\n/g, ' ')}" [fontSize: ${h.fontSize}, fontWeight: ${h.fontWeight}]`);
});

// Find containers and sections
console.log('\n--- KEY CONTAINERS ---');
const containers = elements.filter(e => e.className && (e.className.includes('container') || e.className.includes('max-w-') || e.tag === 'SECTION'));
containers.forEach(c => {
  console.log(`${c.tag} .${c.className.split(' ').slice(0, 3).join('.')} [maxWidth: ${c.maxWidth}, width: ${c.width}, padding: ${c.padding}]`);
});

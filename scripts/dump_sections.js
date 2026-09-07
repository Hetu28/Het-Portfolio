const fs = require('fs');
const html = fs.readFileSync('public/screenshots/live_app_full_body.html', 'utf8');

// Let's print out all section HTML blocks
const sections = html.split('<section');
console.log('Found', sections.length - 1, 'sections');

sections.slice(1).forEach((sec, idx) => {
  console.log(`\n================== SECTION ${idx + 1} ==================`);
  console.log('<section' + sec.slice(0, 1200));
});

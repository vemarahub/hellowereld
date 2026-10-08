import fs from 'fs';
import path from 'path';
import { parseString } from 'xml2js';
import TurndownService from 'turndown';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

const xmlPath = './Blogger/Blogs/Techrepo/feed.atom';
const outputDir = './src/content/writing';

/**
 * Strip all Markdown formatting and produce a plain-text excerpt
 * safe to embed in YAML frontmatter using single-quoted strings.
 * Single-quoted YAML only needs single quotes to be escaped (as '').
 */
function plainExcerpt(markdown, maxLength = 160) {
  return markdown
    .replace(/!\[.*?\]\(.*?\)/g, '')      // remove images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → link text
    .replace(/`{1,3}[^`]*`{1,3}/g, '')    // remove inline/block code
    .replace(/[*_~`#>|\\]/g, '')           // strip markdown symbols
    .replace(/\s+/g, ' ')                  // collapse whitespace
    .trim()
    .substring(0, maxLength)
    .replace(/\s\S*$/, '')                 // don't cut mid-word
    .replace(/'/g, "''")                   // escape single quotes for YAML
    .trim();
}

/**
 * Escape a title for YAML single-quoted string.
 */
function yamlTitle(title) {
  return title.replace(/'/g, "''");
}

/**
 * Normalize tags: lowercase, trim, replace spaces with hyphens.
 */
function normalizeTag(tag) {
  return tag.trim().toLowerCase().replace(/\s+/g, '-').replace(/'/g, "''");
}

fs.readFile(xmlPath, 'utf8', (err, data) => {
  if (err) { console.error('Error reading XML:', err); return; }

  parseString(data, { explicitArray: false }, (err, result) => {
    if (err) { console.error('Error parsing XML:', err); return; }

    const entries = Array.isArray(result.feed.entry)
      ? result.feed.entry
      : [result.feed.entry];

    let converted = 0;
    let skipped = 0;

    entries.forEach(entry => {
      if (entry['blogger:type'] !== 'POST' || entry['blogger:status'] !== 'LIVE') {
        skipped++;
        return;
      }

      const title = (typeof entry.title === 'object' ? entry.title._ : entry.title) || 'Untitled';
      const rawContent = entry.content._ || entry.content || '';
      const published = new Date(entry.published);
      const categories = Array.isArray(entry.category)
        ? entry.category.map(cat => cat.$.term)
        : entry.category ? [entry.category.$.term] : [];

      const markdown = turndownService.turndown(rawContent);
      const description = plainExcerpt(markdown);

      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      const dateStr = published.toISOString().split('T')[0];

      // Use single-quoted YAML strings — no backslash escape issues
      const tagList = categories.map(t => `'${normalizeTag(t)}'`).join(', ');

      const frontmatter = [
        '---',
        `title: '${yamlTitle(title)}'`,
        `description: '${description}'`,
        `date: ${dateStr}`,
        `tags: [${tagList}]`,
        `featured: false`,
        '---',
        '',
        '',
      ].join('\n');

      const fullContent = frontmatter + markdown;

      const filename = `${slug}.md`;
      const filepath = path.join(outputDir, filename);
      fs.writeFileSync(filepath, fullContent, 'utf8');
      converted++;
      console.log(`✓ ${filename}`);
    });

    console.log(`\n✅ Converted ${converted} posts`);
    console.log(`⏭️  Skipped ${skipped} non-posts`);
  });
});

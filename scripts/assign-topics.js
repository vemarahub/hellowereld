import fs from 'fs';
import path from 'path';

const writingDir = './src/content/writing';

// Map of tag keywords → canonical topic name
// First matching rule wins
const TOPIC_RULES = [
  { topic: 'MongoDB',          keywords: ['mongo', 'gridfs', 'oplog', 'bson', 'wiredtiger', 'mmapv1', 'sharding', 'replication-steps'] },
  { topic: 'MySQL',            keywords: ['mysql', 'galera', 'workbench'] },
  { topic: 'Progress/OpenEdge',keywords: ['openedge', 'progress', 'prompt', 'nameserver', 'webspeed', 'adminserver', 'appserver', 'idxbuild', 'dsrutil', 'proutil', 'proenv'] },
  { topic: 'Shell Scripting',  keywords: ['shell-scripting', 'shell', 'bash', 'script', 'shell-script'] },
  { topic: 'Linux',            keywords: ['linux', 'unix', 'aix', 'solaris', 'linux-commands', 'linux-installation', 'environment', 'process-management', 'installation'] },
  { topic: 'Angular',          keywords: ['angular', 'bootstrap', 'rest-api', 'routing', 'faker-service'] },
  { topic: 'AWS',              keywords: ['aws', 'cloud', 'ec2', 's3'] },
];

// Sequence within each topic — list filenames (without .md) in preferred order
// Any file not listed here gets order:999 (alphabetical within topic)
const TOPIC_ORDER = {
  'MongoDB': [
    'introduction-to-mongo',
    'starting-database-in-mongo',
    'json-bson',
    'crud-in-mongo',
    'mongo-basic-queries',
    'mongo-operators',
    'mongo-indexes',
    'explain-plan-in-mongo',
    'mongo-import-cursors',
    'administrative-commands-in-mongo',
    'profiler-in-mongo',
    'dump-and-restore',
    'wired-tiger-in-mongo',
    'mmapv1',
    'gridfs-in-mongo',
    'disaster-snapshot-recovery-in-mongo',
    'mongo-replication',
    'mongo-replication-setup',
    'arbiters-oplog-write-concern-in-mongo-replication',
    'replication',
    'sharding-in-mongo',
    'sharding-setup-in-mongo',
    'js-script-for-shard-setup-in-mongo',
    'ops-manager-in-mongo',
    'security-in-mongo',
    'mongo-installation-on-rhel-vm',
  ],
  'MySQL': [
    'introduction-to-mysql',
    'mysql-installation',
    'mysql-architecture',
    'mysql-server',
    'mysql-configuration-setup',
    'basic-prompt-commands',
    'basic-queries-in-mysql',
    'storage-engines-in-mysql',
    'tablespace-in-mysql',
    'point-in-time-recovery-in-mysql',
    'mysql-security',
    'mysql-resource-usage',
    'mysql-percona',
    'dump-and-restore',
    'galera-replication',
    'group-multi-master-replication',
    'ndb-cluster',
    'command-line-clients',
    'gui-clients',
    'resetting-root-password-for-mysql',
    'starting-multiple-instances-in-mysql',
  ],
  'Progress/OpenEdge': [
    'progress-openedge-database-overview',
    'openedge-installation-windows',
    'openedge-installation-unix-linux',
    'openedge-database-creation',
    'openedge-database-architecture',
    'openedge-database-files',
    'openedge-storage-areas',
    'database-blocks',
    'database-structure-description-file-st',
    'openedge-indexes-and-index-utilities',
    'openedge-database-startup-parameters',
    'openedge-database-reports',
    'openedge-dump-and-load',
    'openedge-database-auditing',
    'user-management-in-openedge-database',
    'restricting-blank-user-id-login-to-progress-database',
    'openedge-replication-monitoring-status',
    'openedge-database-replication',
    'steps-for-openedge-replication',
    'openedge-replication-monitoring-and-commands',
    'openedge-appserver-webspeeds-nameserver-and-admin-servers',
    'nameserver-appserver-adminserver-webspeed-configuration-and-commands',
    'web-service-setup-in-progress',
    'openedge-management-oem-or-management-console-openedge-explorer',
    'setting-up-a-database-to-monitor-in-oem',
    'openedge-schema-tables',
    'basic-unix-commands-for-progress-dba',
    'shell-scripting-for-progress-dba',
    'what-is-new-in-oe',
    'openedge-interview-questions',
    'progress-4gl-development-basics',
  ],
  'Shell Scripting': [
    'shell-script-progress-start-database',
    'shell-script-progress-disconnect-user',
    'shell-script-progress-lk-info',
    'shell-script-check-area-utilization',
    'shell-script-progress-vairable-extent-size',
    'shell-script-progress-add-extents',
    'shell-script-progressdb-storage-growth',
    'shell-script-progress-log-parsing',
    'shell-script-progress-backup',
    'shell-script-database-stop',
    'shell-script-file-details',
    'shell-script-contents-of-directories',
    'shell-script-bulk-renaming-files',
    'shell-script-server-statistics',
    'shell-script-reminder-utility',
    'shell-script-interactive-calculator',
    'operating-system-resources',
  ],
  'Linux': [
    'introduction-to-unix-linux',
    'linux-installation',
    'unix-installation',
    'windows-installation',
    'linux-environment',
    'linux-shells',
    'basic-commands',
  ],
  'Angular': [
    'angular-overview',
    'angular-project-setup',
    'routing-in-angular',
    'bootstrap-in-angular',
    'styling-with-angular-material',
    'fake-service-in-angular',
    'rest-api-in-angular',
  ],
  'AWS': [
    'aws-introduction',
  ],
};

function detectTopic(tags) {
  const lowerTags = tags.map(t => t.toLowerCase());
  for (const rule of TOPIC_RULES) {
    if (rule.keywords.some(k => lowerTags.some(t => t.includes(k)))) {
      return rule.topic;
    }
  }
  return null;
}

function getOrder(topic, slug) {
  const list = TOPIC_ORDER[topic];
  if (!list) return 999;
  const idx = list.indexOf(slug);
  return idx === -1 ? 999 : idx + 1;
}

const files = fs.readdirSync(writingDir).filter(f => f.endsWith('.md'));
let updated = 0;

for (const file of files) {
  const filepath = path.join(writingDir, file);
  let content = fs.readFileSync(filepath, 'utf8');

  // Parse existing tags from frontmatter
  const tagsMatch = content.match(/^tags:\s*\[([^\]]*)\]/m);
  const tags = tagsMatch
    ? tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, '')).filter(Boolean)
    : [];

  const slug = file.replace('.md', '');
  const topic = detectTopic(tags);
  const order = topic ? getOrder(topic, slug) : 999;

  // Remove existing topic/order lines if present
  content = content.replace(/\ntopic:.*/, '').replace(/\norder:.*/, '');

  // Insert topic and order before the closing ---
  const topicLine = topic ? `\ntopic: '${topic}'` : '';
  const orderLine = `\norder: ${order}`;
  content = content.replace(/(\n---\n)/, `${topicLine}${orderLine}$1`);

  fs.writeFileSync(filepath, content, 'utf8');
  updated++;
  if (topic) console.log(`✓ ${slug} → ${topic} (#${order})`);
  else console.log(`  ${slug} → (no topic)`);
}

console.log(`\n✅ Updated ${updated} files`);

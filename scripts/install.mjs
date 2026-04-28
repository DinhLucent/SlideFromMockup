#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const SKILL_NAME = 'slide-promax';
const MARKER_FILE = '.slide-promax-install.json';
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultSource = path.resolve(scriptDir, '..');

const PLATFORM_ALIASES = new Map([
  ['all', ['common', 'codex', 'antigravity', 'claude-code', 'cursor']],
  ['universal', ['common', 'codex', 'antigravity', 'claude-code', 'cursor']],
  ['common', ['common']],
  ['agents', ['common']],
  ['codex', ['codex']],
  ['openai', ['codex']],
  ['claude', ['claude-code']],
  ['claude-code', ['claude-code']],
  ['cursor', ['cursor']],
  ['antigravity', ['antigravity']],
  ['google-antigravity', ['antigravity']],
  ['agy', ['antigravity']],
]);

const HELP = `
Slide ProMax installer

Usage:
  node scripts/install.mjs [options]
  npx github:DinhLucent/Slide_ProMax -- [options]

Options:
  --agents <list>     Comma/space list: codex, antigravity, claude-code, cursor, common, all
  --global            Install to user-level agent folders
  --project           Install to project/workspace-level agent folders
  --home <dir>        Override HOME for tests or portable installs
  --cwd <dir>         Override project root for --project installs
  --source <dir>      Override source skill folder
  --force             Replace an existing non-marked destination
  --dry-run           Print targets without writing files
  --no-compat         Skip compatibility mirrors such as .codex/.antigravity
  --include-src       Include README media sources from ./src
  --help              Show this help

Default:
  --global --agents all
`;

function parseArgs(argv) {
  const opts = {
    agents: ['all'],
    global: false,
    project: false,
    dryRun: false,
    force: false,
    compat: true,
    includeSrc: false,
    home: os.homedir(),
    cwd: process.cwd(),
    source: defaultSource,
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === 'install') continue;
    if (arg === '--help' || arg === '-h') {
      opts.help = true;
      continue;
    }
    if (arg === '--global' || arg === '-g') {
      opts.global = true;
      continue;
    }
    if (arg === '--project' || arg === '--workspace') {
      opts.project = true;
      continue;
    }
    if (arg === '--dry-run') {
      opts.dryRun = true;
      continue;
    }
    if (arg === '--force' || arg === '-f') {
      opts.force = true;
      continue;
    }
    if (arg === '--no-compat') {
      opts.compat = false;
      continue;
    }
    if (arg === '--include-src') {
      opts.includeSrc = true;
      continue;
    }
    if (arg === '--agents' || arg === '--agent' || arg === '-a') {
      opts.agents = splitList(argv[++i] || '');
      continue;
    }
    if (arg.startsWith('--agents=')) {
      opts.agents = splitList(arg.slice('--agents='.length));
      continue;
    }
    if (arg.startsWith('--agent=')) {
      opts.agents = splitList(arg.slice('--agent='.length));
      continue;
    }
    if (arg === '--home') {
      opts.home = argv[++i];
      continue;
    }
    if (arg.startsWith('--home=')) {
      opts.home = arg.slice('--home='.length);
      continue;
    }
    if (arg === '--cwd') {
      opts.cwd = argv[++i];
      continue;
    }
    if (arg.startsWith('--cwd=')) {
      opts.cwd = arg.slice('--cwd='.length);
      continue;
    }
    if (arg === '--source') {
      opts.source = argv[++i];
      continue;
    }
    if (arg.startsWith('--source=')) {
      opts.source = arg.slice('--source='.length);
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  if (!opts.global && !opts.project) opts.global = true;
  opts.home = path.resolve(opts.home);
  opts.cwd = path.resolve(opts.cwd);
  opts.source = path.resolve(opts.source);
  return opts;
}

function splitList(value) {
  return value.split(/[,\s]+/).map((item) => item.trim()).filter(Boolean);
}

function expandAgents(values) {
  const expanded = new Set();
  for (const value of values) {
    const key = value.toLowerCase();
    const mapped = PLATFORM_ALIASES.get(key);
    if (!mapped) {
      throw new Error(`Unsupported agent "${value}". Use: codex, antigravity, claude-code, cursor, common, all`);
    }
    mapped.forEach((agent) => expanded.add(agent));
  }
  return [...expanded];
}

function targetCatalog(opts) {
  const home = (...parts) => path.join(opts.home, ...parts);
  const cwd = (...parts) => path.join(opts.cwd, ...parts);
  const codexHome = process.env.CODEX_HOME ? path.resolve(process.env.CODEX_HOME) : home('.codex');

  return {
    common: {
      label: 'Common Agent Skills',
      global: [
        { path: home('.agents', 'skills', SKILL_NAME), note: 'shared Agent Skills user library' },
      ],
      project: [
        { path: cwd('.agents', 'skills', SKILL_NAME), note: 'shared Agent Skills project library' },
      ],
    },
    codex: {
      label: 'Codex',
      global: [
        { path: home('.agents', 'skills', SKILL_NAME), note: 'Codex user skill discovery path' },
        { path: path.join(codexHome, 'skills', SKILL_NAME), note: 'Codex home compatibility mirror', compat: true },
      ],
      project: [
        { path: cwd('.agents', 'skills', SKILL_NAME), note: 'Codex repository skill discovery path' },
        { path: cwd('.codex', 'skills', SKILL_NAME), note: 'Codex project compatibility mirror', compat: true },
      ],
    },
    'claude-code': {
      label: 'Claude Code',
      global: [
        { path: home('.claude', 'skills', SKILL_NAME), note: 'Claude Code personal skills' },
      ],
      project: [
        { path: cwd('.claude', 'skills', SKILL_NAME), note: 'Claude Code project skills' },
      ],
    },
    cursor: {
      label: 'Cursor',
      global: [
        { path: home('.cursor', 'skills', SKILL_NAME), note: 'Cursor user skills' },
      ],
      project: [
        { path: cwd('.cursor', 'skills', SKILL_NAME), note: 'Cursor project skills' },
      ],
    },
    antigravity: {
      label: 'Google Antigravity',
      global: [
        { path: home('.gemini', 'antigravity', 'skills', SKILL_NAME), note: 'Antigravity global skills' },
        { path: home('.antigravity', 'skills', SKILL_NAME), note: 'Antigravity user compatibility mirror', compat: true },
      ],
      project: [
        { path: cwd('.agents', 'skills', SKILL_NAME), note: 'Antigravity current workspace skills' },
        { path: cwd('.agent', 'skills', SKILL_NAME), note: 'Antigravity legacy workspace skills', compat: true },
        { path: cwd('.antigravity', 'skills', SKILL_NAME), note: 'Antigravity project compatibility mirror', compat: true },
      ],
    },
  };
}

function collectTargets(opts) {
  const catalog = targetCatalog(opts);
  const agents = expandAgents(opts.agents);
  const selected = new Map();
  const scopes = [];
  if (opts.global) scopes.push('global');
  if (opts.project) scopes.push('project');

  for (const agent of agents) {
    const entry = catalog[agent];
    for (const scope of scopes) {
      for (const target of entry[scope]) {
        if (target.compat && !opts.compat) continue;
        const absolute = path.resolve(target.path);
        assertAllowedTarget(absolute, opts);
        const key = process.platform === 'win32' ? absolute.toLowerCase() : absolute;
        if (!selected.has(key)) {
          selected.set(key, {
            path: absolute,
            scopes: new Set(),
            agents: new Set(),
            notes: new Set(),
            compat: Boolean(target.compat),
          });
        }
        const item = selected.get(key);
        item.scopes.add(scope);
        item.agents.add(entry.label);
        item.notes.add(target.note);
        item.compat = item.compat || Boolean(target.compat);
      }
    }
  }

  return [...selected.values()].map((item) => ({
    ...item,
    scopes: [...item.scopes],
    agents: [...item.agents],
    notes: [...item.notes],
  }));
}

function assertAllowedTarget(target, opts) {
  const roots = [opts.home, opts.cwd, process.env.CODEX_HOME ? path.resolve(process.env.CODEX_HOME) : null]
    .filter(Boolean)
    .map((root) => path.resolve(root));
  const ok = roots.some((root) => isInsideOrEqual(target, root));
  if (!ok) throw new Error(`Refusing to install outside HOME/CWD/CODEX_HOME: ${target}`);
}

function isInsideOrEqual(child, parent) {
  const relative = path.relative(parent, child);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function isReplaceableDestination(dest) {
  if (!(await pathExists(dest))) return true;
  if (await pathExists(path.join(dest, MARKER_FILE))) return true;

  const skillFile = path.join(dest, 'SKILL.md');
  if (!(await pathExists(skillFile))) return false;
  const text = await fs.readFile(skillFile, 'utf8').catch(() => '');
  return /name:\s*slide-promax/i.test(text) || /Slide ProMax/i.test(text);
}

function shouldSkip(relativePath, dirent, opts) {
  const first = relativePath.split(/[\\/]/)[0];
  if (first.startsWith('.tmp-install-')) return true;
  const ignoredTopLevel = new Set([
    '.git',
    '.agents',
    '.agent',
    '.antigravity',
    '.claude',
    '.codex',
    '.cursor',
    'node_modules',
    'artifacts',
  ]);
  if (!opts.includeSrc) ignoredTopLevel.add('src');
  if (ignoredTopLevel.has(first)) return true;
  if (dirent.name === '.DS_Store') return true;
  if (dirent.name === MARKER_FILE) return true;
  return false;
}

async function copySkillTree(source, dest, opts) {
  await fs.mkdir(dest, { recursive: true });
  await copyRecursive(source, dest, '', opts);
}

async function copyRecursive(sourceRoot, destRoot, relative, opts) {
  const sourceDir = path.join(sourceRoot, relative);
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const childRelative = path.join(relative, entry.name);
    if (shouldSkip(childRelative, entry, opts)) continue;

    const sourcePath = path.join(sourceRoot, childRelative);
    const destPath = path.join(destRoot, childRelative);

    if (entry.isDirectory()) {
      await fs.mkdir(destPath, { recursive: true });
      await copyRecursive(sourceRoot, destRoot, childRelative, opts);
    } else if (entry.isFile()) {
      await fs.mkdir(path.dirname(destPath), { recursive: true });
      await fs.copyFile(sourcePath, destPath);
    }
  }
}

async function writeMarker(dest, target, opts) {
  const marker = {
    name: SKILL_NAME,
    installedAt: new Date().toISOString(),
    source: opts.source,
    agents: target.agents,
    scopes: target.scopes,
    notes: target.notes,
  };
  await fs.writeFile(path.join(dest, MARKER_FILE), `${JSON.stringify(marker, null, 2)}\n`, 'utf8');
}

async function installTarget(target, opts) {
  const replaceable = await isReplaceableDestination(target.path);
  if (!replaceable && !opts.force) {
    throw new Error(`Destination exists and is not marked as Slide ProMax. Use --force to replace: ${target.path}`);
  }

  if (opts.dryRun) return;

  await fs.rm(target.path, { recursive: true, force: true });
  await copySkillTree(opts.source, target.path, opts);
  await writeMarker(target.path, target, opts);
}

async function validateSource(source) {
  const stat = await fs.stat(source);
  if (!stat.isDirectory()) throw new Error(`Source is not a directory: ${source}`);
  const skillPath = path.join(source, 'SKILL.md');
  if (!(await pathExists(skillPath))) throw new Error(`Source does not contain SKILL.md: ${source}`);
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log(HELP.trim());
    return;
  }

  await validateSource(opts.source);
  const targets = collectTargets(opts);

  console.log('Slide ProMax installer');
  console.log(`Source: ${opts.source}`);
  console.log(`Mode: ${opts.dryRun ? 'dry-run' : 'write'} | scopes: ${[opts.global && 'global', opts.project && 'project'].filter(Boolean).join(', ')}`);
  console.log('');

  for (const target of targets) {
    const compat = target.compat ? ' [compat]' : '';
    console.log(`- ${target.path}${compat}`);
    console.log(`  agents: ${target.agents.join(', ')}`);
    console.log(`  notes: ${target.notes.join('; ')}`);
  }

  if (opts.dryRun) {
    console.log('\nDry run complete. No files were written.');
    return;
  }

  for (const target of targets) {
    await installTarget(target, opts);
  }

  console.log(`\nInstalled Slide ProMax to ${targets.length} target(s). Restart the target agent if it does not detect the skill immediately.`);
}

main().catch((error) => {
  console.error(`\nInstall failed: ${error.message}`);
  process.exit(1);
});

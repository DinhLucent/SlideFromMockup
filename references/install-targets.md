# Installation Targets

Slide ProMax is an Agent Skill package. Different agents discover the same `SKILL.md`
format from different folders, so the installer writes to multiple targets instead of
relying on one generic `.agents` copy.

## Canonical Targets

| Agent | User/global target | Project/workspace target |
|---|---|---|
| Shared Agent Skills | `~/.agents/skills/slide-promax` | `.agents/skills/slide-promax` |
| Codex | `~/.agents/skills/slide-promax` | `.agents/skills/slide-promax` |
| Claude Code | `~/.claude/skills/slide-promax` | `.claude/skills/slide-promax` |
| Cursor | `~/.cursor/skills/slide-promax` | `.cursor/skills/slide-promax` |
| Google Antigravity | `~/.gemini/antigravity/skills/slide-promax` | `.agents/skills/slide-promax` |

## Compatibility Mirrors

These mirrors exist because real installations and older agent versions are inconsistent.
They are enabled by default and can be disabled with `--no-compat`.

| Agent | Compatibility target | Why |
|---|---|---|
| Codex | `~/.codex/skills/slide-promax` | Codex home/cache layouts also use `CODEX_HOME/skills` for bundled skills. |
| Codex | `.codex/skills/slide-promax` | Project-local compatibility for users who manage Codex files in `.codex`. |
| Antigravity | `~/.antigravity/skills/slide-promax` | Compatibility with existing Antigravity home folders observed on Windows installs. |
| Antigravity | `.agent/skills/slide-promax` | Legacy Antigravity workspace path. |
| Antigravity | `.antigravity/skills/slide-promax` | Project-local compatibility for Antigravity-specific workspaces. |

## Source Notes

- OpenAI Codex docs list `.agents/skills` for repository and user skill discovery,
  and `/etc/codex/skills` for admin scope. Codex source also writes bundled system
  skills under `CODEX_HOME/skills/.system`, so the installer keeps `.codex/skills`
  as a compatibility mirror rather than the only Codex target.
- Claude Code docs list personal skills in `~/.claude/skills/<skill-name>/SKILL.md`
  and project skills in `.claude/skills/<skill-name>/SKILL.md`.
- Cursor 2.4 added Agent Skills. Current user/project skill folders are
  `~/.cursor/skills/<skill-name>/SKILL.md` and `.cursor/skills/<skill-name>/SKILL.md`.
  Cursor rules still live under `.cursor/rules`, but Slide ProMax installs as a skill,
  not a rule.
- Google Antigravity documents global skills under `~/.gemini/antigravity/skills`
  and workspace skills under `.agents/skills`, with `.agent/skills` kept for older
  versions.

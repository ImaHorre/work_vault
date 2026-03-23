# Claude Instructions for Peak Emulsions Obsidian Vault

## Plan Storage

**Plans are stored in:** `C:\LOCAL\claude-plans\`

Due to the apostrophe in the username path, Claude plans cannot be stored in the default location. Always use the above path for reading and writing Claude plans.

## Vault Structure

This is an Obsidian vault for scientific/product development work at Peak Emulsions. The folder structure is:

- `00_Daily/` - Daily notes with quick capture workflow
- `01_Product/` - Product designs and issues tracking
  - `01_Product/Designs/` - Design documentation and testing
  - `01_Product/Issues/` - Issue investigation and problem solving
- `02_Projects/` - Project management and coordination
- `03_Research/` - Research notes and references
- `04_Tasks/` - Task organization (weekly, monthly, quarterly)
- `05_References/` - Reference materials
- `98_Templates/` - Template files for different note types
- `99_Archive/` - Archived materials

## Current Template System

Templates use Templater plugin with cursor positioning:
- Daily notes: `Ctrl+D` creates daily note with cursor in first section
- Other templates: Cursor positioned on title for immediate editing

## Plugins in Use

- **Templater** - Template automation with cursor positioning
- **QuickAdd** - Quick note creation with hotkeys (being configured)
- **Daily Notes** - Automated daily note creation
- **Hover Editor** - Enhanced editing experience

## Workflow Notes

- Daily notes are for quick capture during the day
- Issues may evolve from single notes to folder structures with "mother notes"
- Focus on keyboard-driven workflows with minimal mouse interaction
- Scientific approach: problem → hypothesis → experiments → results
## File Operations Workaround

**IMPORTANT**: Due to apostrophe in username path (ConorO'Sullivan), file operations require special handling:

### ✅ How to Write Files in Vault:
```bash
# Use bash with relative paths (works)
cat > filename.md << 'EOF'
content here
EOF
```

### ❌ What NOT to Do:
```
# Don't use Write tool with absolute paths (fails)  
Write to: C:\Users\ConorO'Sullivan\...\filename.md
```

### ✅ How to Read Files:
```
# Read tool works with relative paths from vault root
Read: ./filename.md
Read: .claude/CLAUDE.md
Read: 98_Templates/template.md
```

### Key Rules:
1. **Always use relative paths** from current working directory (the vault)
2. **Use bash commands** for file creation/modification in vault  
3. **Use Read tool** for reading files (works fine with relative paths)
4. **Store Claude plans** in C:\LOCAL\claude-plans\ (no apostrophe issues)
5. **Current working directory** is always the vault root
6. **Claude config files** stored in .claude/ subfolder

This ensures all file operations work smoothly regardless of the username path issues.

## Date Format System

**File Storage**: YYYY-MM-DD format (e.g., 2026-01-05.md, 2026-03-19.md)
**Display Format**: DD/MM/YY (e.g., "Daily Note - 05/01/26", "19/03/26")

### Benefits
- **Chronological sorting**: Files appear in proper date order in any file browser
- **User preference**: Display shows preferred DD/MM/YY format within notes
- **System compatibility**: YYYY-MM-DD is ISO standard, works universally
- **Future-proof**: Daily Notes plugin automatically creates files in correct format

### Configuration
- **Daily Notes Plugin**: Format set to "YYYY-MM-DD"
- **Template**: Shows DD/MM/YY in note title, YYYY-MM-DD in metadata
- **Folder**: All daily notes in single flat folder `00_Daily/Conor/`

### Template Usage
```markdown
# Daily Note - <% tp.date.now("DD/MM/YY") %>
*Created: <% tp.date.now("YYYY-MM-DD") %>*
```

This approach gives you the best of both worlds: proper file sorting with your preferred date display.

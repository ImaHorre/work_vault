<%*
// Get current line content
const editor = app.workspace.getActiveViewOfType(MarkdownView)?.editor;
if (!editor) {
    new Notice("No active editor");
    return;
}

const cursor = editor.getCursor();
const currentLine = editor.getLine(cursor.line);

// Look for /task pattern
const taskMatch = currentLine.match(/\/task\s+(.+)/);
if (!taskMatch) {
    new Notice("Use format: /task [task description]");
    return;
}

const taskText = taskMatch[1].trim();
const taskId = 'task-' + Date.now().toString().slice(-6);

// Replace /task line with checkbox
const newLine = `- [ ] ${taskText} ^${taskId}`;
editor.replaceRange(newLine, 
    { line: cursor.line, ch: 0 }, 
    { line: cursor.line, ch: currentLine.length }
);

// Add to Tasks.md
const tasksFile = app.vault.getAbstractFileByPath("04_Tasks/Tasks.md");
if (tasksFile) {
    const tasksContent = await app.vault.read(tasksFile);
    const dailyNoteName = tp.file.title;
    const taskLine = `- [ ] ${taskText} #general ([[${dailyNoteName}]]#^${taskId})`;
    
    // Insert after the instruction line
    const lines = tasksContent.split('\n');
    let insertIndex = 2; // Default after instruction
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('Quick capture')) {
            insertIndex = i + 2;
            break;
        }
    }
    
    lines.splice(insertIndex, 0, taskLine);
    await app.vault.modify(tasksFile, lines.join('\n'));
    
    new Notice(`Task added: ${taskText}`);
}
%>

<%*
// Get current line and parse /task
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

// Select just the task text (this will make QuickAdd capture it)
const taskStart = currentLine.indexOf(taskText);
const taskEnd = taskStart + taskText.length;

editor.setSelection(
    { line: cursor.line, ch: taskStart },
    { line: cursor.line, ch: taskEnd }
);

// Trigger your existing QuickAdd command
await tp.user.delay(100); // Small delay to ensure selection registers
app.commands.executeCommandById('quickadd:choice:simple-task-capture');
%>

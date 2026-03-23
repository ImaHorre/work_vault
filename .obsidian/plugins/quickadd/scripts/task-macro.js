// QuickAdd Task Macro - Creates tasks from /task commands
module.exports = async (params) => {
    const { quickAddApi: QuickAdd, app } = params;

    // Get the active file and editor
    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
        new Notice("No active file");
        return;
    }

    const editor = app.workspace.getActiveViewOfType(MarkdownView)?.editor;
    if (!editor) {
        new Notice("No active editor");
        return;
    }

    // Get current cursor position and line content
    const cursor = editor.getCursor();
    const lineContent = editor.getLine(cursor.line);
    
    // Check if line contains /task
    const taskMatch = lineContent.match(/\/task\s+(.+)/);
    if (!taskMatch) {
        new Notice("Use format: /task [task description]");
        return;
    }

    const taskText = taskMatch[1].trim();
    
    // Generate unique task ID
    const taskId = 'task-' + Date.now().toString().slice(-6);
    
    // Auto-detect device tag based on task text
    let deviceTag = "#general";
    const text = taskText.toLowerCase();
    if (text.includes("v5-30") || text.includes("v5") || text.includes("layering") || text.includes("stack")) {
        deviceTag = "#v5-30";
    } else if (text.includes("1um") || text.includes("batch") || text.includes("replication")) {
        deviceTag = "#1um";
    }
    
    // Replace /task line in daily note with checkbox and block reference
    const newLine = `- [ ] ${taskText} ^${taskId}`;
    editor.replaceRange(newLine, 
        { line: cursor.line, ch: 0 }, 
        { line: cursor.line, ch: lineContent.length }
    );
    
    // Add task to Rolling TODO
    const todoFile = app.vault.getAbstractFileByPath("04_Tasks/Rolling TODO.md");
    if (todoFile) {
        const todoContent = await app.vault.read(todoFile);
        const dailyNoteName = activeFile.basename;
        const taskLine = `- [ ] ${taskText} ${deviceTag} ([[${dailyNoteName}]]#^${taskId})`;
        
        // Insert after the first line (the heading)
        const lines = todoContent.split('\n');
        const insertIndex = lines.findIndex(line => line.startsWith('#')) + 2; // After heading and blank line
        lines.splice(insertIndex, 0, taskLine);
        
        await app.vault.modify(todoFile, lines.join('\n'));
    }
    
    new Notice(`Task added to Rolling TODO with tag ${deviceTag}`);
};

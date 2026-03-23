- [ ] <% tp.system.prompt("Task description?") %> ^task-<% tp.date.now("MMDDHHmm") %>

<%* 
// Also add to Rolling TODO
const taskDesc = tp.system.prompt("Task description?");
const taskId = "task-" + tp.date.now("MMDDHHmm");
const dailyNote = tp.file.title;
const todoPath = "04_Tasks/Rolling TODO.md";

// Add to Rolling TODO
const todoFile = app.vault.getAbstractFileByPath(todoPath);
if (todoFile) {
    const todoContent = await app.vault.read(todoFile);
    const taskLine = `- [ ] ${taskDesc} #general ([[${dailyNote}]]#^${taskId})`;
    const lines = todoContent.split('\n');
    
    // Insert after header
    let insertIndex = 2;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('# Rolling TODO')) {
            insertIndex = i + 2;
            break;
        }
    }
    
    lines.splice(insertIndex, 0, taskLine);
    await app.vault.modify(todoFile, lines.join('\n'));
}
%>

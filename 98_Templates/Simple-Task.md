<%*
const taskText = await tp.system.prompt("Task description?");
if (!taskText) return;

// Add to Tasks.md
const tasksFile = app.vault.getAbstractFileByPath("04_Tasks/Tasks.md");
if (tasksFile) {
    const tasksContent = await app.vault.read(tasksFile);
    const dailyNoteName = tp.file.title;
    const taskLine = `- [ ] ${taskText} #general ([[${dailyNoteName}]])`;

    const lines = tasksContent.split('\n');
    let insertIndex = 3; // After instruction line
    lines.splice(insertIndex, 0, taskLine);

    await app.vault.modify(tasksFile, lines.join('\n'));
    new Notice(`Task added: ${taskText}`);
}

tR = `- [ ] ${taskText} ^task-` + tp.date.now("MMDDHHmm");
%><% tR %>

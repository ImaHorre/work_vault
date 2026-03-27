module.exports = async (params) => {
    const {quickAddApi: QuickAdd, obsidian, app} = params;

    try {
        // Get the active editor
        const activeView = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        if (!activeView) {
            new obsidian.Notice("No active note found");
            return;
        }

        const editor = activeView.editor;
        const cursor = editor.getCursor();
        const currentLine = editor.getLine(cursor.line);

        // Check if line contains /task anywhere
        const taskMatch = currentLine.match(/\/task\s+(.+)$/i);

        if (!taskMatch) {
            new obsidian.Notice("No '/task' found in current line or no text after it");
            return;
        }

        // Extract the task text
        const taskText = taskMatch[1].trim();

        if (!taskText) {
            new obsidian.Notice("No task text found after '/task'");
            return;
        }

        // Get current note name for backlink
        const currentNoteName = activeView.file.basename;

        // Format the task entry
        const today = new Date().toISOString().split('T')[0];
        const taskEntry = `- [ ] ${today} // ${taskText} // [[${currentNoteName}]]`;

        // Define your task note path (adjust this to your preference)
        const taskNotePath = "04_Tasks/Tasks.md";

        // Get or create the task note
        let taskFile = app.vault.getAbstractFileByPath(taskNotePath);

        if (!taskFile) {
            // Create the task note if it doesn't exist
            await app.vault.create(taskNotePath, "# Daily Tasks\n\n");
            taskFile = app.vault.getAbstractFileByPath(taskNotePath);
        }

        // Read current content of task note
        const taskNoteContent = await app.vault.read(taskFile);

        // Find where to insert the task (before the Completed section)
        const completedSectionIndex = taskNoteContent.indexOf("## ✅ Completed");

        let updatedContent;
        if (completedSectionIndex !== -1) {
            // Insert before the Completed section
            const beforeCompleted = taskNoteContent.substring(0, completedSectionIndex);
            const afterCompleted = taskNoteContent.substring(completedSectionIndex);
            updatedContent = beforeCompleted + taskEntry + "\n\n" + afterCompleted;
        } else {
            // No Completed section found, just append to end
            updatedContent = taskNoteContent + "\n" + taskEntry;
        }

        // Write back to task note
        await app.vault.modify(taskFile, updatedContent);

        // Optional: Remove or modify the original line
        // Uncomment one of these options:

        // Option 1: Remove just the /task part and everything after it
        // const beforeTask = currentLine.substring(0, currentLine.indexOf('/task'));
        // editor.setLine(cursor.line, beforeTask.trim());

        // Option 2: Replace /task with ✓ to mark as processed
        // editor.setLine(cursor.line, currentLine.replace(/\/task\s+.+$/, "✓"));

        // Option 3: Add ✓ at the end to show task was captured
        // editor.setLine(cursor.line, currentLine + " ✓");

        // Option 4: Do nothing (leave original line as-is)

        new obsidian.Notice(`Task added: "${taskText}"`);

    } catch (error) {
        console.error("Task capture error:", error);
        new obsidian.Notice(`Error: ${error.message}`);
    }
};
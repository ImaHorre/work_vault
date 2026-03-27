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
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const yy = String(now.getFullYear()).slice(2);
        const formattedDate = `${dd}/${mm}/${yy}`;
        const isoDate = `${now.getFullYear()}-${mm}-${dd}`;
        const taskEntry = `- [ ] ${formattedDate} | ${taskText} | [[${currentNoteName}]] ➕ ${isoDate}`;

        // Define your task note path (adjust this to your preference)
        const taskNotePath = "04_Tasks/Tasks-data.md";

        // Get or create the task note
        let taskFile = app.vault.getAbstractFileByPath(taskNotePath);

        if (!taskFile) {
            // Create the task note if it doesn't exist
            await app.vault.create(taskNotePath, "# Daily Tasks\n\n");
            taskFile = app.vault.getAbstractFileByPath(taskNotePath);
        }

        // Read current content of task note
        const taskNoteContent = await app.vault.read(taskFile);

        const updatedContent = taskNoteContent.trimEnd() + "\n" + taskEntry;

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
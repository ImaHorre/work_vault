// QuickAdd Issue Macro - Creates issue notes from /issue commands
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
    
    // Check if line contains /issue
    const issueMatch = lineContent.match(/\/issue\s+(.+)/);
    if (!issueMatch) {
        new Notice("Use format: /issue [issue description]");
        return;
    }

    const issueText = issueMatch[1].trim();
    
    // Create issue filename (capitalize first letter, replace spaces with spaces for readability)
    const issueTitle = issueText.charAt(0).toUpperCase() + issueText.slice(1);
    const issueFileName = `${issueTitle}.md`;
    const issueFilePath = `01_Product/Issues/${issueFileName}`;
    
    // Replace /issue line in daily note
    const dailyNoteName = activeFile.basename;
    const newLine = `🚨 [[${issueTitle}]] - issue flagged`;
    editor.replaceRange(newLine, 
        { line: cursor.line, ch: 0 }, 
        { line: cursor.line, ch: lineContent.length }
    );
    
    // Create issue note content with template
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const issueContent = `# ${issueTitle}

*Created: ${currentDate}*
*Origin: [[${dailyNoteName}]] - issue flagged during daily work*

## Problem
${issueText}

## Evidence
- 

## Hypotheses
1. 
2. 

## Experiments to Run
- [ ] 
- [ ] 

## Results


## Status
🔄 Active

## Linked Work
- Origin: [[${dailyNoteName}]]

---
*Tags: #issue #investigation*`;

    // Create the issue file
    try {
        const issueFile = await app.vault.create(issueFilePath, issueContent);
        new Notice(`Issue created: ${issueTitle}`);
        
        // Optionally open the new issue file
        // app.workspace.getLeaf().openFile(issueFile);
        
    } catch (error) {
        if (error.message.includes("already exists")) {
            new Notice(`Issue already exists: ${issueTitle}`);
        } else {
            new Notice(`Error creating issue: ${error.message}`);
        }
    }
};


## File Operations Workaround

**IMPORTANT**: Due to apostrophe in username path (`ConorO'Sullivan`), file operations require special handling:

### ✅ How to Write Files in Vault:
```bash
# Use bash with relative paths (works)
cat > filename.md << 'EOF'
content here

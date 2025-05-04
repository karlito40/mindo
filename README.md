# Mindo

Organize your to-dos using a simple plain text format. And preview as a mindmap

![Preview](./assets/demo.gif)

## ✨ Features

- 📝 Manage your todos through a plain mindo text file 
- 🧠 Update task status using a simple, easy-to-learn format — understandable in under a minute
- 🌈 Syntax highlighting based on task status
- ⚙️ Easy setup via command: `Mindo: Open`
- 👁 Preview your tasks as a mindmap via command: `Mindo: Show View`
- 🖼 Export as PNG or SVG
- 📁 Multiple .mindo file can be used in a single project

#  🚀 Usage

1. Open the Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
2. Run: `Mindo: Open` 
- Or bypass these steps by creating a .mindo or MINDO file manually
3. Create a task using `Alt+enter`. See the [shortcuts](#commands-and-shortcuts) section
4. Run: `Mindo: Show View` while focused on a Mindo file. The associated mindmap appear
5. Update your task inside the mindo file. Start one with `Alt+s` or complete one with `Alt+d` while focused on a line
6. The mindmap should auto update at the same time
7. That's it ! You are a now a Mindo master

### Format 

Symbols are used to control task statuses. Add one at the beginning of a line to update it ⤵️

- `-` :  a simple text
- `- ☐`: an idle task
- `- ▶`: a started task
- `- ✔`: a completed task

Mindo uses **indentation** to organize tasks: adding 2 more spaces than the parent task creates a new section in the mindmap preview

**Working example** ⤵️
```javascript
- Welcome
  - ☐ Mindo
    - Organize your tasks
    - ▶ Test
      - ☐ Execute command "> Mindo: Open"
      - ▶ Shortcuts
        - On Mac
          - ☐ cmd + Enter to create a task (or revert)
          - ☐ Option + s to start a task (or revert)
          - ☐ Option + d to complete a task (or revert)
        - On Others
          - ☐ ctrl + Enter to create a task (or revert)
          - ☐ Alt + s to start a task
          - ☐ Alt + d to complete a task
      - ☐ Live preview it
        - ☐ Execute command "> Mindo: Show View"
        - ☐ Check auto update on changes
  - ▶ Support
    - Ask me on github
      - https://github.com/karlito40/mindo/issues
    - Contributions are welcome
    - ▶ Be kind
  - ✔ Enjoy your life
  - And thanks
```

### Commands and shortcuts

It adds 5 commands to the command palette:

```js
'Mindo: Open' // Open or create your main project's mindo file
'Mindo: Show View' // Open the mindmap visualizer on the focus editor
'Mindo: Toggle Task' // Create a task or transform it into a simple label
'Mindo: Toggle Start' // Toggle started symbol
'Mindo: Toggle Done' // Toggle done symbol
```

It adds 4 shortcuts when editing a `Mindo` file:

```js
'Cmd/Ctrl+Enter' // Triggers `Mindo: Toggle Task`
'Alt+Enter' // Triggers `Mindo: Toggle Task`
'Alt+D' // Triggers `Mindo: Toggle Done`
'Alt+S' // Triggers `Mindo: Toggle Start`
```

## Render Demo

![Screenshot](./assets/screenshot.png)

## Support

Don't hesitate to fill an issue on github [https://github.com/karlito40/mindo/issues](https://github.com/karlito40/mindo/issues). I will try my best to help.

## Release Notes

- **0.2.0** Add PNG export
- **0.1.0** Add SVG export and force dark theme
- **0.0.0** Initial release 

---

## Final

**Thanks & Enjoy!**

_Hope it serves you well as it does for me_
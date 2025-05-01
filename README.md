# Mindo

Organize your to-dos using a mind map file

![Preview](./assets/demo.gif)

## Features

- **Portable**: The mindmap is handle through a simple plain text format. Make it easy to update its content for anyone (even without the extension)
- **Fast management**: Shortcuts let you change a task's status directly within the file 
- **Multiple**:  Create as many as Mindo file as you want
- **Visual**: Mindo files update your mindmaps in real time

## Tutorial

You can create a mindo project using the command
```
> Mindo: Open
```
Or by creating it manually. In this case you have 2 options:
- a file name `MINDO`
- a file using the `.mindo` extension

Next open the preview using
```
> Mindo: Show View
```

Update your file following Mindo format as described below. 
And deep dive in our shortcut section to ease your task management.

### Format 

A mindo file follows some rules
- `- my text`: Is a simple node with `my text` as label. Use it as additional information for example
- `- ☐ xxx`: Is an idle task node with `xxx` as label
- `- ▶ doing some works`: Is a started task node with `doing some works` as label
- `- ✔ works done !`: Is a completed task node with `doing some works` as label

**Children nodes** used **2 spaces** indentation more than their parents.

**Working example**
```
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

### Commands & shortcuts

It adds 5 commands to the command palette:

```js
'Mindo: Open' // Open or create your main project's mindo file
'Mindo: Show View' // Open the mindmap visualizer on the focus editor
'Mindo: Toggle Task' // Create a task or transform it into a simple label
'Mindo: Toggle Start' // Toggle task started symbol
'Mindo: Toggle Done' // Toggle tasl done symbol
```

It adds 4 shortcuts when editing a `Mindo` file:

```js
'Cmd/Ctrl+Enter' // Triggers `Mindo: Toggle Task`
'Alt+Enter' // Triggers `Mindo: Toggle Task`
'Alt+D' // Triggers `Mindo: Toggle Done`
'Alt+S' // Triggers `Mindp: Toggle Start`
```

## Demo

![Screenshot](./assets/screenshot.png)

## Support

Don't hesitate to fill issues on the github project [https://github.com/karlito40/mindo/issues](https://github.com/karlito40/mindo/issues). I will try my best to help. Also understand that our times is not infinite. And this project isn't vital for me. It serves my goal and i will happy if it's serve your too.

## Release Notes

- **0.0.1** Initial release for my own needs

---

## Final

**Thanks & Enjoy!**

_Hope it serves you well as it does for me_
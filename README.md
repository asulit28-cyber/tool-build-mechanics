# Everyday Tool — Time Waiting

## Core Function
A simple checklist that shows how long each task has been waiting since it was added. When completed, the timer stops and shows the total waiting time.

## Backend / Data Answers

### 1. What data does the tool need?
- Task text
- Time created
- Time completed, if finished
- Unique task ID

### 2. Where is it stored?
In the browser's `localStorage`.

### 3. Temporary or persistent?
Persistent until the browser's stored site data is cleared.

### 4. Memory between sessions?
Yes. The original creation timestamp must remain so the timer does not reset after a refresh.

### 5. AI inference?
No. The tool does not use AI or make predictions.

### 6. Number of API calls?
Zero. It runs entirely in the browser.

### 7. What happens if an API fails?
There is no API. If browser storage is unavailable, the tool shows a warning and keeps the current in-memory state for the session.

## Architecture

### Input Layer
The user enters a task and presses **Add**. The user can press **Complete** on an active task.

### Logic Layer
JavaScript creates the task, records timestamps, saves/loads `localStorage`, calculates elapsed time, updates timers every second, and records completion time.

### Output Layer
The interface displays active tasks, their waiting time, a Complete button, and completed tasks with their final waiting time.

## Behavior Integrity
- Makes waiting time visible without judging productivity.
- No scores, streaks, rankings, rewards, or notifications.
- No monitoring outside the tool.
- No shame-based messages.
- One main function: making waiting time visible.

## Break Log

### Break 1
- Date: Sep 22
- Commit hash: 
- What broke: didn't work cause wrong labeling in script
- What changed: I made sure all the labels were correct

### Break 2
- Date: Sep 23 
- Commit hash: 
- What broke: The formatting broke after trying to add a clear button
- What changed: tryed to fix it.

### Break 3
- Date: Sep 23
- Commit hash: 
- What broke: A completed task could continue displaying as active.
- What changed: stopped the timer on completion.

## Git History Requirement
The assignment requires at least 5 commits across 2 or more different dates.

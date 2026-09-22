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

**IMPORTANT:** Replace every placeholder below with a REAL date and REAL commit hash from your own Git history. Do not invent hashes.

### Break 1
- Date: `[REAL DATE]`
- Commit hash: `[REAL HASH]`
- What broke: Tasks disappeared after refreshing.
- What changed: Added persistent `localStorage` saving/loading.

### Break 2
- Date: `[REAL DATE]`
- Commit hash: `[REAL HASH]`
- What broke: The timer reset after refreshing.
- What changed: Stored `createdAt` and calculated elapsed time from it.

### Break 3
- Date: `[REAL DATE]`
- Commit hash: `[REAL HASH]`
- What broke: A completed task could continue displaying as active.
- What changed: Added `completedAt` and stopped the timer on completion.

## Submission Links

Replace these with your real links:
- Live deployed tool: `[LIVE URL]`
- GitHub repository: `[GITHUB URL]`
- Screen recording: `[RECORDING URL]`

## Git History Requirement
The assignment requires at least 5 commits across 2 or more different dates.

Possible real commit messages:
1. `build: create basic task interface`
2. `build: add task creation logic`
3. `fix: persist tasks with localStorage`
4. `fix: preserve elapsed time after reload`
5. `fix: stop timer when task is completed`

Use the actual hashes from `git log --oneline` in the break log.

# Ameh Peter Akogwu — Student Portfolio & Academic Planner

Term project for COS 106 — Introduction to Web Technologies (Miva Open University).

## Structure
```
portfolio/
├── index.html          Home page
├── about.html           About Me page
├── projects.html        Projects page
├── planner.html         Academic Planner (interactive, JS + localStorage)
├── contact.html         Contact page (validated form)
├── css/style.css        Single external stylesheet
├── js/main.js           Shared nav + typing effect
├── js/planner.js        Task add/complete/delete logic
├── js/contact.js        Form validation logic
└── assets/profile.jpg   Profile photo
```

## Run locally
No build step needed — plain HTML/CSS/JS. Just open `index.html` in a browser,
or serve the folder with any static server, e.g.:
```
npx serve .
```

## Deploy (pick one)

### GitHub Pages (recommended, free)
1. Create a new GitHub repo (e.g. `student-portfolio`).
2. Push this whole folder's contents to the repo root.
3. In the repo: **Settings → Pages → Source: Deploy from branch → main → / (root)**.
4. Your live link will be `https://<username>.github.io/<repo-name>/`.

### Netlify
1. Create a free Netlify account.
2. Drag-and-drop this folder into the Netlify dashboard ("Deploys" tab).
3. Netlify gives you a live URL immediately.

### Render (Static Site)
1. Push this folder to a GitHub repo.
2. In Render: **New → Static Site**, connect the repo.
3. Build command: leave blank. Publish directory: `.` (root).

## Submission checklist
- [ ] Live hosted link (GitHub Pages / Netlify / Render)
- [ ] GitHub repository link

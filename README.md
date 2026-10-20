# The Little Herb Garden

A small website for day 1 of **Frontend Development**.

It is broken. Your job is to find out why, and to repair it.

## What you need

- a GitHub account
- Git
- an editor
- a browser (Firefox recommended)
- [Node.js](https://nodejs.org/) (the LTS version), which brings `npx`

## Get your copy

1. **Fork** this repository to your GitHub account.
2. **Clone your fork**, not this repository:

   ```sh
   git clone https://github.com/<your-name>/culs-frontend-day1.git
   cd culs-frontend-day1
   ```

## Run it

Start a small web server in the project folder:

```sh
npx serve
```

The first time, `npx` asks whether to install `serve`. Answer `y`.

Then open the address it prints, usually <http://localhost:3000>.
Stop the server with `Ctrl+C`.

Do not open `index.html` by double-clicking it. A `file://` page is not the Web.

## Your mission

Something is wrong. Several things, in fact.

1. Inspect before you change anything: the page, the Console, the Network panel, the Inspector.
2. Pick one problem and find out why it happens.
3. Fix it, reload, verify.
4. Commit that one fix, with a message that says what you fixed.
5. Repeat.

You are done when:

- the Console shows no unexplained errors
- the Network panel shows no missing files
- every link on the page goes where it says
- `git status` is clean, and `git push` has sent your commits to GitHub

## The project

```text
index.html    the page
style.css     how it looks
app.js        what it does
data/         the herbs, as JSON
images/       the logo and a picture
```
## Team

- Anchal
- Akhin
- Abhinav
- Satyam

## What we built
We repaired the broken page (day 1) and then extended it.

**Day 2: content**

- semantic HTML: `header`, `nav`, `main`, `section`, `figure`, `footer`
- a harvest table with `caption` and `th scope`
- an inline SVG sun icon
- a FAQ with `details` and `summary`, which works without JavaScript
- a skip link, visible focus outlines and a mobile layout

**Day 3: functionality**

- search by name, Latin name or use (try "tea" or "bees")
- filter by life cycle: all, annual or perennial
- favourites: click ☆ on a card; they are saved in `localStorage`
  and stay after a reload

### How it works

1. `app.js` fetches `data/herbs.json` from the server.
2. The herbs, the search text, the filter and the favourites live in one `state` object.
3. When the user types, picks a filter or clicks a star, the state changes
   and `render()` draws the cards again.
4. Favourites are written to `localStorage`.

On Windows PowerShell, use `npx.cmd serve` if `npx` is blocked.
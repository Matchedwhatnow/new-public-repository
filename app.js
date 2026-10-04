const DATA = {
  funny: [
    "Important question before we continue: what is your most irrational food opinion?",
    "I was going to send a normal opening message, but where's the fun in that? So... what would your warning label say?",
    "Quick compatibility test: tea, coffee, or are you one of those mysterious people who survives entirely on vibes?",
    "You look like someone who has a story that starts with \"this seemed like a good idea at the time.\" Am I right?",
    "I've got a very important question: what is your completely unnecessary but impressive skill?",
    "Serious question: if we got lost together, are you navigating or confidently making things worse?",
    "I'll skip the boring \"hey, how are you?\" What are you currently obsessed with?",
    "Choose your fighter: spontaneous road trip, cosy night in, or food mission at an unreasonable hour?",
    "I need a second opinion: pineapple on pizza — acceptable or criminal?",
    "What would win you over faster: great banter, great food, or great music?"
  ],

  profile: [
    "That travel photo has me curious — best place you've been, and would you actually go back?",
    "I saw the food photo. Important question: are you actually a good cook or just excellent at finding restaurants?",
    "Your dog clearly has the better profile. What's their name, and do they approve your dating choices?",
    "I assume your cat has already interviewed everyone you date. What's their biggest complaint about you?",
    "If I gave you control of the music for a road trip, what song are you playing first?",
    "Important race-day question: are you here for the strategy, the speed, or the dramatic radio messages?",
    "I'm curious about the tattoo — does it have a story, or did you just think it looked brilliant?",
    "You get one film to convince me your taste is excellent. What are you picking?",
    "What's a book you wish you could read again for the first time?",
    "You've given me very little to work with, so I'll ask the important question: what are you secretly brilliant at?"
  ],

  flirty: [
    "Okay, I'll admit it — your profile definitely caught my attention. What's the best way to impress you: humour, food or excellent conversation?",
    "You've got a dangerously good smile. I'm curious whether the personality matches it.",
    "I was going to play it cool, but apparently I'm not very good at that. Hi.",
    "You seem like someone I'd probably end up laughing with far too much.",
    "I've got a feeling we'd either have brilliant banter or get banned from somewhere for laughing too loudly.",
    "I'll risk sounding confident: I think we'd get on. Prove me wrong.",
    "You've got my attention. Now I'm curious what usually gets yours.",
    "Let's start with an easy one: what would make you instantly enjoy a first date?",
    "I'll be honest: the photos got me to stop scrolling, but the profile made me message.",
    "One question: are you always this easy to notice, or did you just catch me at the right moment?"
  ],

  quiet: [
    "I think we accidentally reached the part where one of us has to say something interesting again. I'll go first.",
    "Okay, changing tactics: what's something I couldn't guess about you from your profile?",
    "Random question incoming because normal conversation is overrated: what would you spend £1,000 on tomorrow?",
    "Right, enough sensible conversation. Tell me something completely random.",
    "Quick reset: what's been the highlight of your week?",
    "Let's settle this: ideal night out or ideal night in?",
    "Your turn to ask me something. And no, \"what do you do?\" doesn't count.",
    "I've decided we need a completely unnecessary compatibility test. Tea or coffee?",
    "Let's pretend we're already past the awkward small talk. What's the first thing you'd ask me?",
    "Okay, serious question: what would make you actually want to meet someone from an app?"
  ],

  date: [
    "You're actually fun to talk to. Fancy continuing this conversation over a coffee sometime?",
    "I think we've established that the banter works. Want to test the theory in person?",
    "This conversation deserves better than a dating app. Fancy a drink sometime?",
    "We seem to be getting on, so I'll be brave: want to meet for a coffee/drink and see if the chemistry survives outside the app?",
    "How about we stop typing and see whether we're just as good at talking in person?",
    "I'd rather meet for an hour than spend three weeks messaging. Fancy a coffee?"
  ],

  questions: [
    "What are you looking forward to at the moment?",
    "What's something small that instantly makes your day better?",
    "What is your perfect lazy day?",
    "What's something you've always wanted to try?",
    "What are you surprisingly competitive about?",
    "What makes you laugh every single time?",
    "What song can you never skip?",
    "What's your ideal first date: activity, drinks, food, walk, or something completely different?",
    "Favourite comfort food?",
    "Morning person or night owl?",
    "Dream weekend?",
    "Biggest pet peeve?",
    "Most spontaneous thing you've done?",
    "One thing on your bucket list?",
    "What's your hidden talent?"
  ]
};

const labels = {
  funny: "Funny & Playful",
  profile: "Profile-Specific",
  flirty: "Flirty",
  quiet: "Quiet-Chat Rescue",
  date: "Move to a Date",
  questions: "Questions"
};

let current = "funny";

let favorites = JSON.parse(
  localStorage.getItem("mwn_favs") || "[]"
);

function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderCats() {
  const cats = document.querySelector("#cats");
  if (!cats) return;

  cats.innerHTML = Object.keys(DATA)
    .map(
      key =>
        `<button class="chip ${key === current ? "on" : ""}"
          onclick="pick('${key}')">${labels[key]}</button>`
    )
    .join("");
}

function pick(key) {
  if (!DATA[key]) return;

  current = key;

  const title = document.querySelector("#title");
  if (title) title.textContent = labels[key];

  renderCats();
  render(DATA[key]);
}

function render(list = DATA[current]) {
  const cards = document.querySelector("#cards");
  if (!cards) return;

  if (!list || list.length === 0) {
    cards.innerHTML = `<p class="muted">No messages found.</p>`;
    return;
  }

  cards.innerHTML = list
    .map(message => {
      const saved = favorites.includes(message);

      return `
        <article class="card">
          <p>${esc(message)}</p>
          <div>
            <button onclick='copyMsg(${JSON.stringify(message)})'>
              Copy
            </button>

            <button class="ghost"
              onclick='fav(${JSON.stringify(message)})'>
              ${saved ? "★ Saved" : "☆ Save"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

async function copyMsg(message) {
  try {
    await navigator.clipboard.writeText(message);
    toast("Saved to clipboard");
  } catch (error) {
    const area = document.createElement("textarea");
    area.value = message;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    toast("Saved to clipboard");
  }
}

function fav(message) {
  if (favorites.includes(message)) {
    favorites = favorites.filter(item => item !== message);
  } else {
    favorites.push(message);
  }

  localStorage.setItem("mwn_favs", JSON.stringify(favorites));
  render();
}

function showFavs() {
  const title = document.querySelector("#title");
  const cards = document.querySelector("#cards");

  if (title) title.textContent = "Saved Messages";
  if (!cards) return;

  if (favorites.length === 0) {
    cards.innerHTML = `
      <p class="muted">
        Tap ★ Save on any message to keep it here.
      </p>
    `;
    return;
  }

  cards.innerHTML = favorites
    .map(
      message => `
        <article class="card">
          <p>${esc(message)}</p>

          <div>
            <button onclick='copyMsg(${JSON.stringify(message)})'>
              Copy
            </button>

            <button class="ghost"
              onclick='fav(${JSON.stringify(message)}); showFavs();'>
              ★ Remove
            </button>
          </div>
        </article>
      `
    )
    .join("");
}

function randomMsg() {
  const all = Object.values(DATA).flat();

  const message =
    all[Math.floor(Math.random() * all.length)];

  const title = document.querySelector("#title");
  const cards = document.querySelector("#cards");

  if (title) title.textContent = "Try This";
  if (!cards) return;

  cards.innerHTML = `
    <article class="card featured">
      <p>${esc(message)}</p>

      <div>
        <button onclick='copyMsg(${JSON.stringify(message)})'>
          Copy
        </button>

        <button class="ghost"
          onclick='fav(${JSON.stringify(message)})'>
          ☆ Save
        </button>
      </div>
    </article>
  `;
}

function searchMsgs(query) {
  const q = String(query || "").trim().toLowerCase();

  if (!q) {
    const title = document.querySelector("#title");
    if (title) title.textContent = labels[current];
    render(DATA[current]);
    return;
  }

  const all = Object.values(DATA).flat();

  const results = all.filter(message =>
    message.toLowerCase().includes(q)
  );

  const title = document.querySelector("#title");
  if (title) title.textContent = "Search Results";

  render(results);
}

function buildMessage() {
  const detailBox = document.querySelector("#detail");
  const reactionBox = document.querySelector("#reaction");
  const output = document.querySelector("#builtMessage");

  if (!detailBox || !reactionBox || !output) {
    return;
  }

  const detail = detailBox.value.trim();
  const reaction = reactionBox.value.trim();

  if (!detail && !reaction) {
    output.innerHTML = `
      <p class="muted">
        Add a detail and your reaction first.
      </p>
    `;
    return;
  }

  let message = "";

  if (detail && reaction) {
    message = `${detail} — ${reaction}`;
  } else if (detail) {
    message = `${detail} — tell me more 👀`;
  } else {
    message = reaction;
  }

  output.innerHTML = `
    <article class="card featured">
      <p>${esc(message)}</p>

      <div>
        <button onclick='copyMsg(${JSON.stringify(message)})'>
          Copy
        </button>

        <button class="ghost"
          onclick='fav(${JSON.stringify(message)})'>
          ☆ Save
        </button>
      </div>
    </article>
  `;
}

function toast(text) {
  const toastBox = document.querySelector("#toast");

  if (!toastBox) return;

  toastBox.textContent = text;
  toastBox.classList.add("show");

  setTimeout(() => {
    toastBox.classList.remove("show");
  }, 1400);
}

renderCats();

const initialTitle = document.querySelector("#title");

if (initialTitle) {
  initialTitle.textContent = labels[current];
}

render(DATA[current]);

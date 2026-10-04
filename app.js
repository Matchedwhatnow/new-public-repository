const DATA = {
  "funny": [
    "Important question before we continue: what is your most irrational food opinion?",
    "I was going to send a normal opening message, but where's the fun in that? So… what would your warning label say?",
    "Quick compatibility test: tea, coffee, or are you one of those mysterious people who survives entirely on vibes?",
    "You look like someone who has a story that starts with “this seemed like a good idea at the time.” Am I right?",
    "I've got a very important question: what is your completely unnecessary but impressive skill?",
    "Serious question: if we got lost together, are you navigating or confidently making things worse?",
    "I'll skip the boring “hey, how are you?” What are you currently obsessed with?",
    "Choose your fighter: spontaneous road trip, cosy night in, or food mission at an unreasonable hour?",
    "I need a second opinion: pineapple on pizza — acceptable or criminal?",
    "What would win you over faster: great banter, great food, or great music?"
  ],
  "profile": [
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
  "flirty": [
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
  "quiet": [
    "I think we accidentally reached the part where one of us has to say something interesting again. I'll go first…",
    "Okay, changing tactics: what's something I couldn't guess about you from your profile?",
    "Random question incoming because normal conversation is overrated: what would you spend £1,000 on tomorrow?",
    "Right, enough sensible conversation. Tell me something completely random.",
    "Quick reset: what's been the highlight of your week?",
    "Let's settle this: ideal night out or ideal night in?",
    "Your turn to ask me something. And no, “what do you do?” doesn't count.",
    "I've decided we need a completely unnecessary compatibility test. Tea or coffee?",
    "Let's pretend we're already past the awkward small talk. What's the first thing you'd ask me?",
    "Okay, serious question: what would make you actually want to meet someone from an app?"
  ],
  "date": [
    "You're actually fun to talk to. Fancy continuing this conversation over a coffee sometime?",
    "I think we've established that the banter works. Want to test the theory in person?",
    "This conversation deserves better than a dating app. Fancy a drink sometime?",
    "We seem to be getting on, so I'll be brave: want to meet for a coffee/drink and see if the chemistry survives outside the app?",
    "How about we stop typing and see whether we're just as good at talking in person?",
    "I'd rather meet for an hour than spend three weeks messaging. Fancy a coffee?"
  ],
  "questions": [
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
const labels={funny:"Funny & Playful",profile:"Profile-Specific",flirty:"Flirty",quiet:"Quiet-Chat Rescue",date:"Move to a Date",questions:"Questions"};
let current="funny", favorites=JSON.parse(localStorage.getItem("mwn_favs")||"[]");
function esc(s){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function renderCats(){document.querySelector("#cats").innerHTML=Object.keys(DATA).map(k=>`<button class="chip ${k===current?'on':''}" onclick="pick('${k}')">${labels[k]}</button>`).join("");}
function render(list=DATA[current]){document.querySelector("#title").textContent=labels[current]; document.querySelector("#cards").innerHTML=list.map((m,i)=>`<article class="card"><p>${esc(m)}</p><div><button onclick='copyMsg(${JSON.stringify(m)})'>Copy</button><button class="ghost" onclick='fav(${JSON.stringify(m)})'>${favorites.includes(m)?"★ Saved":"☆ Save"}</button></div></article>`).join("")||"<p class='muted'>No messages found.</p>";}
function pick(k){current=k; document.querySelector("#search").value=""; renderCats(); render();}
async function copyMsg(m){await navigator.clipboard.writeText(m); toast("Copied to clipboard");}
function fav(m){favorites=favorites.includes(m)?favorites.filter(x=>x!==m):[...favorites,m];localStorage.setItem("mwn_favs",JSON.stringify(favorites));render();}
function showFavs(){document.querySelector("#title").textContent="Saved Messages";document.querySelector("#cards").innerHTML=favorites.map(m=>`<article class="card"><p>${esc(m)}</p><div><button onclick='copyMsg(${JSON.stringify(m)})'>Copy</button><button class="ghost" onclick='fav(${JSON.stringify(m)})'>★ Remove</button></div></article>`).join("")||"<p class='muted'>Tap ☆ Save on any message to keep it here.</p>";}
function randomMsg(){let all=Object.values(DATA).flat(); let m=all[Math.floor(Math.random()*all.length)];document.querySelector("#title").textContent="Try This";document.querySelector("#cards").innerHTML=`<article class="card featured"><p>${esc(m)}</p><div><button onclick='copyMsg(${JSON.stringify(m)})'>Copy</button><button class="ghost" onclick='fav(${JSON.stringify(m)})'>☆ Save</button></div></article>`;}
function buildMessage(){let d=document.querySelector("#detail").value.trim(), r=document.querySelector("#reaction").value.trim(), q=document.querySelector("#question").value.trim(); let m=`I noticed ${d||"[specific detail]"}. ${r||"[your playful reaction]"} ${q||"[easy question]"}`;document.querySelector("#built").textContent=m;}
function searchMsgs(q){q=q.toLowerCase(); if(!q)return render(); let all=Object.values(DATA).flat().filter(m=>m.toLowerCase().includes(q));document.querySelector("#title").textContent="Search Results";render(all);}
function toast(t){let x=document.querySelector("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1400);}
renderCats();render();

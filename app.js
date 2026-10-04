function buildMessage() {
  const detail = document.querySelector("#detail").value.trim();
  const reaction = document.querySelector("#reaction").value.trim();
  const output = document.querySelector("#builtMessage");

  if (!detail && !reaction) {
    output.textContent = "Add a detail and your reaction first.";
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
    <div class="card featured">
      <p>${esc(message)}</p>
      <button onclick='copyMsg(${JSON.stringify(message)})'>Copy</button>
      <button class="ghost" onclick='fav(${JSON.stringify(message)})'>⭐ Save</button>
    </div>
  `;
}

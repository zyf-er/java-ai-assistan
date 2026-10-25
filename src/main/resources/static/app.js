const chatEl = document.getElementById("chat");
const inputEl = document.getElementById("input");
const sendBtn = document.getElementById("send");

let loading = false;

function scrollToBottom() {
  chatEl.scrollTop = chatEl.scrollHeight;
}

function appendMessage(role, text, opts = {}) {
  const wrap = document.createElement("div");
  wrap.className = "msg msg-" + role;
  if (opts.error) wrap.classList.add("msg-error");

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";

  if (opts.thinking) {
    bubble.classList.add("thinking");
    bubble.innerHTML =
      '<span>AI 助手正在思考</span>' +
      '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
  } else {
    bubble.textContent = text;
  }

  wrap.appendChild(bubble);
  chatEl.appendChild(wrap);
  scrollToBottom();
  return wrap;
}

async function sendMessage() {
  const message = inputEl.value.trim();
  if (!message || loading) return;

  appendMessage("user", message);
  inputEl.value = "";
  autoResize();

  loading = true;
  sendBtn.disabled = true;

  const thinkingEl = appendMessage("ai", "", { thinking: true });

  try {
    const resp = await fetch("/api/assistant/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    let body = null;
    try {
      body = await resp.json();
    } catch (e) {
      body = null;
    }

    const failed =
      !resp.ok || !body || body.code !== 200 || typeof body.data !== "string";

    if (failed) {
      const reason =
        body && body.message
          ? body.message
          : `请求失败（HTTP ${resp.status}）`;
      thinkingEl.remove();
      appendMessage("ai", "出错了：" + reason, { error: true });
    } else {
      thinkingEl.querySelector(".msg-bubble").classList.remove("thinking");
      thinkingEl.querySelector(".msg-bubble").textContent = body.data;
      scrollToBottom();
    }
  } catch (err) {
    thinkingEl.remove();
    appendMessage("ai", "网络错误，请检查连接后重试。", { error: true });
  } finally {
    loading = false;
    sendBtn.disabled = false;
    inputEl.focus();
  }
}

function autoResize() {
  inputEl.style.height = "auto";
  inputEl.style.height = Math.min(inputEl.scrollHeight, 140) + "px";
}

sendBtn.addEventListener("click", sendMessage);

inputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

inputEl.addEventListener("input", autoResize);

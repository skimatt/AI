// DOM Elements (tetap sama)
const elements = {
  chatContainer: document.getElementById("chatContainer"),
  userInput: document.getElementById("userInput"),
  sendButton: document.getElementById("sendButton"),
  suggestionButtons: document.querySelectorAll(".suggestion"),
};

// State (tetap sama)
let state = {
  isProcessing: false,
  stopTyping: false,
};

// AI Data (diperkaya)
const aiData = {
  name: "SkiAI",
  version: "Ski 2.0",
  creator: "Rahmat Mulia",
  creationDate: "15 Maret 2025",
  team: [
    {
      name: "Rahmat Mulia",
      role: "Lead Developer",
      description: "Seorang inovator teknologi yang visioner.",
    },
  ],
  features: [
    "**Respon cepat** dengan efek ketik dinamis",
    "Dukungan penuh **Markdown** untuk kode dan formatting",
    "Percakapan interaktif yang alami",
    "Integrasi dengan **SkiAI 2.0**",
    "Penyesuaian bahasa alami",
  ],
  getCurrentDate: () =>
    new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  greeting: () => {
    const hour = new Date().getHours();
    return hour < 11
      ? "Selamat pagi"
      : hour < 15
      ? "Selamat siang"
      : hour < 19
      ? "Selamat sore"
      : "Selamat malam";
  },
};

// Event Listeners (tetap sama)
elements.userInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    state.isProcessing ? stopMessage() : sendMessage();
  }
});

elements.sendButton.addEventListener("click", () =>
  state.isProcessing ? stopMessage() : sendMessage()
);

elements.suggestionButtons.forEach((button) =>
  button.addEventListener("click", () => {
    elements.userInput.value = button.textContent;
    sendMessage();
  })
);

// Fungsi untuk membersihkan teks (dimodifikasi)
function cleanText(text) {
  // Biarkan markdown tags (*, _, `, dll)
  return text
    .replace(/(\n\s*)+/g, "\n") // Hilangkan spasi berlebih setelah newline
    .trim();
}

// Core Functions (dimodifikasi untuk formatting)
async function sendMessage() {
  const input = elements.userInput.value.trim();
  if (!input || state.isProcessing) return;

  state.stopTyping = false;
  removeInitialMessage();
  addMessage(input, "user");
  elements.userInput.value = "";
  state.isProcessing = true;
  toggleSendButton(true);

  const loadingId = addLoadingIndicator();

  try {
    const { text: rawText, isMarkdown } = await generateResponse(input);
    const responseText = cleanText(rawText);
    removeLoadingIndicator(loadingId);
    await typeMessage(responseText, "bot", isMarkdown);
  } catch (error) {
    removeLoadingIndicator(loadingId);
    await typeMessage(`**Error:** ${error.message}`, "bot", true); // Format error sebagai markdown
  } finally {
    state.isProcessing = false;
    toggleSendButton(false);
    scrollToBottom();
  }
}

async function generateResponse(input) {
  const lowerInput = input.toLowerCase();

  if (/halo|hai|hello|hi/i.test(lowerInput)) {
    return {
      text: `**${aiData.greeting()}!** 👋\n\nSaya **${
        aiData.name
      }**, asisten AI Anda. Ada yang bisa saya bantu?\n\nBeberapa hal yang bisa Anda tanyakan:\n- Siapa pembuat saya?\n- Fitur apa saja yang saya miliki?\n- Berikan contoh kode JavaScript\n- Apa yang bisa kamu lakukan?`,
      isMarkdown: true,
    };
  }

  if (lowerInput.includes("siapa nama") || lowerInput.includes("apa nama")) {
    return {
      text: `Nama saya **${aiData.name}**, versi ${aiData.version}. Saya dibuat oleh **${aiData.creator}**. Senang bertemu dengan Anda! ✨`,
      isMarkdown: true,
    };
  }

  if (
    lowerInput.includes("yang membuat") ||
    lowerInput.includes("pencipta") ||
    lowerInput.includes("tim")
  ) {
    return {
      text: `**Tim Pengembang ${aiData.name}:**\n\n${aiData.team
        .map((m) => `- **${m.name}** (${m.role}) - ${m.description}`)
        .join("\n")}`,
      isMarkdown: true,
    };
  }

  if (lowerInput.includes("ski 2.0")) {
    return {
      text: `**${aiData.version}** adalah versi terbaru dari ${
        aiData.name
      }, dengan fitur:\n${aiData.features.map((f) => `  - ${f}`).join("\n")}`,
      isMarkdown: true,
    };
  }

  if (lowerInput.includes("rahmat mulia")) {
    const rahmat = aiData.team[0];
    return {
      text: `**${rahmat.name}** adalah ${rahmat.role} di balik ${aiData.name}. ${rahmat.description} Beliau menciptakan saya pada ${aiData.creationDate}.`,
      isMarkdown: true,
    };
  }

  if (
    lowerInput.includes("fitur") ||
    lowerInput.includes("apa yang bisa kamu lakukan")
  ) {
    return {
      text: `**Fitur Unggulan ${aiData.name}:**\n${aiData.features
        .map((f) => `- ${f}`)
        .join("\n")}\n\n*Cobalah tanyakan sesuatu yang spesifik!*`,
      isMarkdown: true,
    };
  }

  if (lowerInput.includes("tanggal") || lowerInput.includes("hari ini")) {
    return {
      text: `📅 Hari ini tanggal **${aiData.getCurrentDate()}**`,
      isMarkdown: true,
    };
  }

  if (
    lowerInput.includes("bantu saya coding") ||
    lowerInput.includes("contoh kode")
  ) {
    return {
      text: "**Contoh Kode JavaScript (Faktorial):**\n```javascript\nfunction factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n - 1);\n}\n\nconsole.log(factorial(5)); // Output: 120\n```\n\n*Butuh contoh bahasa lain? Coba tanya!*",
      isMarkdown: true,
    };
  }

  return await fetchExternalApi(input);
}

async function fetchExternalApi(input) {
  try {
    const response = await fetch(
      "https://small-union-fb5c.rahmatyoung10.workers.dev/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro-exp-03-25:free",
          messages: [{ role: "user", content: input }],
          format: "markdown", // Minta response dalam format markdown
        }),
      }
    );

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    const rawText =
      data.choices?.[0]?.message?.content ||
      "Maaf, terjadi kesalahan dalam memproses permintaan Anda.";

    return {
      text: rawText + "\n\n*— Powered by SkiAI*",
      isMarkdown: true, // Asumsikan API selalu return markdown
    };
  } catch (error) {
    return {
      text: `**⚠️ Gangguan Koneksi**\n\nSaya tidak bisa terhubung ke server. Silakan coba lagi nanti.\n\n*Detail:* ${error.message}`,
      isMarkdown: true,
    };
  }
}

// UI Functions (dimodifikasi untuk styling lebih baik)
function addMessage(text, role, isMarkdown = false) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `mb-3 max-w-[90%] ${
    role === "user" ? "ml-auto" : "mr-auto"
  }`;

  const bubble = document.createElement("div");
  bubble.className = `px-4 py-3 rounded-2xl ${
    role === "user"
      ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
      : "bg-gray-800 text-gray-100"
  }`;

  if (isMarkdown) {
    bubble.innerHTML = marked.parse(text);
    // Terapkan styling tambahan untuk elemen markdown
    bubble.querySelectorAll("pre").forEach((el) => {
      el.className = "bg-gray-900 rounded-lg p-3 my-2 overflow-x-auto text-sm";
    });
    bubble.querySelectorAll("code").forEach((el) => {
      if (!el.parentElement.matches("pre")) {
        el.className = "bg-gray-700 px-1.5 py-0.5 rounded text-sm";
      }
    });
    bubble.querySelectorAll("ul, ol").forEach((el) => {
      el.className = "list-disc pl-5 my-2 space-y-1";
    });
    bubble.querySelectorAll("strong").forEach((el) => {
      el.className = "font-semibold text-white";
    });
  } else {
    bubble.textContent = text;
  }

  messageDiv.appendChild(bubble);
  elements.chatContainer.appendChild(messageDiv);
  scrollToBottom();
}

// Fungsi typeMessage yang dimodifikasi
async function typeMessage(text, role, isMarkdown = false) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `mb-3 max-w-[90%] ${
    role === "user" ? "ml-auto" : "mr-auto"
  }`;

  const bubble = document.createElement("div");
  bubble.className = `px-4 py-3 rounded-2xl ${
    role === "user"
      ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
      : "bg-gray-800 text-gray-100"
  }`;

  messageDiv.appendChild(bubble);
  elements.chatContainer.appendChild(messageDiv);

  let currentText = "";
  for (let i = 0; i < text.length && !state.stopTyping; i++) {
    currentText = text.substring(0, i + 1);
    if (isMarkdown) {
      bubble.innerHTML = marked.parse(currentText);
      // Terapkan styling untuk elemen markdown
      bubble.querySelectorAll("pre").forEach((el) => {
        el.className =
          "bg-gray-900 rounded-lg p-3 my-2 overflow-x-auto text-sm";
      });
    } else {
      bubble.textContent = currentText;
    }
    await sleep(20);
    scrollToBottom();
  }
}

// Fungsi lainnya tetap sama...

// UI Functions
function toggleSendButton(isStop) {
  elements.sendButton.innerHTML = isStop
    ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13" /><path d="M22 2L15 22l-4-9-9-4 20-7z" /></svg>`;
  elements.sendButton.classList.toggle("text-red-400", isStop);
  elements.sendButton.classList.toggle("hover:text-red-500", isStop);
  elements.sendButton.classList.toggle("text-gray-400", !isStop);
  elements.sendButton.classList.toggle("hover:text-blue-400", !isStop);
}

function stopMessage() {
  state.stopTyping = true;
  state.isProcessing = false;
  toggleSendButton(false);
}

function addMessage(text, role, isMarkdown = false) {
  const messageDiv = createElement("div", [
    "mb-2",
    "max-w-[95%]",
    "px-3",
    "py-2",
    "rounded-xl",
    "text-white",
    role === "user" ? "bg-dark-600" : "",
    role === "user" ? "self-end" : "self-start",
  ]);
  const contentDiv = createElement("div", ["message-bubble"]);
  contentDiv.innerHTML = isMarkdown ? marked.parse(text) : text;
  messageDiv.appendChild(contentDiv);
  elements.chatContainer.appendChild(messageDiv);
  if (isMarkdown) applyMarkdownStyles(contentDiv);
  scrollToBottom();
}

async function typeMessage(text, role, isMarkdown = false) {
  const messageDiv = createElement("div", [
    "mb-2",
    "max-w-[95%]",
    "self-start",
    "text-white",
  ]);
  const contentDiv = createElement("div", ["message-bubble"]);
  messageDiv.appendChild(contentDiv);
  elements.chatContainer.appendChild(messageDiv);

  let currentText = "";
  for (let i = 0; i < text.length && !state.stopTyping; i++) {
    currentText = text.substring(0, i + 1);
    contentDiv.innerHTML = isMarkdown ? marked.parse(currentText) : currentText;
    if (isMarkdown) applyMarkdownStyles(contentDiv);
    await sleep(isMarkdown ? 2 : 8);
    scrollToBottom();
  }
  if (state.stopTyping)
    contentDiv.innerHTML = isMarkdown ? marked.parse(currentText) : currentText;
}

function addLoadingIndicator() {
  const messageDiv = createElement("div", [
    "mb-2",
    "max-w-[95%]",
    "self-start",
  ]);
  const dotsContainer = createElement("div", [
    "bg-dark-700",
    "px-3",
    "py-2",
    "rounded-xl",
  ]);
  dotsContainer.innerHTML = `
    <div class="flex space-x-1">
      <div class="w-2 h-2 bg-dark-300 rounded-full animate-typing-pulse"></div>
      <div class="w-2 h-2 bg-dark-300 rounded-full animate-typing-pulse" style="animation-delay: 0.2s;"></div>
      <div class="w-2 h-2 bg-dark-300 rounded-full animate-typing-pulse" style="animation-delay: 0.4s;"></div>
    </div>`;
  messageDiv.appendChild(dotsContainer);
  elements.chatContainer.appendChild(messageDiv);
  scrollToBottom();
  return Date.now();
}

function removeLoadingIndicator() {
  const lastLoading = elements.chatContainer.querySelector(
    ".flex.space-x-1:last-child"
  );
  if (lastLoading) lastLoading.parentNode.parentNode.remove();
}

function applyMarkdownStyles(contentDiv) {
  contentDiv
    .querySelectorAll("pre")
    .forEach((pre) =>
      pre.classList.add(
        "bg-black",
        "rounded-md",
        "p-4",
        "my-3",
        "overflow-x-auto",
        "text-white"
      )
    );
  contentDiv.querySelectorAll("code").forEach((code) => {
    if (code.parentElement.tagName !== "PRE")
      code.classList.add("bg-black", "px-1", "py-0.5", "rounded", "text-white");
  });
  contentDiv.querySelectorAll("p").forEach((p) => p.classList.add("my-2"));
}

// Utility Functions
function createElement(tag, classes) {
  const element = document.createElement(tag);
  element.classList.add(...classes.filter(Boolean));
  return element;
}

function scrollToBottom() {
  elements.chatContainer.scrollTop = elements.chatContainer.scrollHeight;
}

function removeInitialMessage() {
  const initialMessage = elements.chatContainer.querySelector(".text-center");
  if (initialMessage) initialMessage.remove();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

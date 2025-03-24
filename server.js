const chatContainer = document.getElementById("chatContainer");
const userInput = document.getElementById("userInput");
let isProcessing = false;

// Handle Enter key to send message
userInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

async function sendMessage() {
  const input = userInput.value.trim();
  if (!input || isProcessing) return;

  // Remove initial greeting
  const initialMessage = document.querySelector(".text-center");
  if (initialMessage) initialMessage.remove();

  // Add user message
  addMessage(input, "user");
  userInput.value = "";
  isProcessing = true;

  // Add loading indicator
  const loadingId = addLoadingIndicator();

  try {
    const response = await fetch(
      "https://small-union-fb5c.rahmatyoung10.workers.dev/", // Ganti dengan URL Cloudflare Worker
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-001",
          messages: [{ role: "user", content: input }],
        }),
      }
    );

    const data = await response.json();
    removeLoadingIndicator(loadingId);

    const botMessage =
      data.choices?.[0]?.message?.content ||
      "Maaf, SkiAI mengalami kesalahan saat memproses permintaan Anda.";
    await typeMessage(botMessage, "bot", true);
  } catch (error) {
    removeLoadingIndicator(loadingId);
    addMessage("Error: " + error.message, "bot");
  }

  isProcessing = false;
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Function to simulate typing effect
async function typeMessage(text, role, isMarkdown = false) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("mb-4");

  const messageBubble = document.createElement("div");
  messageBubble.classList.add(
    "bg-dark-700",
    "text-white",
    "rounded-xl",
    "px-4",
    "py-3",
    "max-w-[80%]",
    "inline-block"
  );

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("prose", "prose-invert", "max-w-none");
  messageBubble.appendChild(contentDiv);

  messageDiv.appendChild(messageBubble);
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  if (isMarkdown) {
    const parsedText = marked.parse(text);
    let currentText = "";

    for (let i = 0; i < text.length; i++) {
      currentText = text.substring(0, i + 1);
      contentDiv.innerHTML = marked.parse(currentText);
      await new Promise((resolve) => setTimeout(resolve, 5));
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    applyMarkdownStyles(contentDiv);
  } else {
    let currentText = "";

    for (let i = 0; i < text.length; i++) {
      currentText += text[i];
      contentDiv.textContent = currentText;
      await new Promise((resolve) => setTimeout(resolve, 20));
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add(
    "flex",
    "justify-end",
    "mt-2",
    "opacity-0",
    "group-hover:opacity-100",
    "transition-opacity"
  );

  const copyButton = document.createElement("button");
  copyButton.classList.add(
    "text-dark-300",
    "hover:text-white",
    "p-1",
    "rounded"
  );

  copyButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
    </svg>
  `;

  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(text);
    copyButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
    `;
    setTimeout(() => {
      copyButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
        </svg>
      `;
    }, 2000);
  });

  actionsDiv.appendChild(copyButton);
  messageBubble.appendChild(actionsDiv);
  messageBubble.classList.add("group");
}

function addMessage(text, role, isMarkdown = false) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(
    "mb-4",
    role === "user" ? "text-right" : "text-left"
  );

  const messageBubble = document.createElement("div");

  if (role === "user") {
    messageBubble.classList.add(
      "bg-dark-600", // Diganti dari bg-blue-600
      "text-white",
      "rounded-full", // Sudut benar-benar bulat
      "px-4",
      "py-3",
      "max-w-[80%]",
      "inline-block"
    );
  } else {
    messageBubble.classList.add(
      "bg-dark-5000",
      "text-white",
      "rounded-xl",
      "px-4",
      "py-3",
      "max-w-[80%]",
      "inline-block"
    );
  }

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("prose", "prose-invert", "max-w-none");

  if (isMarkdown) {
    contentDiv.innerHTML = marked.parse(text);
    applyMarkdownStyles(contentDiv);
  } else {
    contentDiv.textContent = text;
  }

  messageBubble.appendChild(contentDiv);
  messageDiv.appendChild(messageBubble);
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function applyMarkdownStyles(contentDiv) {
  contentDiv.querySelectorAll("pre").forEach((pre) => {
    pre.classList.add(
      "bg-dark-1000",
      "rounded-md",
      "p-4",
      "my-3",
      "overflow-x-auto"
    );
  });

  contentDiv.querySelectorAll("code").forEach((code) => {
    if (code.parentElement.tagName !== "PRE") {
      code.classList.add("px-1", "py-0.5", "rounded", "bg-dark-1000");
    }
  });

  contentDiv.querySelectorAll("a").forEach((a) => {
    a.classList.add("text-blue-400", "hover:underline");
  });

  contentDiv.querySelectorAll("ul, ol").forEach((list) => {
    list.classList.add("my-3", "ml-5");
  });

  contentDiv.querySelectorAll("li").forEach((item) => {
    item.classList.add("my-1");
  });

  contentDiv.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
    heading.classList.add(
      "font-semibold",
      "rounded-full", // Sudut benar-benar bulat
      "text-white",
      "mt-4",
      "mb-2"
    );
  });

  contentDiv.querySelectorAll("p").forEach((p) => {
    p.classList.add("my-2");
  });

  contentDiv.querySelectorAll("table").forEach((table) => {
    table.classList.add("border-collapse", "my-4", "w-full");
    table.classList.add("border", "border-dark-600");

    const wrapper = document.createElement("div");
    wrapper.classList.add("overflow-x-auto", "my-4");
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });

  contentDiv.querySelectorAll("th, td").forEach((cell) => {
    cell.classList.add("border", "border-dark-1000", "px-4", "py-2");
  });

  contentDiv.querySelectorAll("th").forEach((header) => {
    header.classList.add("bg-dark-800");
  });

  contentDiv.querySelectorAll("img").forEach((img) => {
    img.classList.add("max-w-full", "h-auto", "rounded-md", "my-3");
  });

  contentDiv.querySelectorAll("blockquote").forEach((quote) => {
    quote.classList.add(
      "border-l-4",
      "border-dark-1000",
      "pl-4",
      "italic",
      "my-4",
      "text-dark-200"
    );
  });
}

function addLoadingIndicator() {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("mb-4");

  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add(
    "bg-dark-1000",
    "px-4",
    "py-3",
    "rounded-full", // Sudut benar-benar bulat
    "inline-block",
    "max-w-[80%]"
  );

  const dotsDiv = document.createElement("div");
  dotsDiv.classList.add("flex", "space-x-1");

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("div");
    dot.classList.add(
      "w-2",
      "h-2",
      "bg-dark-300",
      "rounded-full",
      "animate-typing-pulse"
    );
    if (i === 1) dot.style.animationDelay = "0.2s";
    if (i === 2) dot.style.animationDelay = "0.4s";
    dotsDiv.appendChild(dot);
  }

  dotsContainer.appendChild(dotsDiv);
  messageDiv.appendChild(dotsContainer);
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  return Date.now();
}

function removeLoadingIndicator(id) {
  const loadingElements = document.querySelectorAll(".flex.space-x-1");
  if (loadingElements.length > 0) {
    loadingElements[loadingElements.length - 1].parentNode.parentNode.remove();
  }
}

window.onload = function () {
  userInput.focus();
};
// Ambil elemen tombol
const sendButton = document.getElementById("sendButton");

// Pastikan tombol bisa digunakan untuk mengirim pesan
sendButton.addEventListener("click", function () {
  sendMessage();
});

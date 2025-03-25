const chatContainer = document.getElementById("chatContainer");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const suggestionButtons = document.querySelectorAll(".suggestion");
let isProcessing = false;

// Simulasi data AI dan tim pengembang
const aiData = {
  name: "Skia",
  version: "Ski 2.0",
  creator: "Rahmat Mulia",
  creationDate: "15 Januari 2023",
  team: [
    {
      name: "Rahmat Mulia",
      role: "Lead Developer",
      description: "Seorang inovator teknologi yang visioner.",
    },
  ],
  features: [
    "Respon cepat dengan efek ketik",
    "Dukungan Markdown untuk kode",
    "Percakapan interaktif",
    "Simulasi AI cerdas",
    "Penyesuaian bahasa alami",
  ],
  currentDate: new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
};

// Event listener untuk tombol Enter
userInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

// Event listener untuk tombol Send
sendButton.addEventListener("click", sendMessage);

// Event listener untuk tombol saran
suggestionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    userInput.value = button.textContent;
    sendMessage();
  });
});

// Fungsi utama untuk mengirim pesan
async function sendMessage() {
  const input = userInput.value.trim();
  if (!input || isProcessing) return;

  // Hapus pesan awal jika ada
  const initialMessage = document.querySelector(".text-center");
  if (initialMessage) initialMessage.remove();

  // Tambahkan pesan pengguna
  addMessage(input, "user");
  userInput.value = "";
  isProcessing = true;

  // Tambahkan indikator loading
  const loadingId = addLoadingIndicator();

  try {
    let responseText = "";
    let isMarkdown = false;

    // Simulasi respons untuk pertanyaan tertentu
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes("siapa nama") || lowerInput.includes("apa nama")) {
      responseText = `Nama saya ${aiData.name}, versi ${aiData.version}. Saya dibuat oleh ${aiData.creator} bersama timnya. Senang bertemu dengan Anda! Bagaimana saya bisa membantu Anda hari ini?`;
    } else if (
      lowerInput.includes("yang membuat") ||
      lowerInput.includes("pencipta") ||
      lowerInput.includes("tim")
    ) {
      responseText = `Saya diciptakan oleh ${
        aiData.creator
      }, seorang Developer hebat, : \n- ${aiData.team
        .map(
          (member) => `${member.name} (${member.role}) - ${member.description}`
        )
        .join(
          "\n- "
        )}\nSeorang yang sangat berbakat dan berdedikasi untuk membuat saya, ${
        aiData.name
      } ${aiData.version}, menjadi asisten AI yang membantu!`;
    } else if (lowerInput.includes("ski 2.0")) {
      responseText = `${aiData.version} adalah versi saya, ${aiData.name}. Saya dirancang oleh ${aiData.creator} dan timnya untuk memberikan jawaban cepat, mendukung Markdown, dan membantu dalam berbagai tugas. Coba tanyakan apa saja!`;
    } else if (lowerInput.includes("rahmat mulia")) {
      const rahmat = aiData.team.find(
        (member) => member.name === "Rahmat Mulia"
      );
      responseText = `${rahmat.name} adalah ${rahmat.role} saya, ${aiData.name}. Dia adalah ${rahmat.description} Dia memimpin proyek ini sejak ${aiData.creationDate}.`;
    } else if (lowerInput.includes("aditya pratama")) {
      const aditya = aiData.team.find(
        (member) => member.name === "Aditya Pratama"
      );
      responseText = `${aditya.name} adalah ${aditya.role} dalam tim saya, ${aiData.name}. Dia adalah ${aditya.description}`;
    } else if (lowerInput.includes("siti nurhaliza")) {
      const siti = aiData.team.find(
        (member) => member.name === "Siti Nurhaliza"
      );
      responseText = `${siti.name} adalah ${siti.role} dalam tim saya, ${aiData.name}. Dia adalah ${siti.description}`;
    } else if (lowerInput.includes("budi santoso")) {
      const budi = aiData.team.find((member) => member.name === "Budi Santoso");
      responseText = `${budi.name} adalah ${budi.role} dalam tim saya, ${aiData.name}. Dia adalah ${budi.description}`;
    } else if (
      lowerInput.includes("ganteng") ||
      lowerInput.includes("cantik") ||
      lowerInput.includes("pribadi")
    ) {
      const personName = aiData.team.some((member) =>
        lowerInput.includes(member.name.toLowerCase())
      )
        ? aiData.team.find((member) =>
            lowerInput.includes(member.name.toLowerCase())
          ).name
        : null;

      if (personName) {
        responseText = `Tentu saja, ${personName} sangat menarik! Selain berbakat dalam pekerjaannya, dia juga memiliki kepribadian yang luar biasa dan pesona yang memikat.`;
      } else {
        responseText = `Hmm, saya rasa semua tim saya sangat menarik! ${aiData.team
          .map((member) => `${member.name}`)
          .join(", ")} semuanya memiliki pesona dan bakat yang luar biasa.`;
      }
    } else if (
      lowerInput.includes("fitur") ||
      lowerInput.includes("apa yang bisa kamu lakukan")
    ) {
      responseText = `Saya memiliki beberapa fitur keren:\n- ${aiData.features.join(
        "\n- "
      )}\nCoba tanyakan apa saja untuk melihat saya beraksi!`;
    } else if (
      lowerInput.includes("tanggal") ||
      lowerInput.includes("hari ini")
    ) {
      responseText = `Hari ini adalah ${aiData.currentDate}. Apa yang bisa saya bantu lebih lanjut?`;
    } else if (
      lowerInput.includes("bantu saya coding") ||
      lowerInput.includes("contoh kode")
    ) {
      responseText =
        "Tentu! Berikut adalah contoh kode JavaScript sederhana untuk menghitung faktorial:\n```javascript\nfunction factorial(n) {\n    if (n === 0) return 1;\n    return n * factorial(n - 1);\n}\nconsole.log(factorial(5)); // Output: 120\n```\nApakah Anda ingin contoh lain atau bantuan spesifik?";
      isMarkdown = true;
    } else {
      // Panggil API eksternal untuk pertanyaan lain
      const response = await fetch(
        "https://small-union-fb5c.rahmatyoung10.workers.dev/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "google/gemini-2.0-flash-001",
            messages: [{ role: "user", content: input }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      responseText =
        data.choices?.[0]?.message?.content ||
        "Maaf, Skia mengalami kesalahan saat memproses permintaan Anda.";
      isMarkdown = responseText.includes("```"); // Deteksi Markdown berdasarkan kode
    }

    removeLoadingIndicator(loadingId);
    await typeMessage(responseText, "bot", isMarkdown);
  } catch (error) {
    removeLoadingIndicator(loadingId);
    await typeMessage(`Error: ${error.message}`, "bot", false);
  } finally {
    isProcessing = false;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}

// Fungsi untuk menambahkan pesan
function addMessage(text, role, isMarkdown = false) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add(
    "mb-2",
    "max-w-[95%]",
    "px-3",
    "py-2",
    "rounded-xl",
    "text-white",
    role === "user" ? "bg-dark-600" : "",
    role === "user" ? "self-end" : "self-start"
  );

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("message-bubble");
  contentDiv.innerHTML = isMarkdown ? marked.parse(text) : text;

  messageDiv.appendChild(contentDiv);
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  if (isMarkdown) applyMarkdownStyles(contentDiv);
}

// Fungsi untuk efek ketik dengan Markdown langsung rapi
async function typeMessage(text, role, isMarkdown = false) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("mb-2", "max-w-[95%]", "self-start", "text-white");

  const contentDiv = document.createElement("div");
  contentDiv.classList.add("message-bubble");
  messageDiv.appendChild(contentDiv);
  chatContainer.appendChild(messageDiv);

  if (isMarkdown) {
    let currentText = "";
    for (let i = 0; i < text.length; i++) {
      currentText = text.substring(0, i + 1);
      contentDiv.innerHTML = marked.parse(currentText);
      applyMarkdownStyles(contentDiv);
      await new Promise((resolve) => setTimeout(resolve, 2));
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  } else {
    let currentText = "";
    for (let i = 0; i < text.length; i++) {
      currentText += text[i];
      contentDiv.textContent = currentText;
      await new Promise((resolve) => setTimeout(resolve, 8));
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }
}

// Fungsi untuk indikator loading
function addLoadingIndicator() {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("mb-2", "max-w-[95%]", "self-start");

  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("bg-dark-700", "px-3", "py-2", "rounded-xl");
  dotsContainer.innerHTML = `
        <div class="flex space-x-1">
            <div class="w-2 h-2 bg-dark-300 rounded-full animate-typing-pulse"></div>
            <div class="w-2 h-2 bg-dark-300 rounded-full animate-typing-pulse" style="animation-delay: 0.2s;"></div>
            <div class="w-2 h-2 bg-dark-300 rounded-full animate-typing-pulse" style="animation-delay: 0.4s;"></div>
        </div>
    `;

  messageDiv.appendChild(dotsContainer);
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
  return Date.now();
}

// Fungsi untuk menghapus indikator loading
function removeLoadingIndicator(id) {
  const loadingElements = document.querySelectorAll(".flex.space-x-1");
  if (loadingElements.length > 0) {
    loadingElements[loadingElements.length - 1].parentNode.parentNode.remove();
  }
}

// Fungsi untuk mengaplikasikan gaya Markdown
function applyMarkdownStyles(contentDiv) {
  contentDiv.querySelectorAll("pre").forEach((pre) => {
    pre.classList.add(
      "bg-black",
      "rounded-md",
      "p-4",
      "my-3",
      "overflow-x-auto",
      "text-white"
    );
  });
  contentDiv.querySelectorAll("code").forEach((code) => {
    if (code.parentElement.tagName !== "PRE") {
      code.classList.add("bg-black", "px-1", "py-0.5", "rounded", "text-white");
    }
  });
  contentDiv.querySelectorAll("p").forEach((p) => p.classList.add("my-2"));
}

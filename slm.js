const worldFacts = {
  earth: "Earth is the third planet from the Sun and about 71% of it is covered by water.",
  moon: "The Moon orbits Earth roughly every 27.3 days.",
  ai: "Artificial intelligence means software that can learn patterns and make decisions.",
  internet: "The internet is a global network connecting billions of devices.",
  history: "Written history covers around 5,000 years of human civilization.",
  ocean: "The Pacific Ocean is the largest and deepest ocean on Earth.",
  health: "Sleep, hydration, movement, and balanced food are core health basics.",
  coding: "Programming is mostly problem-solving, then expressing the solution in code.",
  math: "Mathematics is a language for patterns, quantities, and logical relationships.",
  space: "Space is nearly a vacuum and contains galaxies, stars, planets, and more."
};

const defaultReplies = [
  "I am SLM: local-only, tiny, and improving. Ask me to explain something simple.",
  "Interesting question. I use lightweight rules plus tiny text generation.",
  "I may not be perfect, but I can still reason through short prompts.",
  "Want a concise answer or a step-by-step explanation?"
];

const tinyCorpus = [
  "learning never stops when curiosity is active",
  "small systems can still produce useful ideas",
  "clear questions usually create better answers",
  "practice and feedback improve coding skills",
  "world knowledge grows through observation and discussion",
  "simple tools become powerful when used consistently"
];

function buildBigramModel(corpus) {
  const model = new Map();
  for (const line of corpus) {
    const words = line.toLowerCase().split(/\s+/).filter(Boolean);
    for (let i = 0; i < words.length - 1; i++) {
      const w = words[i];
      const next = words[i + 1];
      if (!model.has(w)) model.set(w, []);
      model.get(w).push(next);
    }
  }
  return model;
}

function generateText(model, seedWord, maxWords = 16) {
  const words = [seedWord];
  let current = seedWord;

  for (let i = 1; i < maxWords; i++) {
    const options = model.get(current);
    if (!options?.length) break;
    current = options[Math.floor(Math.random() * options.length)];
    words.push(current);
  }

  return words.join(" ");
}

const bigramModel = buildBigramModel(tinyCorpus);

function pickFact(input) {
  const text = input.toLowerCase();
  const key = Object.keys(worldFacts).find((k) => text.includes(k));
  return key ? worldFacts[key] : null;
}

function slmReply(input) {
  const cleaned = input.trim();
  if (!cleaned) return "Please type a message so I can respond.";

  const fact = pickFact(cleaned);
  if (fact) {
    return `${fact}\n\n(From SLM world knowledge.)`;
  }

  const firstWord = cleaned.toLowerCase().split(/\s+/)[0];
  const generated = generateText(bigramModel, firstWord);

  if (generated.split(" ").length > 3) {
    return `I think about that like this: ${generated}.`;
  }

  return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
}

const chat = document.getElementById("chat");
const form = document.getElementById("composer");
const promptInput = document.getElementById("prompt");
const tpl = document.getElementById("message-template");

function addMessage(role, content) {
  const node = tpl.content.firstElementChild.cloneNode(true);
  node.classList.add(role);
  node.querySelector(".role").textContent = role;
  node.querySelector(".content").textContent = content;
  chat.append(node);
  chat.scrollTop = chat.scrollHeight;
}

addMessage("assistant", "Hi! I'm SLM. I run in your browser and use no external APIs.");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userText = promptInput.value;
  addMessage("user", userText);
  promptInput.value = "";

  const reply = slmReply(userText);
  setTimeout(() => addMessage("assistant", reply), 180);
});

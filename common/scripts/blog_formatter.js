function updateClasses(elements, classes) {
  elements.forEach((e) => classes.forEach((c) => e.classList.add(c)));
}

const articleBody = document.getElementById("article-body");

const tagsFormat = {
  h1: ["container", "text-center", "font-semibold", "text-3xl", "my-2"],
  h2: ["container", "text-center", "font-semibold", "text-2xl", "my-2"],
  h3: ["container", "text-center", "font-semibold", "text-xl", "my-2"],
  p: ["container", "py-2", "text-justify"],
  a: ["underline", "decoration-2"],
  ul: ["container", "list-disc", "list-inside", "text-justify"],
  ol: ["container", "list-decimal", "list-inside", "text-justify"],
  img: ["container"],
};

[...articleBody.getElementsByClassName("MathJax")].forEach((e) => {
  const width = e.attributes["width"]?.value;
  if (width == "full") {
    e.innerHTML = '<div class="math-display">' + e.innerHTML + "</div>";
  } else {
    e.innerHTML = '<span class="math-inline">' + e.innerHTML + "</span>";
  }
});

const classFormat = {
  "math-display": ["container", "overflow-y-scroll"],
  "math-inline": ["inline-block", "h-full", "align-middle"],
};

Object.entries(tagsFormat).forEach(([key, classes]) => {
  const elements = [...articleBody.getElementsByTagName(key)];
  updateClasses(elements, classes);
});

Object.entries(classFormat).forEach(([key, classes]) => {
  const elements = [...articleBody.getElementsByClassName(key)];
  updateClasses(elements, classes);
});

// Centred formulas
[...articleBody.getElementsByClassName("math-display")].forEach((f) =>
  updateClasses(
    [...f.getElementsByTagName("svg")],
    ["container", "w-full", "h-full", "max-w-full"],
  ),
);

// Images
[...articleBody.getElementsByTagName("em")].forEach((e) => {
  if (e.parentElement.firstChild.tagName == "IMG") {
    e.classList.add("text-sm");
    e.parentElement.classList.replace("text-justify", "text-center");
    e.parentElement.classList.remove("container");
    e.parentElement.classList.add("max-w-[75%]");
    e.parentElement.classList.add("md:max-w-[50%]");
    e.parentElement.classList.add("mx-auto");
  }
});

// Mermaid
[...articleBody.getElementsByTagName("svg")].forEach((e) => {
  if (e.id.startsWith("mermaid")) {
    e.outerHTML = '<div class="mermaid-container">' + e.outerHTML + "</div>";
  }
});

[...articleBody.getElementsByClassName("mermaid-container")].forEach((e) => {
  e.classList.add("container");
  e.classList.add("w-fit");
});

export function update_classes(tag, classes, id = "") {
  const target = id == "" ? document : document.getElementById(id);
  const elements = [...target.getElementsByTagName(tag)];
  elements.map((e) => {
    classes.map((c) => {
      e.classList.add(c);
    });
  });
}

export function bookShelfLabel(id: string) {
  if (id === "toRead") {
    return "읽을 책";
  } else if (id === "reading") {
    return "읽고 있는 책";
  }
  return "다 읽은 책";
}

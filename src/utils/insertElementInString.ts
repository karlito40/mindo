export function insertElementInString(
  s: string,
  element: string,
  atIndex: number
) {
  return s.substring(0, atIndex) + element + s.substring(atIndex);
}

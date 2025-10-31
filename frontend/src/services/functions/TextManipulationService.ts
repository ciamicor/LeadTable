export function titleCase(w: string): string {
  return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
}

// TODO - function should more properly format name casing
//  including strings like 'McDonald', 'Ph.D.', etc.
export function formatName_TitleCase(w: string): string {
  return w
}

export function removeSpecialChars(s: string): string {
  return s.replace(/[^a-zA-Z0-9\- ]/g, "");
}

export function formatSlug(s: string): string {
  const clean1 = removeSpecialChars(s)
  let clean2 = clean1
    .trim()
    .replace(/\s/g, "-")
    .replace(/-+/g, '-')
    .toLowerCase()
  if (clean2.charAt(clean2.length - 1) === '-') {
    return clean2.substring(0, clean2.length - 1)
  }
  else return clean2
}

export function toTitleCase_Service(str: string): string {
  return str.replace(
    /\w\S*/g,
    (text: String) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  )
}

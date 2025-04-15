export function toTitleCase_Service(str: string): string {
  return str.replace(
    /\w\S*/g,
    (text: String) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  )
}

export function textSlicer (string: string, len: number) {
  return string.length > len ? `${string.substring(0, len)} ..` : string
}

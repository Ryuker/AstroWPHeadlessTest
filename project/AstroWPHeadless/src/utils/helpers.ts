export async function replaceAsync(string, regexp, replacerFunction) {
  const replacements = await Promise.all(
      Array.from(string.matchAll(regexp),
          match => replacerFunction(...match)));
  let i = 0;
  return string.replace(regexp, () => replacements[i++]);
}

// split string  at regex match
export function splitString(text: string, match: RegExp){
  const splitStringArr = text.split(match);
  return splitStringArr;
}
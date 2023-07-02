export function activeLink(path: string, pathname: string) {
  const regex = new RegExp(`^${path}(\/.*)?$`);
  return regex.test(pathname);
}

export function GenerateID(prefix: string) {
  const randomDigits = Array(8)
    .fill(0)
    .map((e, i) => (e = (Math.random() * 10) | 0));
  return prefix + randomDigits.join("");
}

export const convertCamelCaseToNormal = (camelCaseString:string) => {
  return camelCaseString
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
};

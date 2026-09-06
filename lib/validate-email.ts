// The WHATWG HTML Living Standard's email regex (the same one browsers use
// to validate <input type="email">). Rejects things like double dots,
// leading/trailing dots, and malformed domains — much stricter than a bare
// "has an @ and a dot" check, while still accepting every real-world email
// shape without needing a network round-trip (MX lookup / send-a-code flow).
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email);
}

export function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@(student\.ku\.edu\.np|ku\.edu\.np)$/;
  return emailRegex.test(email);
}

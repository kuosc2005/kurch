export function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@(student\.ku\.edu\.np|ku\.edu\.np)$/;
  return emailRegex.test(email);
}

export function isStrongPassword(password: string): boolean {
  const minLength = 8;
  if (password.length < minLength) return false;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
}


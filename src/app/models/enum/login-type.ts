export const enum LoginType {
  Email = 1,
  Mobile = 2
}

export function loginTypeFromIndex(index: number): string {
  switch (index) {
    case LoginType.Mobile: return 'Mobile'
    case LoginType.Email: return 'Email'
  }
}


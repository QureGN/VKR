export function getTokenFromCookie(): string | null {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith(`jwt_token=`));
    const token = tokenCookie ? tokenCookie.split('=')[1] : null;
    return token;
  }
export const checkPublicPage = (path: string)=> {
    if(path === '/login' || path === '/register' || path.includes('/verify-email')) {
        return true;
    }
    return false; 
} 
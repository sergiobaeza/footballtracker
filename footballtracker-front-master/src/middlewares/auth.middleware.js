

export function requireNotLogged(to, from) {
    if (localStorage.getItem('user')) return { path: "/" };
}

export function requireLogged(to, from) {
    if (!localStorage.getItem('user')) return { path: "/" };
}
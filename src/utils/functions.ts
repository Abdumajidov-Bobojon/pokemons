export const getFromStorage = (name: string) => {
    return localStorage.getItem(name)
        ? JSON.parse(localStorage.getItem(name) || "")
        : null
}
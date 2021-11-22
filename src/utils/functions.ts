export const getFromStorage = (name: string) => {
    return sessionStorage.getItem(name)
        ? JSON.parse(sessionStorage.getItem(name) || "")
        : null
}
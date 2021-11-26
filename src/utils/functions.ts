export const getFromStorage = (name: string, returnVal: null | []) => {
    return sessionStorage.getItem(name)
        ? JSON.parse(sessionStorage.getItem(name) || "")
        : returnVal
}

export const handleSessionStorage = (val: any, sessionName: string) => {
    if (val === null || val.length === 0) {
        sessionStorage.removeItem(sessionName)
    } else {
        sessionStorage.setItem(sessionName, JSON.stringify(val))
    }
}
export function randomInt(min: number = Number.MIN_SAFE_INTEGER, max: number = Number.MAX_SAFE_INTEGER) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomDouble(min: number = Number.MIN_SAFE_INTEGER, max: number = Number.MAX_SAFE_INTEGER) {
    return min + Math.random() * (max - min);
}

export function generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
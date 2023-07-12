/**
 * A Map() wrapper that makes it work with case-insensitive keys.
 */
export class CaseInsensitiveMap {
    constructor(entries) {
        this.map = new Map();

        if (entries) {
            if (typeof entries[Symbol.iterator] !== 'function') {
                throw new Error('Invalid entries; expected an iterable.');
            }

            for (const [key, value] of entries) {
                const lowercaseKey = key.toLowerCase();
                this.map.set(lowercaseKey, { key, value });
            }
        }
    }
  
    set(key, value) {
        const lowercaseKey = key.toLowerCase();
        this.map.set(lowercaseKey, { key, value });
    }
  
    get(key) {
        const lowercaseKey = key.toLowerCase();
        const entry = this.map.get(lowercaseKey);
        return entry ? entry.value : undefined;
    }
  
    has(key) {
        const lowercaseKey = key.toLowerCase();
        return this.map.has(lowercaseKey);
    }
}
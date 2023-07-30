/**
 * A Map() wrapper that makes it work with case-insensitive keys.
 */
export class CaseInsensitiveMap<K, V> {
    private map: Map<string, { key: K; value: V }>;

    constructor(entries?: Iterable<[K, V]>) {
        this.map = new Map();

        if (entries) {
            if (typeof entries[Symbol.iterator] !== 'function') {
                throw new Error('Invalid entries; expected an iterable.');
            }

            for (const [key, value] of entries) {
                const lowercaseKey = this.getKeyInLowerCase(key);
                this.map.set(lowercaseKey, { key, value });
            }
        }
    }

    set(key: K, value: V) {
        const lowercaseKey = this.getKeyInLowerCase(key);
        this.map.set(lowercaseKey, { key, value });
    }

    get(key: K): V | undefined {
        const lowercaseKey = this.getKeyInLowerCase(key);
        const entry = this.map.get(lowercaseKey);
        return entry ? entry.value : undefined;
    }

    has(key: K): boolean {
        const lowercaseKey = this.getKeyInLowerCase(key);
        return this.map.has(lowercaseKey);
    }

    private getKeyInLowerCase(key: K): string {
        if (typeof key === 'string') {
            return key.toLowerCase();
        } else {
            // Convert non-string keys to strings before making them lowercase
            return String(key).toLowerCase();
        }
    }
}

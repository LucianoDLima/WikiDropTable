class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfSymbol = false;
    }
}

/**
 * Prefix tree that recieves a list of strings as params for it's constructor.
 */
class Trie {
    constructor(symbolsToCheck) {
        this.root = new TrieNode();
        symbolsToCheck.forEach(symbol => this.insert(symbol));
    }
  
    /**
     * Populates the trie with the given string's chars.
     * @param {string} symbol 
     */
    insert(symbol) {
        let node = this.root;
        for (const char of symbol) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isEndOfSymbol = true;
    }
  
    /**
     * Returns the given string with all symbols from the constructor removed.
     * @param {string} inputString 
     * @returns {string} inputString 
     */
    removeSymbols(inputString) {
        let result = '';
        let currentNode = this.root;
    
        for (const char of inputString) {
            if (currentNode.children.has(char)) {
                currentNode = currentNode.children.get(char);
            } else {
                result += char;
                currentNode = this.root;
            }

            if (currentNode.isEndOfSymbol) {
                currentNode = this.root;
            }
        }
        return result;
    }
}

export const paramValuesTrie = new Trie(
    ['.png', '.gif', '[', ']', ')']
);

export const infoboxesTrie = new Trie(
    ['{', '}']
);
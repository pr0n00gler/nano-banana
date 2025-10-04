// Local storage utility class
export class LocalStorage {
    private static readonly API_KEY = 'nano-banana-api-key'

    // Save the API key
    static saveApiKey(apiKey: string): void {
        try {
            localStorage.setItem(this.API_KEY, apiKey)
        } catch (error) {
            console.warn('Failed to save API key to local storage:', error)
        }
    }

    // Retrieve the API key
    static getApiKey(): string {
        try {
            return localStorage.getItem(this.API_KEY) || ''
        } catch (error) {
            console.warn('Failed to read API key from local storage:', error)
            return ''
        }
    }

    // Clear the API key
    static clearApiKey(): void {
        try {
            localStorage.removeItem(this.API_KEY)
        } catch (error) {
            console.warn('Failed to clear the API key from local storage:', error)
        }
    }
}

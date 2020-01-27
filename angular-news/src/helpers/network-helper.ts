export class NetworkHelper {
    static isValidUrl(text: string): boolean {
        try {
            const url = new URL(text);
            return true;
        } catch (_) {
            return false;
        }
    }
}

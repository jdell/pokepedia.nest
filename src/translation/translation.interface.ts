export interface TranslationService {
  translate(text: string): Promise<string>;
}

import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { FunTranslationResponse } from '../models/fun-translation.response';
import { TranslationService } from './translation.interface';

@Injectable()
export class ShakespeareTranslationService implements TranslationService {
  constructor(private http: HttpService) {}

  async translate(text: string): Promise<string> {
    try {
      const translation = await this.http
        .post('https://api.funtranslations.com/translate/shakespeare', { text })
        .pipe(
          map((response) => response.data),
          map((data: FunTranslationResponse) => {
            if (data.success && data.success.total === 1) {
              return data.contents.translated;
            }

            return text;
          }),
        )
        .toPromise();
      return translation;
    } catch(err) {
      return text;
    }
  }
}

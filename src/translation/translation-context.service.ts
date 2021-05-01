import { Injectable } from "@nestjs/common";
import { ShakespeareTranslationService } from "./shakespeare-translation.service";
import { TranslationService } from "./translation.interface";
import { YodaTranslationService } from "./yoda-translation.service";

@Injectable()
export class TranslationContextService {
  constructor(private yodaTranslateService: YodaTranslationService, private shakespeareTranslateService: ShakespeareTranslationService){}
  get(isLegendary: boolean, habitat: string): TranslationService {
    if (isLegendary || habitat === 'cave')  {
      return this.yodaTranslateService;
    }

    return this.shakespeareTranslateService;
  }
}
import { HttpModule, Module } from '@nestjs/common';
import { ShakespeareTranslationService } from './services/shakespeare-translation.service';
import { TranslationContextService } from './services/translation-context.service';
import { YodaTranslationService } from './services/yoda-translation.service';

@Module({
  imports: [HttpModule],
  providers: [
    YodaTranslationService,
    ShakespeareTranslationService,
    TranslationContextService,
  ],
  exports: [TranslationContextService],
})
export class TranslationModule {}

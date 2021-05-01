import { HttpModule, Module } from '@nestjs/common';
import { ShakespeareTranslationService } from './shakespeare-translation.service';
import { TranslationContextService } from './translation-context.service';
import { YodaTranslationService } from './yoda-translation.service';

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

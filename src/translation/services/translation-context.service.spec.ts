import { HttpModule } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ShakespeareTranslationService } from './shakespeare-translation.service';
import { TranslationContextService } from './translation-context.service';
import { YodaTranslationService } from './yoda-translation.service';

describe('TranslationContext', () => {
  let translationContext: TranslationContextService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        TranslationContextService,
        YodaTranslationService,
        ShakespeareTranslationService,
      ],
    }).compile();

    translationContext = moduleRef.get<TranslationContextService>(
      TranslationContextService,
    );
  });

  it('should return yoda translation service when legendary', async () => {
    expect(await translationContext.get(true, null)).toBeInstanceOf(YodaTranslationService);
  });

  it('should return yoda translation service when habitat cave', async () => {
    expect(await translationContext.get(false, 'cave')).toBeInstanceOf(YodaTranslationService);
  });

  it('should return shakespeare translation service when no legendary and no cave', async () => {
    expect(await translationContext.get(false, 'rare')).toBeInstanceOf(ShakespeareTranslationService);
  });
});

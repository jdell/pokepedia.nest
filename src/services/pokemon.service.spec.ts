import { HttpModule } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TranslationContextService } from '../translation/services/translation-context.service';
import { TranslationService } from '../translation/services/translation.interface';
import { Pokemon } from '../models/pokemon.model';
import { PokemonProvider } from '../providers/pokemon.provider';
import { TranslationModule } from '../translation/translation.module';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let pokemonProvider: PokemonProvider;
  let translationContextService: TranslationContextService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule, TranslationModule],
      providers: [PokemonService, PokemonProvider],
    })
    .compile();

    pokemonService = moduleRef.get<PokemonService>(PokemonService);
    pokemonProvider = moduleRef.get<PokemonProvider>(PokemonProvider);
    translationContextService = moduleRef.get<TranslationContextService>(TranslationContextService);
  });

  it('should return pokemon with no translation', async () => {
    const pokemon: Pokemon = {
      isLegendary: false,
      name: 'charizard',
      description: 'awesome dragon',
      habitat: 'sky',
    };
    jest
      .spyOn(pokemonProvider, 'get')
      .mockImplementationOnce(async () => pokemon);

    const result = await pokemonService.getByName('charizard');
    expect(result.description).toBe('awesome dragon');
  });

  it('should return pokemon with translation', async () => {
    const translationService: TranslationService = {
        translate: async (text: string) => "translated-description"
    }
    const pokemon: Pokemon = {
      isLegendary: false,
      name: 'charizard',
      description: 'awesome dragon',
      habitat: 'sky',
    };
    jest
      .spyOn(pokemonProvider, 'get')
      .mockImplementationOnce(async () => pokemon);
    jest
    .spyOn(translationContextService, 'get')
    .mockImplementationOnce(() => translationService);

    const result = await pokemonService.getByName('charizard', true);
    expect(result.description).toBe('translated-description');
  });
});

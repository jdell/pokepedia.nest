import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from '../services/pokemon.service';
import { PokemonProvider } from '../providers/pokemon.provider';
import { TranslationModule } from '../translation/translation.module';
import { HttpModule, NotFoundException } from '@nestjs/common';
import { Pokemon } from '../models/pokemon.model';

describe('PokemonController', () => {
  let pokemonController: PokemonController;
  let pokemonService: PokemonService;
  const pokemon: Pokemon = {
    isLegendary: false,
    name: 'bulbasaur',
    description: 'wonderful plant',
    habitat: 'valley',
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      imports: [TranslationModule, HttpModule],
      providers: [PokemonService, PokemonProvider],
    }).compile();

    pokemonController = app.get<PokemonController>(PokemonController);
    pokemonService = app.get<PokemonService>(PokemonService);
  });

  describe('Get', () => {
    it('should return a pokemon', async () => {
      jest
        .spyOn(pokemonService, 'getByName')
        .mockImplementationOnce(async () => pokemon);

      expect(await pokemonController.get('bulbasaur')).toBe(pokemon);
    });
    it('should return 404 not found', async () => {
      jest
        .spyOn(pokemonService, 'getByName')
        .mockImplementationOnce(() => Promise.reject());

        await expect(pokemonController.get('bulbasaur')).rejects.toThrow(NotFoundException);
    });
  });
});

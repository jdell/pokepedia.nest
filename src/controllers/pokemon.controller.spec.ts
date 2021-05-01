import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from '../services/pokemon.service';

describe('PokemonController', () => {
  let pokemonController: PokemonController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [PokemonService],
    }).compile();

    pokemonController = app.get<PokemonController>(PokemonController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(pokemonController.get("World")).toBe('Hello World!');
    });
  });
});

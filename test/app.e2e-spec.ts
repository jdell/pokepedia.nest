import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PokemonService } from './../src/services/pokemon.service';
import { Pokemon } from './../src/models/pokemon.model';

describe('AppController (e2e)', () => {
  const pokemon: Pokemon = {
    isLegendary: false,
    name: 'squirtle',
    description: 'brillain turtle',
    habitat: 'water',
  };
  let app: INestApplication;
  let pokemonService = { getByName: async (name: string) => pokemon };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PokemonService)
      .useValue(pokemonService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/pokemon/:name (GET)', () => {
    return request(app.getHttpServer())
      .get('/pokemon/squirtle')
      .expect(200)
      .expect(pokemon);
  });

  it('/pokemon/:name (GET) - 404 not found', () => {
    jest.spyOn(pokemonService, 'getByName').mockImplementationOnce(() => Promise.reject());
    return request(app.getHttpServer())
      .get('/pokemon/squirtle')
      .expect(404);
  });

  it('/pokemon/translate/:name (GET)', () => {
    pokemon.description = 'turtle, brilliant';
    return request(app.getHttpServer())
      .get('/pokemon/translated/squirtle')
      .expect(200)
      .expect(pokemon);
  });
});

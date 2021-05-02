import { Controller, Get, Headers, NotFoundException, Param } from '@nestjs/common';
import { Pokemon } from 'src/models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':name')
  async get(@Param('name') name: string): Promise<Pokemon> {
    try {
      return await this.pokemonService.getByName(name);
    } catch {
      throw new NotFoundException(`${name} not found in the Pokepedia`);
    }
  }

  @Get('translated/:name')
  async getTranslated(@Param('name') name: string): Promise<Pokemon> {
    try {
      return await this.pokemonService.getByName(name, true);
    } catch  {
      throw new NotFoundException(`${name} not found in the Pokepedia`);
    }
  }
}

@Controller('v2/pokemon')
export class Pokemonv2Controller{
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':name')
  async get(@Param('name') name: string, @Headers('translate') translate: boolean): Promise<Pokemon> {
    try {
      return await this.pokemonService.getByName(name, translate);
    } catch {
      throw new NotFoundException(`${name} not found in the Pokepedia`);
    }
  }
}
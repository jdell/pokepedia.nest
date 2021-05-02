import { Injectable } from '@nestjs/common';
import { Pokemon } from '../models/pokemon.model';

import { PokemonProvider } from '../providers/pokemon.provider';
import { TranslationContextService } from '../translation/services/translation-context.service';

@Injectable()
export class PokemonService {
  constructor(private pokemonProvider: PokemonProvider, private translateContextService: TranslationContextService) {}

  async getByName(name: string, translate?: boolean): Promise<Pokemon> {
    const pokemon = await this.pokemonProvider.get(name);
    if (translate) {
      const translateService = this.translateContextService.get(pokemon.isLegendary, pokemon.habitat);
      pokemon.description = await translateService.translate(pokemon.description);
    }
    return pokemon;
  }
}
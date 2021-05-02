import { HttpService, Injectable } from '@nestjs/common';
import { map, switchMap } from 'rxjs/operators';
import { Pokemon } from 'src/models/pokemon.model';

interface NamedApi {
  name: string;
  url: string;
}
interface FlavorText {
  flavor_text: string;
  language: NamedApi;
}
interface PokemonSpecie {
  name: string;
  is_legendary: boolean;
  habitat: NamedApi;
  flavor_text_entries: FlavorText[];
}

@Injectable()
export class PokemonProvider {
  private readonly BASE_URL = 'https://pokeapi.co/api/v2';
  constructor(private http: HttpService) {}

  async get(name: string): Promise<Pokemon> {
    const specie: PokemonSpecie = await this.http
      .get(`${this.BASE_URL}/pokemon/${name}`)
      .pipe(map((response) => response.data as { species: NamedApi }))
      .pipe(
        switchMap((response) => this.http.get(response.species.url)),
        map((response) => response.data),
      )
      .toPromise();

    // Selecting the first english-flavor or the the first one if no english
    const flavor =
      specie.flavor_text_entries.find((item) => item.language.name === 'en') ||
      specie.flavor_text_entries[0];
    return {
      name: specie.name,
      isLegendary: specie.is_legendary,
      habitat: specie.habitat.name,
      description: flavor?.flavor_text,
    };
  }
}

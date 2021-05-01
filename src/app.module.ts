import { HttpModule, Module } from '@nestjs/common';
import { PokemonController, Pokemonv2Controller } from './controllers/pokemon.controller';
import { PokemonProvider } from './providers/pokemon.provider';
import { PokemonService } from './services/pokemon.service';
import { TranslationModule } from './translation/translation.module';

@Module({
  imports: [HttpModule, TranslationModule],
  controllers: [PokemonController, Pokemonv2Controller],
  providers: [PokemonService, PokemonProvider],
})
export class AppModule {}

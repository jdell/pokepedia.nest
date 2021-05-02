import { HttpModule, HttpService } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { of } from 'rxjs';
import { ShakespeareTranslationService } from './shakespeare-translation.service';
import { AxiosResponse } from 'axios';

describe('ShakespeareTranslation', () => {
  let shakespeareTranslationService: ShakespeareTranslationService;
  let httpService: HttpService;

  const description = 'original description';
  const translatedDescription = 'shakespeare description';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ShakespeareTranslationService],
    }).compile();

    shakespeareTranslationService = moduleRef.get<ShakespeareTranslationService>(
      ShakespeareTranslationService,
    );
    httpService = moduleRef.get<HttpService>(HttpService);
  });

  it('should return shakespearean description', async () => {
    const result: AxiosResponse = {
      data: {
        success: {
          total: 1,
        },
        contents: {
          translated: translatedDescription,
        },
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));

    expect(await shakespeareTranslationService.translate(description)).toBe(
        translatedDescription,
    );
  });

  it('should return original description if there is no translation', async () => {
    const result: AxiosResponse = {
      data: {
        success: {
          total: 0,
        },
        contents: {
          translated: translatedDescription,
        },
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));

    expect(await shakespeareTranslationService.translate(description)).toBe(
        description,
    );
  });

  it('should return original description if there is any issue', async () => {
    const result: AxiosResponse = {
      data: {},
      status: 500,
      statusText: 'NOK',
      headers: {},
      config: {},
    };
    jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result));

    expect(await shakespeareTranslationService.translate(description)).toBe(
        description,
    );
  });
});

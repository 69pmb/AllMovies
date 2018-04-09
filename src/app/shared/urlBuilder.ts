import { DiscoverCriteria } from './../model/discover-criteria';
import { Url } from './../constant/url';

export class UrlBuilder {

  static movieUrlBuilder(id: number, video: boolean, credit: boolean, reco: boolean, image: boolean, language: string): string {
    let url = `${Url.MOVIE_URl}/${id}?${Url.API_KEY}`;
    if (video || credit || reco || image) {
      url += `${Url.APPEND}`;
      const parametres = [];
      if (video) {
        parametres.push(`${Url.APPEND_VIDEOS}`);
      }
      if (credit) {
        parametres.push(`${Url.APPEND_CREDITS}`);
      }
      if (reco) {
        parametres.push(`${Url.APPEND_RECOMMENDATIONS}`);
      }
      if (image) {
        parametres.push(`${Url.APPEND_IMAGES}`);
      }
      url += parametres.join(',');
    }
    if (language) {
      url += `${Url.LANGUE}${language}`;
      url += `${Url.INCLUDE_IMAGE_LANGUAGE}${language},null`;
    }
    console.log('movieUrlBuilder', url);
    return url;
  }

  static discoverUrlBuilder(criteria: DiscoverCriteria): string {
    let url = `${Url.DISCOVER_URL}`;
    const parametres = [];
    if (criteria.sortField && criteria.sortDir) {
      parametres.push(`${Url.SORT_BY_URL}${criteria.sortField}.${criteria.sortDir}`);
    }
    if (criteria.page) {
      parametres.push(`${Url.PAGE_URL}${criteria.page}`);
    }
    if (criteria.yearMin) {
      parametres.push(`${Url.RELEASE_DATE_GTE_URL}${criteria.yearMin}`);
    }
    if (criteria.yearMax) {
      parametres.push(`${Url.RELEASE_DATE_LTE_URL}${criteria.yearMax}`);
    }
    if (criteria.adult) {
      parametres.push(`${Url.ADULT_URL}`);
    }
    if (criteria.voteAvergeMin) {
      parametres.push(`${Url.VOTE_AVERAGE_GTE_URL}${criteria.voteAvergeMin}`);
    }
    if (criteria.voteAvergeMax) {
      parametres.push(`${Url.VOTE_AVERAGE_LTE_URL}${criteria.voteAvergeMax}`);
    }
    if (criteria.voteCountMin) {
      parametres.push(`${Url.VOTE_COUNT_GTE_URL}${criteria.voteCountMin}`);
    }
    if (criteria.certification) {
      parametres.push(`${Url.CERTIFICATION_COUNTRY_URL}`);
      parametres.push(`${Url.CERTIFICATION_URL}${criteria.certification.join(Url.OR_URL)}`);
    }
    if (criteria.runtimeMin) {
      parametres.push(`${Url.WITH_RUNTIME_GTE_URL}${criteria.runtimeMin}`);
    }
    if (criteria.runtimeMax) {
      parametres.push(`${Url.WITH_RUNTIME_LTE_URL}${criteria.runtimeMax}`);
    }
    if (criteria.releaseType) {
      parametres.push(`${Url.WITH_RELEASE_TYPE_URL}${criteria.releaseType.join(Url.OR_URL)}`);
    }
    if (criteria.personsIds) {
      parametres.push(`${Url.WITH_PEOPLE_URL}${criteria.personsIds.join(Url.AND_URL)}`);
    }
    if (criteria.genresId && !criteria.genresWithout) {
      parametres.push(`${Url.WITH_GENRES_URL}${criteria.genresId.join(Url.OR_URL)}`);
    }
    if (criteria.genresId && criteria.genresWithout) {
      parametres.push(`${Url.WITHOUT_GENRES_URL}${criteria.genresId.join(Url.OR_URL)}`);
    }
    if (criteria.keywordsIds && !criteria.keywordsWithout) {
      parametres.push(`${Url.WITH_KEYWORDS_URL}${criteria.keywordsIds.join(Url.OR_URL)}`);
    }
    if (criteria.keywordsIds && criteria.keywordsWithout) {
      parametres.push(`${Url.WITHOUT_KEYWORDS_URL}${criteria.keywordsIds.join(Url.OR_URL)}`);
    }
    url += parametres.join('');
    if (criteria.language) {
      url += `${Url.LANGUE}${criteria.language}`;
      url += `${Url.INCLUDE_IMAGE_LANGUAGE}${criteria.language},null`;
    }
    console.log('discoverUrlBuilder', url);
    return url;
  }
}

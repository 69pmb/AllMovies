export class DiscoverCriteria {
  language: string;
  region: string;
  sortField: string;
  sortDir: string;
  page: number;
  yearMin: string;
  yearMax: string;
  adult: boolean;
  voteAvergeMin: number;
  voteAvergeMax: number;
  voteCountMin: number;
  certification: string;
  runtimeMin: number;
  runtimeMax: number;
  releaseType: number[];
  personsIds: number[];
  genresId: number[];
  genresWithout: boolean;
  keywordsIds: number[];
  keywordsWithout: boolean;
}

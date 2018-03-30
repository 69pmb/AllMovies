export class Url {
  // Image
  static readonly IMAGE_URL_ORIGINAL = 'https://image.tmdb.org/t/p/original';
  static readonly IMAGE_URL_154 = 'https://image.tmdb.org/t/p/w154';
  static readonly IMAGE_URL_92 = 'https://image.tmdb.org/t/p/w92';
  static readonly IMAGE_URL_EMPTY = './assets/empty.jpg';

  // DUCK DUCK GO
  static readonly SEARCH_BANG_METACRITIC = { site: 'metacritic', icon: 'fa-database' };
  static readonly SEARCH_BANG_SENSCRITIQUE = { site: 'scq', icon: 'fa-film' };
  static readonly SEARCH_BANG_IMDB = { site: 'imdb', icon: 'fa-imdb' };
  static readonly SEARCH_BANG_WIKI_EN = { site: 'wen', icon: 'fa-wikipedia-w' };
  static readonly SEARCH_BANG_WIKI_FR = { site: 'wikifr', icon: 'fa-wikipedia-w' };
  static readonly DUCKDUCKGO_URL = 'https://api.duckduckgo.com/?q=!';

  // API MovieDB request
  static readonly API_KEY = 'api_key=81c50d6514fbd578f0c796f8f6ecdafd';
  static readonly MOVIE_URl = 'https://api.themoviedb.org/3/movie';
  static readonly PERSON_URL = 'https://api.themoviedb.org/3/person';
  static readonly MOVIE_SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?';
  static readonly PERSON_SEARCH_URL = 'https://api.themoviedb.org/3/search/person?';
  static readonly MOVIE_CREDITS_URL = 'movie_credits';
  static readonly LANGUE = '&language=';
  static readonly LANGUE_FR = '&language=fr';
  static readonly ADULT_URL = '&include_adult=true';
  static readonly QUERY_URL = '&query=';
  static readonly APPEND = '&append_to_response=';
  static readonly APPEND_VIDEOS = 'videos';
  static readonly APPEND_CREDITS = 'credits';
  static readonly APPEND_IMAGES = 'images';
  static readonly INCLUDE_IMAGE_LANGUAGE = '&include_image_language=';
  static readonly APPEND_RECOMMENDATIONS = 'recommendations';
  static readonly RELEASE_DATE_GTE_URL = '&release_date.gte=';
  static readonly RELEASE_DATE_LTE_URL = '&release_date.lte=';
  static readonly RELEASE_TYPE_URL = '&with_release_type=2|3';
  static readonly DISCOVER_URL =
    'https://api.themoviedb.org/3/discover/movie?' + Url.API_KEY + '&region=FR';
  static readonly MOST_POPULAR_URL = Url.DISCOVER_URL + '&sort_by=popularity.desc';

  // DropBox
  static readonly DROPBOX_TOKEN = 'G-_ZeiEAvB0AAAAAAAANQd4IMHRr7Y9aTvAiivg-8LImbDKmo9pdu95_SIioW3lR';
  static readonly DROPBOX_FOLDER = '/MyMovies/';
  static readonly DROPBOX_USER_FILE = 'user.json';
  static readonly DROPBOX_FILE_PREFIX = 'ex_';
  static readonly DROPBOX_FILE_SUFFIX = '.json';
}

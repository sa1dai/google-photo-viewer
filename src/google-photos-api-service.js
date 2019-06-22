import oauth2Config from 'src/oauth2-config';

export default class GooglePhotosApiService {

  _apiBase = oauth2Config.apiEndpoint;

  // Returns a list of all albums owner by the logged in user from the Library
  // API.
  async getAlbums(authToken) {
    let albums = [];
    let error = null;
    //todo передать в fetch и проверить
    let parameters = {pageSize: oauth2Config.albumPageSize};

    try {
      // Loop while there is a nextpageToken property in the response until all
      // albums have been listed.
      do {
        console.log(`Loading albums. Received so far: ${albums.length}`);
        // Make a GET request to load the albums with optional parameters (the
        // pageToken if set).
        const response = await fetch(`${this._apiBase}/v1/albums?access_token=${encodeURIComponent(authToken)}`);
        const result = await response.json();

        console.log(`Response`, result);

        if (result && result.albums) {
          console.log(`Number of albums received: ${result.albums.length}`);
          // Parse albums and add them to the list, skipping empty entries.
          const items = result.albums.filter(x => !!x);

          albums = albums.concat(items);
        }
        parameters.pageToken = result.nextPageToken;
        // Loop until all albums have been listed and no new nextPageToken is
        // returned.*!/
      } while (parameters.pageToken != null);

    } catch (err) {
      // If the error is a StatusCodeError, it contains an error.error object that
      // should be returned. It has a name, statuscode and message in the correct
      // format. Otherwise extract the properties.
      error = err.error.error ||
        {name: err.name, code: err.statusCode, message: err.message};
      console.error(error);
    }

    console.log('Albums loaded.');
    return {albums, error};
  }
}

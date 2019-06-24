import oauth2Config from 'src/oauth2-config';

// Использован код из файла https://github.com/googlesamples/google-photos/blob/master/REST/PhotoFrame/app.js
export default class GooglePhotosApiService {

  _apiBase = oauth2Config.apiEndpoint;

  // Returns a list of all albums owner by the logged in user from the Library
  // API.
  async getAlbums(authToken) {
    let albums = [];
    let error = null;
    let parameters = {
      access_token: authToken,
      pageSize: oauth2Config.albumPageSize
    };

    try {
      // Loop while there is a nextpageToken property in the response until all
      // albums have been listed.
      do {
        console.log(`Loading albums. Received so far: ${albums.length}`);

        const url = new URL(`${this._apiBase}/v1/albums`);
        Object.keys(parameters).forEach(key => url.searchParams.append(key, parameters[key]));

        // Make a GET request to load the albums with optional parameters (the
        // pageToken if set).
        const response = await fetch(url);
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

  // Handles selections from the album page where an album ID is submitted.
  // The user has selected an album and wants to load photos from an album
  // into the photo frame.
  // Submits a search for all media items in an album to the Library API.
  // Returns a list of photos if this was successful, or an error otherwise.
  async loadFromAlbum(authToken, albumId) {
    console.log(`Importing album: ${albumId}`);

    // To list all media in an album, construct a search request
    // where the only parameter is the album ID.
    // Note that no other filters can be set, so this search will
    // also return videos that are otherwise filtered out in libraryApiSearch(..).
    const parameters = {albumId};

    // Submit the search request to the API and wait for the result.
    return await this.libraryApiSearch(authToken, parameters);
  }

  // Submits a search request to the Google Photos Library API for the given
  // parameters. The authToken is used to authenticate requests for the API.
  // The minimum number of expected results is configured in config.photosToLoad.
  // This function makes multiple calls to the API to load at least as many photos
  // as requested. This may result in more items being listed in the response than
  // originally requested.
  async libraryApiSearch(authToken, parameters) {
    let photos = [];
    let error = null;

    parameters.pageSize = oauth2Config.searchPageSize;

    try {
      // Loop while the number of photos threshold has not been met yet
      // and while there is a nextPageToken to load more items.
      do {
        console.log(
          `Submitting search with parameters: ${JSON.stringify(parameters)}`);

        // Make a POST request to search the library or album
        const response =
          await fetch(`${this._apiBase}/v1/mediaItems:search?access_token=${encodeURIComponent(authToken)}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(parameters)
          });

        const result = await response.json();

        console.log(`Response: ${result}`);

        // The list of media items returned may be sparse and contain missing
        // elements. Remove all invalid elements.
        // Also remove all elements that are not images by checking its mime type.
        // Media type filters can't be applied if an album is loaded, so an extra
        // filter step is required here to ensure that only images are returned.
        const items = result && result.mediaItems ?
          result.mediaItems
            .filter(x => x)  // Filter empty or invalid items.
            // Only keep media items with an image mime type.
            .filter(x => x.mimeType && x.mimeType.startsWith('image/')) :
          [];

        photos = photos.concat(items);

        // Set the pageToken for the next request.
        parameters.pageToken = result.nextPageToken;

        console.log(
          `Found ${items.length} images in this request. Total images: ${
            photos.length}`);

        // Loop until the required number of photos has been loaded or until there
        // are no more photos, ie. there is no pageToken.
      } while (photos.length < oauth2Config.photosToLoad &&
      parameters.pageToken != null);

    } catch (err) {
      // If the error is a StatusCodeError, it contains an error.error object that
      // should be returned. It has a name, statuscode and message in the correct
      // format. Otherwise extract the properties.
      error = err.error.error ||
        {name: err.name, code: err.statusCode, message: err.message};
      console.error(error);
    }

    console.log('Search complete.');
    return {photos, parameters, error};
  }
}

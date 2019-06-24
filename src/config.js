// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// This file contains the configuration options for this sample app.

const config = {};

// The OAuth client ID from the Google Developers console.
config.oauthClientID = 'ADD YOUR CLIENT ID';

// The scopes to request. The app requires the photoslibrary.readonly and
// plus.me scopes.
config.oauthScopes = 'https://www.googleapis.com/auth/photoslibrary.readonly';

// The number of photos to load for search requests.
config.googleApiPhotosToLoad = 150;

// The page size to use for search requests. 100 is reccommended.
config.googleApiSearchPageSize = 100;

// The page size to use for the listing albums request. 50 is reccommended.
config.googleApiAlbumPageSize = 50;

// The API end point to use. Do not change.
config.googleApiEndpoint = 'https://photoslibrary.googleapis.com';

module.exports = config;

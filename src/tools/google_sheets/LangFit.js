
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
require('dotenv').config() //載入.env環境檔
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'src/tools/google_sheets/token.json';

// Load client secrets from a local file.
fs.readFile('src/tools/google_sheets/credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMySheet);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize (credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken (oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}


async function listMySheet (auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  const request = {
    spreadsheetId: '12YGo2z0WNjzVqN1pr6MKtNOtVj5DV8_JERONJ4mrt2s',
    range: "i18n",
    valueRenderOption: "FORMULA"//FORMATTED_VALUE|UNFORMATTED_VALUE|FORMULA
  }
  try {
    //這裡改寫為await，之後會有順序執行的需求
    let values = (await sheets.spreadsheets.values.get(request)).data.values;
    console.log(values)
    if (values) {
      let lang = values[0]
      for (let key = 1; key < lang.length; key++){
        let result = {}
        for (let i = 1; i < values.length; i++) {
          result[values[i][0]] = values[i][key]
          result[values[i][0]] = values[i][key]
        }
        let jsonResult = JSON.stringify(result)
        fs.writeFile(
          `src/locales/${lang[key].toLowerCase()}.json`,
          jsonResult,
          "utf8",
          function(err) {
            if (err) throw err;
          }
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
}
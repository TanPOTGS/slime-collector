import tokenService from './tokenService';

const BASE_URL = '/api/players/';

function signup(player) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(player)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('That username is already taken!');
  })
  .then(({token}) => {
		tokenService.setToken(token)
	});
}

function getPlayer() {
  return tokenService.getPlayerFromToken();
}

function logout() {
	tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    // Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}

export default {
	signup,
	getPlayer,
	logout,
	login
};
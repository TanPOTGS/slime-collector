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
/*****************************************************************************************/
function getPlayer() {
  return tokenService.getPlayerFromToken();
}
/*****************************************************************************************/
function logout() {
	tokenService.removeToken();
}
/*****************************************************************************************/
function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    //Valid login if we have a status of 2xx (res.ok)
    if (res.ok) return res.json();
    throw new Error('Bad Credentials!');
  })
  .then(({token}) => tokenService.setToken(token));
}
/*****************************************************************************************/
function updatePlayerHealth(info, id) {
	return fetch(BASE_URL + id, {
		method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(info)
	})
	.then(res => {
    if (res.ok) return console.log('Health was updated!');
    throw new Error(`Health was not updated. ${res.status}`);
	})
}
// function updatePlayerHealth(info, id) {
//   const options = {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       // Add this header - don't forget the space after Bearer
//       'Authorization': 'Bearer ' + tokenService.getToken()
//     },
//     body: JSON.stringify(info)
//   };
//   return fetch(BASE_URL + id, options).then(res => console.log(res.status));
// }

export default {
	signup,
	getPlayer,
	logout,
	login,
	updatePlayerHealth
};
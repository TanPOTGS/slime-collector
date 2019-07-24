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
  .then(data => data);
}

export default {
  signup
};
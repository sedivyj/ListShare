
/**
 * Asynchronous function that fetches data (GET) from server endpoint
 * @param {string} endpoint API endpoint to call GET request
 * @param {function} cb_success callback function to call with a good response
 * @param {function} cb_error callback function to call with bad response
 */
export function getAPI (endpoint) {
  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err))
  })
}

export async function postAPI (endpoint, data) {
  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(handleErrors)
      .then((data) => resolve(data))
      .catch((err) => reject(err))
  })
}

export async function putAPI (endpoint, data) {
  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(handleErrors)
      .then((data) => resolve(data))
      .catch((err) => reject(err))
  })
}

// TODO: Make sure this works
export async function deleteAPI (endpoint, data, cbSuccess, cbErr) {
  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(handleErrors)
      .then((data) => resolve(data))
      .catch((err) => reject(err))
  })
}

// Intermediate step for handling bad HTTP responses
// Handles what to return to user based on response status code
const handleErrors = async (response) => {
  const result = await response.json()
  if (!response.ok) throw Error(result.message)
  return result
}

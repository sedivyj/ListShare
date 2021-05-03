// API TOOLS TO SIMPLIFY CALLS TO SERVER

/**
 * Asynchronous function that fetches data (GET) from server endpoint
 * @param {string} endpoint API endpoint to call GET request
 */
export function getAPI (endpoint) {
  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(handleErrors)
      .then((data) => resolve(data))
      .catch((err) => reject(err))
  })
}

/**
 * Asynchronous function that updates data (POST) to server endpoint
 * @param {string} endpoint API endpoint to call POST request
 * @param {object} data data to send to server for request
 */
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

/**
 * Asynchronous function that inserts new data (PUT) to server endpoint
 * @param {string} endpoint API endpoint to call PUT request
 * @param {object} data data to send to server for request
 */
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

/**
 * Asynchronous function that deletes data (DELETE) at server endpoint
 * @param {string} endpoint API endpoint to call DELETE request
 * @param {object} data data to send to server for request
 */
export async function deleteAPI (endpoint, data) {
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
  if (!response.ok) {
    const errMessage = (result.message) ? result.message : response.statusText
    throw Error(errMessage)
  }
  return result
}

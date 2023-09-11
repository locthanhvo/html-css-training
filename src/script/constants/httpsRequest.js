/**
 * @function commonHttpRequest
 * A generic function to perform common HTTP requests (GET, POST, PUT, DELETE).
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE).
 * @param {string} path - The path for the request.
 * @param {object} data - Optional data to send in the request body (for POST).
 * @returns {Promise} A Promise that resolves to the JSON response from the server.
 */
export const commonHttpRequest = async (method, path, data = null) => {
  const response = await fetch(path, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : null,
  });

  const responseData = await response.json();
  return responseData;
};

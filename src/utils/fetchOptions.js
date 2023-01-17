function fetchOptions(method, body) {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    method: method,
    body: JSON.stringify(body),
  };

  return options;
}

export default fetchOptions;

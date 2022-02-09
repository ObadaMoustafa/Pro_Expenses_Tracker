import { useState } from "react";

const useFetch = (route, onReceived) => {
  const controller = new AbortController();
  const signal = controller.signal;
  const cancelFetch = () => controller.abort();

  if (route.includes("api/"))
    throw Error(
      "when using the useFetch hook, the route should not include the /api/ part"
    );

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Add any args given to the function to the fetch function
  const performFetch = (options) => {
    setError(null);
    setIsLoading(true);

    const fetchInfo = async () => {
      // We add the /api subsection here to make it a single point of change if our configuration changes
      const url = `${process.env.BASE_SERVER_URL}/api${route}`;

      const res = await fetch(url, { ...options, signal });

      if (!res.ok) {
        setError(
          `Fetch for ${url} returned an invalid status (${
            res.status
          }). Received: ${JSON.stringify(res)}`
        );
      }

      const jsonResult = await res.json();

      if (jsonResult.success) {
        onReceived(jsonResult);
      } else {
        setError(
          jsonResult.msg ||
            `The result from our API did not have an error message. Received: ${JSON.stringify(
              jsonResult
            )}`
        );
      }

      setIsLoading(false);
    };

    try {
      fetchInfo();
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return { isLoading, error, performFetch, cancelFetch };
};

export default useFetch;

async function fetchQuestions(categoryId, numQuestions, retries = 3) {
  const apiUrl = `https://opentdb.com/api.php?amount=${numQuestions}&category=${categoryId}`;

  const fetchWithRetry = async (attempts) => {
    try {
      const response = await fetch(apiUrl);

      if (response.status === 429) {
        if (attempts > 0) {
          //Api often return 429 error as it allows 1 request per 5 sec per IP, 
          //this fallback guarantees fetch when 1 attempt isnt successfull
          console.error("Rate limit hit. Retrying...");
          await new Promise((res) => setTimeout(res, 5000));
          return fetchWithRetry(attempts - 1);
        } else {
          throw new Error("Too many requests. No more retries.");
        }
      }

      if (!response.ok) {
        throw new Error(
          `Failed to fetch questions. Status: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching questions:", error);

      if (attempts > 0) {
        console.error("Retrying due to error:", error.message);
        await new Promise((res) => setTimeout(res, 1000)); 
        return fetchWithRetry(attempts - 1);
      } else {
        return { results: [] };
      }
    }
  };

  return fetchWithRetry(retries);
}

export { fetchQuestions };

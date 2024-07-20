async function fetchQuestions(categoryId, numQuestions, retries = 3) {
  const apiUrl = `https://opentdb.com/api.php?amount=${numQuestions}&category=${categoryId}`;
  console.log(apiUrl);
  
  const fetchWithRetry = async (attempts) => {
    try {
      const response = await fetch(apiUrl);
      
      if (response.status === 429) {
        // If we get a 429 status code, we should retry
        if (attempts > 0) {
          console.log("Rate limit hit. Retrying...");
          await new Promise(res => setTimeout(res, 5000)); // Wait for 1 second before retrying
          console.log(apiUrl)
          console.log(numQuestions)
          return fetchWithRetry(attempts - 1);
        } else {
          throw new Error("Too many requests. No more retries.");
        }
      }
      
      if (!response.ok) {
        throw new Error(`Failed to fetch questions. Status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
      
    } catch (error) {
      console.error("Error fetching questions:", error);
      if (attempts > 0 && error.message.includes("Too many requests")) {
        // Retry if the error is due to too many requests
        console.log("Retrying due to error:", error.message);
        await new Promise(res => setTimeout(res, 1000)); // Wait for 1 second before retrying
        return fetchWithRetry(attempts - 1);
      } else {
        // If not a retryable error or no retries left, return empty array
        return { results: [] };
      }
    }
  };
  
  return fetchWithRetry(retries);
}

export { fetchQuestions };

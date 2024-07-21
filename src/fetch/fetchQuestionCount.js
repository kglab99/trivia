export const fetchQuestionCount = async (categoryId) => {
    try {
      const response = await fetch(`https://opentdb.com/api_count.php?category=${categoryId}`);
      const data = await response.json();
      return data.category_question_count.total_question_count;
    } catch (error) {
      console.error("Error fetching question count:", error);
      throw error;
    }
  };
  
export const fetchCategories = async () => {
    try {
      const response = await fetch("https://opentdb.com/api_category.php");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.trivia_categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  };
  
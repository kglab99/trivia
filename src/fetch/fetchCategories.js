jako ze wszystkie koncowki w tym katalogi korzystaja z jednego api to raczej zrobilbym to jako
useQuizApi
ktore by zwracalo metody do pobierania tego co chcesz
{
  fetchCategories,
  fetchQuestions
  ...itd
}
+ wszystkie url i takie rzeczy konfiguracyjne poiwnny byc wyciagniete do jakiegos configu/pliku env

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
  
// Function to decode HTML entities
nazwa od czapy, to nic nie decoduje tylko tworzy textarea i ustawia w nim wartosc
export const decodeHTMLEntities = (text) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

// Helper function to shuffle an array
export const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

nazywanie tego additional.js sredniawka, lepiej rozbic na dwa pliki
nic nie kosztuje a patrzac na nazwe pliku od razu wiesz czego sie spodziewac
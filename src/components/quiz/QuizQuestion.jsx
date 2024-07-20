import { Box } from "@mui/joy";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

export default function QuizQuestion({
  question,
  index,
  totalQuestions,
  handleAnswer,
}) {
  if (!question) {
    return <p>Loading...</p>;
  }

  // Determine if the question is true/false by checking the possible answers
  const isTrueFalse =
    question.incorrect_answers.length === 1 &&
    question.incorrect_answers.includes("False") &&
    question.correct_answer === "True";

  return (
    <Box
      component="div"
      sx={{
        p: 2,
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        height: "80vh",
        justifyContent: "center",
      }}
    >
      <Card sx={{ maxWidth: 640, width: "90%", "--Card-padding": "16px" }}>
        <Box
          component="div"
          sx={{
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            level="title-lg"
            sx={{
              mt: 1,
              mb: 1, // Margin-bottom for spacing
            }}
          >
            {index + 1} of {totalQuestions}
          </Typography>
          <Typography
            level="body-md"
            sx={{
              mb: 1, // Margin-bottom for spacing
            }}
          >
            {question.question}
          </Typography>
        </Box>
        <CardContent orientation="vertical">
          {isTrueFalse ? (
            <>
              <Button
                className="btn"
                key="true"
                onClick={() => handleAnswer("True")}
                sx={{
                  mt: 1,
                  mb: 1, // Margin-bottom for spacing
                }}
              >
                True
              </Button>
              <Button
                className="btn"
                key="false"
                onClick={() => handleAnswer("False")}
                sx={{
                  mt: 0.5,
                  mb: 0.5, // Margin-bottom for spacing
                }}
              >
                False
              </Button>
            </>
          ) : (
            [...question.incorrect_answers, question.correct_answer]
              .sort()
              .map((answer, idx) => (
                <Button
                  className="btn"
                  key={idx}
                  onClick={() => handleAnswer(answer)}
                  sx={{
                    mt: 0.5,
                    mb: 0.5, // Margin-bottom for spacing
                  }}
                >
                  {answer}
                </Button>
              ))
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

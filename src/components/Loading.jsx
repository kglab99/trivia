import CircularProgress from "@mui/joy/CircularProgress";
import { Box } from "@mui/joy";

export default function Loading() {
  return (
    <Box
      component="div"
      sx={{
        p: 2,
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CircularProgress
        color="neutral"
        size="lg"
        variant="plain"
        thickness={3}
      />
    </Box>
  );
}

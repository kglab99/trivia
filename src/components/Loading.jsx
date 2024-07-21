import CircularProgress from "@mui/joy/CircularProgress";
import { Box } from "@mui/joy";
import { motion, AnimatePresence } from "framer-motion";
import useAnimationValues from "../utils/useAnimationValues";

export default function Loading() {
  const { initialX, exitX } = useAnimationValues();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, x: initialX }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 1, x: exitX }}
        transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
        style={{ position: "relative" }}
        onAnimationStart={() => (document.body.style.overflow = "hidden")}
        onAnimationComplete={() => (document.body.style.overflow = "")}
      >
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
      </motion.div>
    </AnimatePresence>
  );
}

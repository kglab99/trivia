import CircularProgress from "@mui/joy/CircularProgress";
import { Box } from "@mui/joy";
import MotionWrapper from "../MotionWrapper"; // Import the custom MotionWrapper
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loading() {
  const [animationValues, setAnimationValues] = useState({
    initialX: 500,
    exitX: -500,
  });

  useEffect(() => {
    const updateAnimationValues = () => {
      if (window.innerWidth <= 600) {
        // Mobile width threshold
        setAnimationValues({ initialX: 500, exitX: -500 });
      } else {
        setAnimationValues({ initialX: 1000, exitX: -1000 });
      }
    };

    // Update animation values on component mount
    updateAnimationValues();

    // Add event listener to update animation values on screen resize
    window.addEventListener("resize", updateAnimationValues);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", updateAnimationValues);
  }, []);

  const handleAnimationStart = () => {
    document.body.style.overflow = "hidden"; // Hide scrollbar on body
  };

  const handleAnimationComplete = () => {
    document.body.style.overflow = ""; // Show scrollbar again
  };

  const { initialX, exitX } = animationValues;

  return (
    <AnimatePresence
      mode="wait" // Ensures that the new element waits for the old one to exit
    >
      {" "}
      <motion.div
        initial={{ opacity: 1, x: initialX }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 1, x: exitX }}
        transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }} // iOS-like easing function and duration
        onAnimationStart={handleAnimationStart} // Hide scrollbars when animation starts
        onAnimationComplete={handleAnimationComplete} // Show scrollbars when animation completes
        style={{
          position: "relative", // Ensure relative positioning for proper overflow handling
        }}
      >
        {" "}
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
      </motion.div>{" "}
    </AnimatePresence>
  );
}

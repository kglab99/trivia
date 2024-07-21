import { motion } from "framer-motion";
import useAnimationValues from "../utils/useAnimationValues"; // Import the custom hook

const MotionWrapper = ({ children, ...props }) => {
  const { initialX, exitX } = useAnimationValues();

  return (
    <motion.div
      initial={{ opacity: 1, x: initialX }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 1, x: exitX }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      onAnimationStart={() => (document.body.style.overflow = "hidden")}
      onAnimationComplete={() => (document.body.style.overflow = "")}
      style={{
        position: "relative",
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;

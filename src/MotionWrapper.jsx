// MotionWrapper.js
import { motion } from "framer-motion";

// Define your custom motion div component with default animations
const MotionWrapper = ({ children, initial = { opacity: 0, x: -20 }, animate = { opacity: 1, x: 0 }, exit = { opacity: 0, x: 20 }, transition = { duration: 0.1, ease: "easeInOut" }, ...props }) => (
  <motion.div
    initial={initial}
    animate={animate}
    exit={exit}
    transition={transition}
    {...props} // Spread other props to support additional customizations
  >
    {children}
  </motion.div>
);

export default MotionWrapper;

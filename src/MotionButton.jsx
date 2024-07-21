import { motion } from 'framer-motion';
import Button from '@mui/joy/Button';

// Create a motion-enabled Button component
const MotionButton = motion(Button);

// Define the custom wrapper component
const CustomMotionButton = ({ children, onClick, sx = {}, ...props }) => {
  return (
    <MotionButton
      onClick={onClick}
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1, ease: 'easeInOut' }} // Faster transition
      sx={{
        mt: 0.5,
        mb: 0.5,
        ...sx, // Spread the custom styles
      }}
      {...props} // Spread additional props
    >
      {children}
    </MotionButton>
  );
};

export default CustomMotionButton;

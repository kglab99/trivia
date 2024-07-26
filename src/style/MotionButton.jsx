import { motion } from 'framer-motion';
import Button from '@mui/joy/Button';

const MotionButton = motion(Button);
To samo co z wrapperem
const CustomMotionButton = ({ children, onClick, sx = {}, ...props }) => {
  return (
    <MotionButton
      onClick={onClick}
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1, ease: 'easeInOut' }} 
      sx={{
        mt: 0.5,
        mb: 0.5,
        ...sx,
      }}
      {...props}
    >
      {children}
    </MotionButton>
  );
};

export default CustomMotionButton;

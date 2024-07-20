import Box from "@mui/joy/Box"; // Use Box from @mui/joy
import Typography from "@mui/joy/Typography";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
    navigate("/");
};

  return (
    <Box component="div" sx={{ p: 2, display: "flex", alignItems: "center" }}>
      <Box
        component="img"
        src="bulb.png"
        alt="Logo"
        onClick={handleLogoClick}
        sx={{
          width: 30, // Set width as needed
          height: "auto", // Maintain aspect ratio
          cursor: "pointer", // Indicate clickable element
          mr: 2, // Margin to the right of the image
          filter: "invert(1)", // Apply color inversion
        }}
      />
      <Typography onClick={handleLogoClick} level="h3">
        Quizz
      </Typography>
    </Box>
  );
}

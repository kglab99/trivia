import Box from "@mui/joy/Box"; // Use Box from @mui/joy
import Typography from "@mui/joy/Typography";
import { useNavigate } from "react-router-dom";
import bulbPng from "/bulb.png";

export default function TopBar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Box component="div" sx={{ p: 2, display: "flex", alignItems: "center" }}>
      <Box
        component="img"
        src={bulbPng}
        alt="Logo"
        onClick={handleLogoClick}
        sx={{
          width: 30, 
          height: "auto",
          cursor: "pointer",
          mr: 2,
          filter: "invert(1)",
        }}
      />
      <Typography onClick={handleLogoClick} level="h3">
        Quizz
      </Typography>
    </Box>
  );
}

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { useNavigate } from "react-router-dom";
import bulbPng from "/bulb.png";

export default function TopBar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <Box
      component="div"
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={handleLogoClick}
    >
      <Box
        component="img"
        src={bulbPng}
        alt="Quiz Logo"
        sx={{
          width: 30,
          height: "auto",
          mr: 2,
          filter: "invert(1)",
        }}
      />
      <Typography
        level="h3"
      >
        Quizz
      </Typography>
    </Box>
  );
}

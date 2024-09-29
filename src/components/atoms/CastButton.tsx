import { Button, IconButton } from "@mui/material";

function CastButton({ casting }: { casting: () => void }) {
  return (
    <IconButton
      onClick={casting}
      sx={{
        color: "white",
        textTransform: "uppercase",
        width: 90,
        height: 90,
        background: "linear-gradient(-225deg, #565656 0%, #ffffff 100%)",
        boxShadow: (theme) => `0 0 0 0.3rem ${theme.palette.primary.main}`,
      }}>
      cast
    </IconButton>
  );
}

export default CastButton;

import { Button, IconButton } from "@mui/material";

function CastButton({ casting }: { casting: () => void }) {
  return (
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        casting();
      }}
      sx={{
        color: "white",
        textTransform: "uppercase",
        width: 90,
        height: 90,
        background: "linear-gradient(-225deg, #565656 0%, #ffffff 100%)",
        boxShadow: (theme) =>
          `0 0 0 0.3rem ${theme.palette.primary.main}, 5px 5px 1rem 0.5rem #00000056`,
      }}>
      cast
    </IconButton>
  );
}

export default CastButton;

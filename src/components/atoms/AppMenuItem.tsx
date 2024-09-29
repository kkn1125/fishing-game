import { IconButton } from "@mui/material";
import { ReactNode } from "react";

function AppMenuItem<T extends ReactNode>({
  icon,
  feature,
}: {
  icon: T;
  feature: () => void;
}) {
  return (
    <IconButton
      color='default'
      sx={{ background: "#ffffff56" }}
      onClick={feature}>
      {icon}
    </IconButton>
  );
}

export default AppMenuItem;

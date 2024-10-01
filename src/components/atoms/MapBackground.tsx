import { MapList } from "@common/map";
import { Box } from "@mui/material";

function MapBackground({ currentMap }: { currentMap: MapList | null }) {
  return (
    currentMap && (
      <Box
        position='fixed'
        zIndex={-1}
        top={0}
        left={0}
        bottom={0}
        right={0}
        sx={{
          backgroundImage: `url(/images/${currentMap})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    )
  );
}

export default MapBackground;

import AppMenuItem from "@atoms/AppMenuItem";
import { Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { gameState } from "@src/recoil/GameAtom";

function AppMenu() {
  const gameInfo = useRecoilValue(gameState);
  const setGameState = useSetRecoilState(gameState);
  return (
    gameInfo.mapChanged && (
      <Stack direction='row' justifyContent={"flex-end"} gap={2}>
        <AppMenuItem
          icon={<HomeIcon />}
          feature={() => {
            setGameState((gameState) => ({ ...gameState, start: false }));
          }}
        />
      </Stack>
    )
  );
}

export default AppMenu;

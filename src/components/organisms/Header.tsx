import StatsMonitor from "@atoms/StatsMonitor";
import AppMenu from "@moleculars/AppMenu";
import { Box, Toolbar } from "@mui/material";
import { gameState } from "@src/recoil/GameAtom";
import { useRecoilValue } from "recoil";

function Header() {
  const gameInfo = useRecoilValue(gameState);

  return (
    <Box>
      <StatsMonitor left='3px' top='3px' />
      {gameInfo.start && <AppMenu />}
      <Toolbar />
    </Box>
  );
}

export default Header;

import { MapList } from "@common/map";
import { Box, Button, Paper, Stack, Toolbar, Typography } from "@mui/material";
import { gameState } from "@src/recoil/GameAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";

function MainMenu() {
  const gameInfo = useRecoilValue(gameState);
  const setGameState = useSetRecoilState(gameState);

  async function changeScene(scene: MapList) {
    if (gameInfo.fadeRef) {
      setGameState((gameState) => ({ ...gameState, mapChanged: false }));
      await gameInfo.fadeRef.fadeOut();
      setGameState((gameState) => ({ ...gameState, scene }));
      await gameInfo.fadeRef.fadeIn();
      setGameState((gameState) => ({ ...gameState, mapChanged: true }));
    }
  }

  return (
    <Stack
      p={3}
      sx={{
        position: "absolute",
        left: "50%",
        top: "45%",
        transform: "translate(-50%, -50%)",
        minWidth: "50%",
        // mixBlendMode: "overlay",
      }}>
      <Box>
        <Typography
          component='h3'
          className='title'
          fontWeight={700}
          fontSize={128}
          align='center'
          m={0}
          color='white'
          sx={{
            userSelect: "none",
            lineHeight: 1,
            textShadow: "0 0 2.5px #ffffff",
          }}>
          낚시터
        </Typography>
        <Typography
          component='h5'
          className='title'
          fontWeight={700}
          fontSize={64}
          align='center'
          m={0}
          color='white'
          sx={{
            userSelect: "none",
            lineHeight: 1,
            textShadow: "0 0 2.5px #ffffff",
          }}>
          fishing
        </Typography>
      </Box>
      <Toolbar />
      <Button
        variant='contained'
        size='large'
        color='secondary'
        onClick={() => {
          setGameState((gameState) => ({ ...gameState, start: true }));
          changeScene(MapList.Beginner1);
        }}
        sx={{ fontSize: 24 }}>
        게임시작
      </Button>
    </Stack>
  );
}

export default MainMenu;

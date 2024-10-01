import CastButton from "@atoms/CastButton";
import MapBackground from "@atoms/MapBackground";
import CastingGauge from "@moleculars/CastingGauge";
import FadeTransition, {
  FadeTransitionHandles,
} from "@moleculars/FadeTransition";
import MainMenu from "@moleculars/MainMenu";
import { Stack } from "@mui/material";
import { gameState } from "@src/recoil/gameAtom";
import { Logger } from "@util/Logger";
import { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const castingZone = 1.5;
const halfLine = 50;
const logger = new Logger();

function Home() {
  const gameInfo = useRecoilValue(gameState);
  const setGameState = useSetRecoilState(gameState);
  const fadeRef = useRef<FadeTransitionHandles>(null);

  useEffect(() => {
    logger.log("load");
    if (fadeRef.current) {
      setGameState((gameState) => ({ ...gameState, fadeRef: fadeRef.current }));
    }
  }, [setGameState]);

  function casting() {
    setGameState((gameState) => ({ ...gameState, casting: true }));
  }

  function getCastingScore(score: number) {
    setGameState((gameState) => ({
      ...gameState,
      casting: false,
      castingScore: score,
    }));
  }

  return (
    <Stack flex={1}>
      <MapBackground currentMap={gameInfo.scene} />

      {!gameInfo.start && <MainMenu />}

      {gameInfo.start && !gameInfo.waiting && (
        <Stack
          gap={2}
          sx={{
            position: "fixed",
            bottom: (theme) => theme.typography.pxToRem(30),
            left: "50%",
            transform: "translateX(-50%)",
          }}>
          {gameInfo.casting && (
            <CastingGauge
              targetZoneStart={halfLine - castingZone}
              targetZoneEnd={halfLine + castingZone}
              getCastingScore={getCastingScore}
            />
          )}
          {!gameInfo.casting && gameInfo.mapChanged && (
            <CastButton casting={casting} />
          )}
        </Stack>
      )}
      <FadeTransition ref={fadeRef} />
    </Stack>
  );
}

export default Home;

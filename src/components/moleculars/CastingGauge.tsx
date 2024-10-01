// CastingGauge.tsx
import { gameState } from "@src/recoil/gameAtom";
import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";

interface GaugeProps {
  targetZoneStart: number; // 타겟 구간 시작 위치 (0 ~ 100)
  targetZoneEnd: number; // 타겟 구간 종료 위치 (0 ~ 100)
  getCastingScore: (score: number) => void;
}

const CastingGauge: React.FC<GaugeProps> = ({
  targetZoneStart,
  targetZoneEnd,
  getCastingScore,
}) => {
  const setGameState = useSetRecoilState(gameState);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<GSAPTween | null>(null);

  useEffect(() => {
    const gaugeElement = gaugeRef.current;
    const indicatorElement = indicatorRef.current;

    if (gaugeElement && indicatorElement) {
      const gaugeWidth = gaugeElement.clientWidth;
      const indicatorWidth = indicatorElement.clientWidth;

      // 인디케이터를 게이지의 전체 폭만큼 이동시키기
      animationRef.current = gsap.to(indicatorElement, {
        x: gaugeWidth - indicatorWidth,
        duration: 0.7,
        repeat: -1,
        yoyo: true,
        ease: "linear",
        onUpdate: function () {
          const indicator = indicatorRef.current;
          const gauge = gaugeRef.current;
          if (indicator && gauge) {
            const indicatorPosition = indicator.getBoundingClientRect();
            const gaugePosition = gauge.getBoundingClientRect();
            const newProgress =
              ((indicatorPosition.left - gaugePosition.left) /
                gaugePosition.width) *
              100;
            setProgress(newProgress);
          }
        },
      });
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault(); // 스페이스바의 기본 동작 방지
        if (animationRef.current) {
          animationRef.current.pause();
          calculateAccuracy();
        }
      }
    };
    const handleClick = () => {
      if (animationRef.current) {
        animationRef.current.pause();
        calculateAccuracy();
        setGameState((gameState) => ({ ...gameState, waiting: true }));
      }
    };
    const calculateAccuracy = () => {
      // 타겟 구간과의 근접도 계산
      let accuracy = 0;
      if (progress >= targetZoneStart && progress <= targetZoneEnd) {
        accuracy = 100; // 완벽한 타이밍
      } else {
        // 타겟 구간과의 거리 비율 계산
        const distance = Math.min(
          Math.abs(progress - targetZoneStart),
          Math.abs(progress - targetZoneEnd)
        );
        const maxDistance = Math.max(targetZoneStart, 100 - targetZoneEnd);
        accuracy = Math.max(0, 100 - (distance / maxDistance) * 100);
      }
      // alert(`정확도: ${accuracy.toFixed(2)}%`);
      getCastingScore(+accuracy.toFixed(2));
    };
    window.addEventListener("click", handleClick);
    // window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("click", handleClick);
      // window.removeEventListener("keydown", handleKeyDown);
    };
  }, [getCastingScore, progress, setGameState, targetZoneEnd, targetZoneStart]);

  return (
    <div
      ref={gaugeRef}
      style={{
        position: "relative",
        width: "300px",
        height: "30px",
        background: "#ddd",
        borderRadius: 5,
      }}>
      {/* 타겟 구간 표시 */}
      <div
        style={{
          position: "absolute",
          left: `${targetZoneStart}%`,
          width: `${targetZoneEnd - targetZoneStart}%`,
          height: "100%",
          background: "rgba(0, 255, 0, 0.3)",
        }}
      />
      {/* 인디케이터 */}
      <div
        ref={indicatorRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "5px",
          height: "100%",
          background: "red",
        }}
      />
    </div>
  );
};

export default CastingGauge;

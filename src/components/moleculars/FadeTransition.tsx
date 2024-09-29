// FadeTransition.tsx
import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { gsap } from "gsap";

export interface FadeTransitionHandles {
  fadeOut: () => Promise<void>;
  fadeIn: () => Promise<void>;
}

const FadeTransition = forwardRef<FadeTransitionHandles>((props, ref) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    fadeOut,
    fadeIn,
  }));

  const fadeOut = (): Promise<void> => {
    return new Promise((resolve) => {
      gsap.to(overlayRef.current, {
        duration: 0.5,
        opacity: 1,
        ease: "power2.inOut",
        onComplete: resolve,
      });
    });
  };

  const fadeIn = (): Promise<void> => {
    return new Promise((resolve) => {
      gsap.to(overlayRef.current, {
        duration: 0.5,
        opacity: 0,
        ease: "power2.inOut",
        onComplete: resolve,
      });
    });
  };

  useEffect(() => {
    gsap.set(overlayRef.current, { opacity: 0 });
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        pointerEvents: "none",
        opacity: 0,
        zIndex: 1000,
      }}
    />
  );
});

export default FadeTransition;

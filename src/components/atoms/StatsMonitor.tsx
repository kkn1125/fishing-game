import { useEffect } from "react";
import Stats from "stats.js";

function StatsMonitor({ left, top }: { left: string; top: string }) {
  useEffect(() => {
    const stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
    stats.dom.id = "stats";
    stats.dom.style.left = left;
    stats.dom.style.top = top;
    const animate = () => {
      stats.begin();
      stats.end();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    return () => {
      document.body.removeChild(stats.dom);
    };
  }, [left, top]);
  return null;
}

export default StatsMonitor;

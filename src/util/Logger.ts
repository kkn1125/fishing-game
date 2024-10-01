import dayjs from "dayjs";

export class Logger {
  private icons = ["✨", "🪵", "🐛", "⚠️", "🔥"] as const;
  private levels = ["info", "log", "debug", "warn", "error"] as const;

  context: string = "App";

  info!: (...messages: unknown[]) => void;
  log!: (...messages: unknown[]) => void;
  debug!: (...messages: unknown[]) => void;
  warn!: (...messages: unknown[]) => void;
  error!: (...messages: unknown[]) => void;

  private get timestamp() {
    return dayjs().format("HH:mm:ss.SSS");
  }

  constructor(context?: string) {
    this.update(context);
  }

  update(ctx?: string) {
    if (ctx) this.context = ctx;
    const context = this.context;
    const levels = this.levels;
    const icons = this.icons;
    const timestamp = this.timestamp;
    for (const level of levels) {
      const index = levels.indexOf(level);
      const icon = icons[index];
      this[level] = (...messages: unknown[]) => {
        console.log(
          `${icon} [${level.toUpperCase()}] [${context}] ${timestamp} ---`,
          ...messages
        );
      };
    }
  }
}

// Repositorio de la app y archivos que publica su workflow de Release. Los nombres no llevan la
// versión, así que `releases/latest/download/<archivo>` siempre apunta a la última.
// Si cambian en .github/workflows/release.yml de la app, hay que cambiarlos aquí.

export const REPO = "gt2rz/db-bridge";
export const REPO_URL = `https://github.com/${REPO}`;
export const RELEASES_URL = `${REPO_URL}/releases`;
export const AUTHOR_URL = "https://github.com/gt2rz";

export type PlatformId = "macos" | "windows" | "linux";

export interface Platform {
  id: PlatformId;
  name: string;
  asset: string;
  detail: string;
  /** Pasos para abrirla la primera vez (la app no está firmada). */
  firstRun: string[];
  /** Herramientas necesarias además de la app. */
  needs: string[];
}

export const PLATFORMS: Platform[] = [
  {
    id: "macos",
    name: "macOS",
    asset: "DB-Bridge-macOS-universal.dmg",
    detail: "Universal · Apple Silicon e Intel · macOS 11 o superior",
    firstRun: [
      "Abre el .dmg y arrastra DB Bridge a Aplicaciones.",
      "La primera vez, haz clic derecho sobre la app → Abrir → Abrir. La app aún no está firmada por Apple.",
      "Si macOS dice que está dañada, ejecuta: xattr -dr com.apple.quarantine \"/Applications/DB Bridge.app\"",
    ],
    needs: [
      "Xcode con sus herramientas de línea de comandos para el simulador de iOS.",
      "Android SDK Platform Tools (adb) para el emulador de Android.",
    ],
  },
  {
    id: "windows",
    name: "Windows",
    asset: "db-bridge-windows-x86_64.zip",
    detail: "x86_64 · Windows 10 o superior",
    firstRun: [
      "Descomprime el .zip y abre db-bridge.exe.",
      "Si SmartScreen la bloquea: Más información → Ejecutar de todas formas.",
    ],
    needs: ["Android SDK Platform Tools (adb) para el emulador de Android."],
  },
  {
    id: "linux",
    name: "Linux",
    asset: "db-bridge-linux-x86_64.tar.gz",
    detail: "x86_64 · X11 o Wayland",
    firstRun: [
      "tar -xzf db-bridge-linux-x86_64.tar.gz",
      "./db-bridge/db-bridge",
    ],
    needs: ["Android SDK Platform Tools (adb) para el emulador de Android."],
  },
];

export function downloadUrl(asset: string): string {
  return `${RELEASES_URL}/latest/download/${asset}`;
}

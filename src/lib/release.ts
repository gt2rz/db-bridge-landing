import { REPO } from "../config";

export interface Release {
  version: string;
  publishedAt: Date;
  url: string;
  /** Tamaño en bytes de cada archivo publicado. */
  sizes: Record<string, number>;
}

/**
 * Última Release de la app, leída al compilar la landing. Devuelve `null` si todavía no hay
 * ninguna o la API no responde: la página sigue funcionando porque los enlaces de descarga
 * apuntan a `releases/latest/download`.
 */
export async function getLatestRelease(): Promise<Release | null> {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  const token = import.meta.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const response = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers,
    });
    if (!response.ok) return null;
    const data = await response.json();
    return {
      version: String(data.tag_name).replace(/^v/, ""),
      publishedAt: new Date(data.published_at),
      url: data.html_url,
      sizes: Object.fromEntries(
        (data.assets ?? []).map((asset: { name: string; size: number }) => [
          asset.name,
          asset.size,
        ]),
      ),
    };
  } catch {
    return null;
  }
}

export function formatSize(bytes: number | undefined): string | null {
  if (!bytes) return null;
  return `${(bytes / 1024 / 1024).toFixed(1).replace(".", ",")} MB`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("es", { day: "numeric", month: "long", year: "numeric" }).format(
    date,
  );
}

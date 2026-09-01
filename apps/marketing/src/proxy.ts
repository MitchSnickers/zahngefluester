import { NextResponse, type NextRequest } from "next/server";
import { COM_GONE_PATHS } from "@zg/redirects";

/** 410 Gone.
 *
 *  Ab Next 16 heisst diese Datei proxy.ts, frueher middleware.ts.
 *  Wichtig: bei vorhandenem src/-Verzeichnis MUSS sie in src/ liegen -
 *  im Projektstamm wird sie stillschweigend ignoriert, und alle 410er
 *  liefern dann 404.
 *
 *  Warum ueberhaupt eine eigene Datei und kein Redirect: Next kann in redirects() nur 30x
 *  liefern. Diese URLs hatten nie Inhalt, den jemand sucht - ein 301 auf die
 *  Startseite waere ein Soft-404 und haelt die Leichen im Index. 410 nimmt sie
 *  dauerhaft raus.
 *
 *  Der Body ist absichtlich minimal und ohne Abhaengigkeit vom Layout: eine
 *  410-Antwort soll nichts rendern, was fehlschlagen kann. */
const gone = new Set(COM_GONE_PATHS);

const BODY = `<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Dauerhaft entfernt</title></head>
<body style="font-family:system-ui,sans-serif;max-width:34rem;margin:6rem auto;padding:0 1.5rem;line-height:1.6">
<h1 style="font-size:1.5rem">Diese Seite wurde dauerhaft entfernt</h1>
<p>Es gibt keinen Nachfolger. <a href="/">Zur Startseite</a></p>
</body></html>`;

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/+$/, "") || "/";
  if (gone.has(path)) {
    return new NextResponse(BODY, {
      status: 410,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
  return NextResponse.next();
}

export const config = {
  // Nur echte Seitenpfade. Assets und Bilder gehen nicht durch die Middleware.
  matcher: ["/((?!_next/|favicon.ico|robots.txt|sitemap.xml).*)"],
};

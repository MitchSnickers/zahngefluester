import Image from "next/image";

/** Portraets in einheitlichem Zuschnitt.
 *
 *  Noetig, weil die Originale von 425x425 bis 886x1920 reichen - ohne festes
 *  Seitenverhaeltnis wird das Raster unruhig. object-cover schneidet mittig zu;
 *  `object-top` haelt bei Hochformaten den Kopf im Bild statt ihn abzuschneiden.
 *
 *  Der Alternativtext wird hier erzeugt. Auf der Altseite ist er bei ALLEN
 *  Bildern leer - das ist eine Barriere fuer Menschen mit Screenreader, und sie
 *  wandert nicht mit um. */
export function Portrait({
  src,
  name,
  className = "",
  sizes = "(min-width: 1024px) 20rem, (min-width: 640px) 33vw, 100vw",
  priority = false,
}: {
  src?: string;
  name: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!src) {
    return (
      <div
        className={`aspect-4/5 w-full rounded-lg bg-sand ${className}`}
        aria-hidden="true"
      />
    );
  }
  return (
    <div className={`relative aspect-4/5 w-full overflow-hidden rounded-lg bg-sand ${className}`}>
      <Image
        src={src}
        alt={`Porträt von ${name}`}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top"
      />
    </div>
  );
}

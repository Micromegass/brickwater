import { z } from "zod";

const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);
const httpUrl = z.url({ protocol: /^https?$/ });
const optionalUrl = z.preprocess(emptyToUndefined, httpUrl.optional());

export const LocalizedTextSchema = z.object({
  de: z.string().min(1),
  en: z.string().min(1),
});
export type LocalizedText = z.infer<typeof LocalizedTextSchema>;

export const ShowStatus = z.enum([
  "scheduled",
  "cancelled",
  "postponed",
  "soldout",
]);

export const ShowSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "id: only a-z, 0-9 and hyphens"),
  date: z.iso.date(),
  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "time: use HH:MM, e.g. 20:00")
    .optional(),
  city: z.string().min(1),
  venue: z.string().min(1),
  address: z.string().min(1).optional(),
  country: z.string().regex(/^[A-Z]{2}$/).default("DE"),
  ticketUrl: optionalUrl,
  eventUrl: optionalUrl,
  note: z.union([z.string().min(1), LocalizedTextSchema]).optional(),
  status: ShowStatus.default("scheduled"),
});
export type Show = z.infer<typeof ShowSchema>;

function uniqueBy<T>(key: keyof T, label: string) {
  return (items: T[], ctx: z.RefinementCtx) => {
    const seen = new Map<unknown, number>();
    items.forEach((item, index) => {
      const value = item[key];
      const first = seen.get(value);
      if (first !== undefined) {
        ctx.addIssue({
          code: "custom",
          message: `Duplicate ${label} "${String(value)}" (also at index ${first})`,
          path: [index, key as string],
        });
      } else {
        seen.set(value, index);
      }
    });
  };
}

export const ShowsSchema = z
  .array(ShowSchema)
  .superRefine(uniqueBy<Show>("id", "show id"));

export const TrackSchema = z.object({
  n: z.int().positive(),
  title: z.string().min(1),
  duration: z
    .string()
    .regex(/^\d+:[0-5]\d$/, "duration: use m:ss")
    .optional(),
  lyrics: z.string().min(1).optional(),
});
export type Track = z.infer<typeof TrackSchema>;

export const ReleaseType = z.enum(["album", "ep", "single"]);

export const ReleaseSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string().min(1),
    altTitle: z.string().min(1).optional(),
    date: z.iso.date(),
    type: ReleaseType,
    label: z.string().min(1).optional(),
    cover: z.string().min(1),
    description: LocalizedTextSchema.optional(),
    credits: z.array(z.string().min(1)).optional(),
    tracks: z.array(TrackSchema).min(1),
    links: z
      .object({
        bandcamp: httpUrl.optional(),
        spotify: httpUrl.optional(),
        appleMusic: httpUrl.optional(),
        deezer: httpUrl.optional(),
        youtube: httpUrl.optional(),
      })
      .default({}),
    bandcampAlbumId: z.string().regex(/^\d+$/).optional(),
    bandcampTrackId: z.string().regex(/^\d+$/).optional(),
  })
  .transform((release) => ({
    ...release,
    year: Number(release.date.slice(0, 4)),
  }));
export type Release = z.infer<typeof ReleaseSchema>;

export const ReleasesSchema = z
  .array(ReleaseSchema)
  .superRefine(uniqueBy<Release>("slug", "release slug"));

export const ImagesSchema = z.record(
  z.string().regex(/^[a-z0-9-]+$/),
  z.object({
    alt: LocalizedTextSchema,
    credit: z.string().min(1).optional(),
  }),
);
export type ImageEntry = z.infer<typeof ImagesSchema>[string];

export const VideoSchema = z.object({
  id: z.string().regex(/^[A-Za-z0-9_-]{11}$/),
  title: z.string().min(1),
  kind: z.enum(["official", "session"]),
  year: z.int(),
  poster: z.string().min(1),
});
export type Video = z.infer<typeof VideoSchema>;

export const SiteSchema = z.object({
  name: z.string().min(1),
  url: z.url(),
  email: z.email(),
  city: z.string().min(1),
  country: z.string().length(2),
  frontperson: z.string().min(1),
  genres: z.array(z.string().min(1)).min(1),
  foundingYear: z.int(),
  operator: z.object({
    name: z.string().min(1),
    street: z.string().min(1),
    postalCode: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
  }),
  socials: z.record(z.string(), httpUrl),
  sameAs: z.array(httpUrl),
  fwn: z.object({
    name: z.string().min(1),
    youtube: httpUrl,
    bandcamp: httpUrl,
  }),
  videos: z.array(VideoSchema).min(1),
  appearsOn: z.array(
    z.object({
      title: z.string().min(1),
      year: z.int(),
      track: z.string().min(1),
      url: httpUrl,
    }),
  ),
});
export type Site = z.infer<typeof SiteSchema>;

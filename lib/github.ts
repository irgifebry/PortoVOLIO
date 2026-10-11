/* ------------------------------------------------------------------
   GitHub commit activity for the hero card.

   Reads the public contribution calendar through GitHub's GraphQL API.
   That endpoint is authenticated, so it needs `GITHUB_TOKEN` in the
   environment (a classic PAT with `read:user` is enough -- no other
   scope is used or needed).

   Every failure path -- missing token, network error, non-2xx, GraphQL
   errors, empty calendar -- resolves to `null`. The caller renders
   nothing in that case. There is deliberately no placeholder and no
   seeded fallback, so a broken token can never be mistaken for real
   activity.

   Server-only: the token is read from the environment and never crosses
   into the client bundle.
   ------------------------------------------------------------------ */

import { cache } from "react";

const ENDPOINT = "https://api.github.com/graphql";
const USERNAME = "irgifebry";

/** Columns rendered in the grid. 26 fits the hero card without dots
    shrinking below ~8px. */
export const ACTIVITY_WEEKS = 26;

/** GitHub's own calendar cache is measured in hours; matching that is
    plenty for a portfolio and stays far from the 5k/hr rate limit. */
const REVALIDATE_SECONDS = 3600;

const DAY_MS = 86_400_000;

export type ContributionDay = {
  /** YYYY-MM-DD, always UTC. */
  date: string;
  count: number;
  /** Colour bucket, 0-4. See `levelThresholds` for how these are cut. */
  level: number;
};

/** One week, Sunday first. `null` is padding outside the queried range
    (or a day GitHub did not report) and renders as an empty slot. */
export type ActivityWeek = (ContributionDay | null)[];

export type Activity = {
  total: number;
  weeks: ActivityWeek[];
};

type CalendarResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions?: number;
          weeks?: {
            contributionDays?: { date: string; contributionCount: number }[];
          }[];
        };
      };
    };
  };
  errors?: unknown[];
};

const CALENDAR_QUERY = `
  query ($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Inclusive UTC range ending today, exactly `weeks * 7` days long. */
function requestedRange(weeks: number): { from: string; to: string } {
  const now = new Date();
  const to = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  const from = new Date(to.getTime() - (weeks * 7 - 1) * DAY_MS);
  return { from: isoDay(from), to: isoDay(to) };
}

/**
 * Buckets are cut on the quartiles of the *non-zero* days rather than on
 * fixed cut-offs. Activity is heavily right-skewed -- one 50-commit day
 * among many single-commit days -- so fixed thresholds pile nearly half
 * the active days into the brightest swatch and the grid reads as flat.
 * Quartiles spread them across all four levels, which is also what
 * github.com's own graph does.
 */
function levelThresholds(days: { count: number }[]): [number, number, number] {
  const active = days
    .map((day) => day.count)
    .filter((count) => count > 0)
    .sort((a, b) => a - b);
  if (!active.length) return [0, 0, 0];
  const at = (p: number) => active[Math.min(active.length - 1, Math.floor(p * active.length))];
  return [at(0.25), at(0.5), at(0.75)];
}

function bucket(count: number, [p25, p50, p75]: [number, number, number]): number {
  if (count <= 0) return 0;
  if (count <= p25) return 1;
  if (count <= p50) return 2;
  if (count <= p75) return 3;
  return 4;
}

/**
 * Regroup a flat day list into column-major weeks, padded so that every
 * day sits on its real weekday row and the grid stays rectangular.
 */
function toWeeks(
  days: { date: string; count: number }[],
  from: string,
  to: string,
): ActivityWeek[] {
  const counts = new Map(days.map((day) => [day.date, day.count]));
  const cuts = levelThresholds(days);

  const start = new Date(`${from}T00:00:00Z`);
  const end = new Date(`${to}T00:00:00Z`);
  const span = Math.round((end.getTime() - start.getTime()) / DAY_MS) + 1;

  // Lead with blanks until the first day lands on its own weekday row.
  const cells: (ContributionDay | null)[] = Array.from(
    { length: start.getUTCDay() },
    () => null,
  );

  for (let i = 0; i < span; i += 1) {
    const date = isoDay(new Date(start.getTime() + i * DAY_MS));
    const count = counts.get(date);
    cells.push(
      count === undefined ? null : { date, count, level: bucket(count, cuts) },
    );
  }

  const weeks: ActivityWeek[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  const last = weeks[weeks.length - 1];
  while (last && last.length < 7) last.push(null);

  return weeks;
}

async function fetchActivity(): Promise<Activity | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn(
      "[github] GITHUB_TOKEN is not set -- the activity grid will be omitted.",
    );
    return null;
  }

  const { from, to } = requestedRange(ACTIVITY_WEEKS);

  let response: Response;
  try {
    response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CALENDAR_QUERY,
        variables: {
          login: USERNAME,
          from: `${from}T00:00:00Z`,
          to: `${to}T23:59:59Z`,
        },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });
  } catch (error) {
    console.error("[github] contribution request failed", error);
    return null;
  }

  if (!response.ok) {
    console.error(`[github] contribution request returned ${response.status}`);
    return null;
  }

  const payload = (await response.json()) as CalendarResponse;

  if (payload.errors?.length) {
    console.error("[github] contribution query errored", payload.errors);
    return null;
  }

  const calendar = payload.data?.user?.contributionsCollection
    ?.contributionCalendar;
  const weeks = calendar?.weeks;
  if (!weeks?.length) return null;

  const days = weeks.flatMap((week) =>
    (week.contributionDays ?? []).map((day) => ({
      date: day.date,
      count: day.contributionCount,
    })),
  );
  if (!days.length) return null;

  return {
    total: calendar?.totalContributions ?? 0,
    weeks: toWeeks(days, from, to),
  };
}

/** Deduped per request; the underlying fetch is revalidated hourly. */
export const getActivity = cache(fetchActivity);
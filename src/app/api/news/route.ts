import { client } from "@/sanity/client";
import {
  EditoChoiceQuery,
  heroQuery,
  spacesQuery,
  geopoliticsQuery,
  tradeQuery,
  humanitarianQuery,
  conflictQuery,
  regionSpotlightQuery,
} from "@/sanity/queries";
import { NewsResponse } from "@/types";

export async function GET(): Promise<Response> {
  try {
    const hero = await client.fetch(heroQuery);
    const editoChoice = await client.fetch(EditoChoiceQuery);

    // Fetch 4 latest articles for each tag
    const spaces = await client.fetch(spacesQuery, { tag: "Space" } as any);
    // console.log(spaces);
    const geopolitics = await client.fetch(geopoliticsQuery, {
      tag: "Geopolitics",
    } as any);
    const trade = await client.fetch(tradeQuery, { tag: "Trade" } as any);
    const humanitarian = await client.fetch(humanitarianQuery, {
      tag: "Humanitarian",
    } as any);
    const conflict = await client.fetch(conflictQuery, {
      tag: "Conflict",
    } as any);
    const regionSpotlight = await client.fetch(regionSpotlightQuery);

    const response: NewsResponse = {
      message: "Success Get News Homepage",
      success: true,
      data: {
        hero,
        editoChoice,
        spaces,
        geopolitics,
        trade,
        humanitarian,
        conflict,
        regionSpotlight,
      },
    };

    return Response.json(response);
  } catch (err) {
    const errorResponse = {
      message: "Error fetching news data",
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };

    return Response.json(errorResponse, { status: 500 });
  }
}

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
  exclusiveQuery
} from "@/sanity/queries";
import { NewsResponse } from "@/types";

export async function GET(): Promise<Response> {
  try {
    const hero = await client.fetch(heroQuery);
    const editoChoice = await client.fetch(EditoChoiceQuery);

    // Fetch 4 latest articles for each category
    const spaces = await client.fetch(spacesQuery);
    const geopolitics = await client.fetch(geopoliticsQuery);
    const trade = await client.fetch(tradeQuery);
    const humanitarian = await client.fetch(humanitarianQuery);
    const conflict = await client.fetch(conflictQuery);
    const regionSpotlight = await client.fetch(regionSpotlightQuery);
    const exclusive = await client.fetch(exclusiveQuery);

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
        exclusive,
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

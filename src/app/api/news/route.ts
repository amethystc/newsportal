import { client } from "@/sanity/client";
import { EditoChoiceQuery, heroQuery } from "@/sanity/queries";
import { NewsResponse } from "@/types";

export async function GET(): Promise<Response> {
  try {
    const hero = await client.fetch(heroQuery);
    const editoChoice = await client.fetch(EditoChoiceQuery);
    
    const response: NewsResponse = {
      message: "Success Get News Homepage",
      success: true,
      data: {
        hero,
        editoChoice,
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

import { getHashAPI } from "@utils";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { heroId: number } }) {
  const { heroId } = params;
  const { timestamp, hash } = getHashAPI();

  const api = `${process.env.NEXT_MARVEL_URI}/v1/public/characters/${heroId}?ts=${timestamp}&apikey=${process.env.NEXT_MARVEL_PUBLIC_API_KEY}&hash=${hash}`;

  try {
    if (!heroId) {
      return NextResponse.json({});
    }

    const responseMarvelAPI = await fetch(api, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      next: {
        revalidate: 60
      }
    });
    const data = await responseMarvelAPI.json();
    const hero = data.data.results[0];
    const { name, description, thumbnail } = hero;

    return NextResponse.json({ name, description, thumbnail });
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({ heroId });
}

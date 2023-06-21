import { NextResponse } from "next/server";
import { getHashAPI } from "@utils";

export type HeroesResponseAPI = {
  id: number;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

export async function POST(request: Request) {
  const { name } = await request.json();
  const { timestamp, hash } = getHashAPI();

  const api = `${process.env.NEXT_MARVEL_URI}/v1/public/characters?nameStartsWith=${name}&orderBy=name&limit=10&ts=${timestamp}&apikey=${process.env.NEXT_MARVEL_PUBLIC_API_KEY}&hash=${hash}`;

  try {
    if (!name) {
      return NextResponse.json([]);
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
    const heroes = data.data.results;

    const heroesAutoComplete = heroes.map(({ id, name, thumbnail }: HeroesResponseAPI) => ({
      id,
      name,
      thumbnail,
    }));

    return NextResponse.json(heroesAutoComplete);
  } catch (error) {
    console.error(error);
  }
}

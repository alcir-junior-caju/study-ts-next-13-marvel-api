"use client";

import { Children, useEffect, useState } from "react";
import { useDebounce } from "@hooks";
import Image from "next/image";
import { HeroesResponseAPI } from "./api/heroes/route";
import { styled } from "styled-components";
import Link from "next/link";

const HeroesList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  width: 100%;
`;

const HeroLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  text-decoration: none;
  color: #312e38;
  transition: background-color 0.2s;
  padding: 4px;

  &:hover {
    background-color: #fafafa;
  }

  & > img {
    border-radius: 50%;
    margin-right: 8px;
  }
`;

export default function Home() {
  const [name, setName] = useState('');
  const [heroes, setHeroes] = useState<HeroesResponseAPI[]>([]);
  const debouncedHeroes = useDebounce(name, 350);

  async function fetchHeroes(name: string) {
    if (!name) return;

    try {
      const response = await fetch(`api/heroes`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({ name }),
        next: {
          revalidate: 60
        }
      });

      const data = await response.json();

      setHeroes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (debouncedHeroes) fetchHeroes(name);
    if (!name) setHeroes([]);
  }, [name, debouncedHeroes]);

  return (
    <main>
      <h3>Digite o nome do seu super herói preferido</h3>
      <input type="text" placeholder="Iron man" onChange={e => setName(e.target.value)} />

      {Array.isArray(heroes) && heroes.length ? (
        <HeroesList>
          {Children.toArray(heroes.map(hero => (
            <HeroLink href={`/hero/${hero?.id}`}>
              <Image
                src={hero?.thumbnail?.path + '.' + hero?.thumbnail?.extension}
                alt={hero.name}
                width={50}
                height={50}
              />
              <span>{hero.name}</span>
            </HeroLink>
          )))}
        </HeroesList>
      ) : (
        <span></span>
      )}
    </main>
  )
}

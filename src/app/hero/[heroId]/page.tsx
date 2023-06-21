"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

type HeroProps = {
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

const HeroContainer = styled.div`
  display: flex;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  max-width: calc(100% - 320px);
  width: 100%;

  & > img {
    border-radius: 5%;
    margin-right: 16px;
  }
`;

const HeroLink = styled(Link)`
  text-decoration: none;
  color: #312e38;
`;

export default function Hero({ params }: { params: { heroId: number }}) {
  const [isLoading, setLoading] = useState(false);
  const [hero, setHero] = useState<HeroProps>();

  async function fetchHero(heroId: number) {
    if (!heroId) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/hero/${heroId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        next: {
          revalidate: 60
        }
      });

      const data = await response.json();
      setHero(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (params?.heroId) fetchHero(params.heroId);
  }, [params.heroId]);

  if (isLoading) return <h4>Carregando...</h4>;

  return (
    <>
      <HeroContainer>
        {hero?.thumbnail && (
          <Image
            src={hero?.thumbnail?.path + '.' + hero?.thumbnail?.extension}
            alt={hero?.name || 'Hero image'}
            width={190}
            height={190}
          />
        )}
        <div>
          <h1>{hero?.name}</h1>
          <p>{hero?.description || `Sem descrição`}</p>
        </div>
      </HeroContainer>
      <HeroLink href="/">Voltar para home</HeroLink>
    </>
  );
}

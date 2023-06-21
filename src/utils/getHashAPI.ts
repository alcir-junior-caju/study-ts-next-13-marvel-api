import md5 from "md5";

export function getHashAPI() {
  const timestamp = new Date().toISOString();
  const hash = md5(timestamp + process.env.NEXT_MARVEL_PRIVATE_API_KEY + process.env.NEXT_MARVEL_PUBLIC_API_KEY);

  return {
    timestamp,
    hash,
  };
}

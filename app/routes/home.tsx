import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Groove" },
    { name: "description", content: "Experience music with Groove!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: "Groove" };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <>{loaderData.message}</>;
}

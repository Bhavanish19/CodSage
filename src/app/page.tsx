import Link from "next/link";
import { api, HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/button";


export default async function Home() {
  // return <h1 className="text-red-600">Hello World</h1>;
  return <Button>click me </Button>
}

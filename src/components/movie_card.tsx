import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import demonPoster from "../assets/demon_slayer_poster.jpg";

export function MovieCard() {
  return (
    <Item variant="outline" className="flex flex-col w-48 hover:cursor-pointer">
      <img
        src={demonPoster}
        alt="Demon Slayer Poster"
        className="rounded-sm  object-cover"
      />

      <ItemContent>
        <ItemTitle>Demon Slayer</ItemTitle>
      </ItemContent>
    </Item>
  );
}

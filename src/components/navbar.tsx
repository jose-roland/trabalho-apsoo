import { Button } from "@/components/ui/button";
import { Clapperboard, Home, Search, User } from "lucide-react";

export default function Navbar() {
  return (
    <section className="flex flex-row flex-wrap w-lg justify-center p-4 rounded-4xl bg-orange-50 sticky top-0 z-1">
      <Button
        variant="ghost"
        className="text-xl hover:cursor-pointer hover:bg-transparent"
      >
        <Home className="size-5" />
        Home
      </Button>
      <Button
        variant="ghost"
        className="text-xl hover:cursor-pointer hover:bg-transparent"
      >
        <Clapperboard className="size-5" />
        Filmes
      </Button>
      <Button
        variant="ghost"
        className="text-xl hover:cursor-pointer hover:bg-transparent"
      >
        <Search className="size-5" />
        Pesquisar
      </Button>
      <Button
        variant="ghost"
        className="text-xl hover:cursor-pointer hover:bg-transparent"
      >
        <User className="size-5" />
        Entrar
      </Button>
    </section>
  );
}

// export default Navbar;

import { CarouselDemo } from "@/components/carousel";
import { MovieCard } from "@/components/movie_card";
import Navbar from "@/components/navbar";
import { Card, CardHeader } from "@/components/ui/card";

function App() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 p-4">
      <Navbar />
      <CarouselDemo />

      <Card className="w-4xl p-4">
        <CardHeader className="font-bold">Em cartaz</CardHeader>
        <MovieCard />{" "}
      </Card>
    </section>
  );
}

export default App;

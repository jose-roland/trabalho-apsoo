import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo() {
  return (
    <Carousel className=" aspect-video w-4xl">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <section className="">
              <Card>
                <img
                  src={`https://picsum.photos/seed/${index + 10}/1280/720`}
                  alt=""
                  className="rounded-sm"
                />
              </Card>
            </section>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

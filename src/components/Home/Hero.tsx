import { ArrowRight } from "lucide-react";
import IconButton from "../common/IconButton";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 items-center justify-between py-12">
      <div className="space-y-8 lg:max-w-xl">
        <h1>Crafted for modern living</h1>
        <p>
          Discover curated home goods that blend timeless design with
          exceptional craftsmanship. Every piece selected to elevate your
          everyday.
        </p>
        <div className="space-x-4">
          <IconButton to={"/products"}>
            Explore Collection
            <ArrowRight />
          </IconButton>
          <Button variant={"outline"}>Our Story</Button>
        </div>
      </div>
      <img
        src="hero.jpg"
        alt="bedroom"
        className="w-full h-96 lg:w-170 lg:h-full rounded-xl"
      />
    </div>
  );
};
export default Hero;

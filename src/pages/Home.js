import { useState } from "react";
import Intro from "./Intro";
import Contoh1 from "./Contoh1";
import Contoh2 from "./Contoh2";
import Contoh3 from "./Contoh3";
import Contoh4 from "./Contoh4";

export default function Home() {
  const [slide, setSlide] = useState(0);

  console.log("slide: ", slide);

  return (
    <div className="bg-image h-full text">
      <Intro slide={slide} setSlide={setSlide} />
      <Contoh1 slide={slide} setSlide={setSlide} />
      <Contoh2 slide={slide} setSlide={setSlide} />
      <Contoh3 slide={slide} setSlide={setSlide} />
      <Contoh4 slide={slide} setSlide={setSlide} />
    </div>
  );
}

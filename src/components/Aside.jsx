export default function Aside() {
  const initialPath = `M100 0 L100 ${window.innerHeight} Q-100 ${
    window.innerHeight / 2
  } 100 0`;
  return (
    <div className="flex flex-col w-full relative z-50">
      <MainSection />
      <SloganSection />
      <VideoSection />
      <CarouselSection />
      <CardSection />
      <AboutSection />
    </div>
  );
}

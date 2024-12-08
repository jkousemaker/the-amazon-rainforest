import ShimmerButton from "../magicui/shimmer-button";

export default function DownloadSection() {
  return (
    <section className="flex flex-col w-full relative z-50 py-20 bg-[#283e01] gap-10 justify-center items-center">
      <h1 className="text-6xl">Explore our Experience</h1>
      <ShimmerButton className="text-2xl px-20">Download</ShimmerButton>
    </section>
  );
}

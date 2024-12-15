import ShimmerButton from "../magicui/shimmer-button";

export default function DownloadSection() {
  return (
    <section className="flex flex-col w-full relative z-50 py-20 pb-30 bg-[#283e01] gap-10 justify-center items-center">
      <h3 className="text-5xl font-light tracking-normal text-white">
        Explore our Interactive Experience
      </h3>
      <ShimmerButton className="text-2xl px-20">Download</ShimmerButton>
    </section>
  );
}

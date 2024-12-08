import { interpolate } from "flubber";
import { MotionValue, useTransform } from "framer-motion";
import getIndex from "./getIndex";

const useFlubber = (progress: MotionValue<number>, paths: string[]) => {
  return useTransform(progress, paths.map(getIndex), paths, {
    mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.1 }),
  });
};

export default useFlubber;

import {
  useTiming,
  Skia,
  Paint,
  SweepGradient,
  vec,
  size,
  Canvas,
  Path,
  Vector,
  Circle,
} from "@shopify/react-native-skia";
import { PropsWithChildren, useMemo } from "react";
import { Easing } from "react-native";

const fromCircle = (center: Vector, r: number) => {
  "worklet";
  return Skia.XYWHRect(center.x - r, center.y - r, r * 2, r * 2);
};

type Props = {};

export const RotatingBorderIcon = (props: PropsWithChildren<Props>) => {
  const size = 150;
  const radius = size / 2;
  const strokeWidth = radius * 0.05;
  const progress = useTiming(
    { from: 0, to: 1, loop: true },
    { duration: 2000, easing: Easing.out(Easing.cubic) },
  );

  const borderPath = useMemo(() => {
    const path = Skia.Path.Make();

    // path.addCircle(center.x, center.y, radius);
    // path.moveTo(size, size - radius);

    path.addArc(
      // fromCircle(vec(size, size), radius),
      {
        x: strokeWidth,
        y: strokeWidth,
        width: size - strokeWidth * 2,
        height: size - strokeWidth * 2,
      },
      180,
      360,
    );

    return path;
  }, [strokeWidth]);

  return (
    <Canvas
      style={{
        width: "100%",
        height: size + strokeWidth * 2,
      }}
    >
      <Path
        path={borderPath}
        color="transparent"
        style="stroke"
        strokeCap="round"
        strokeWidth={strokeWidth}
        end={progress}
      >
        <Paint
          style="stroke"
          strokeWidth={strokeWidth}
          strokeCap="round"
          // color="red"
        >
          <SweepGradient
            colors={["#FF0000", "#00FF00", "#0000FF", "#FF0000"]}
            c={vec(size / 2, size / 2 - strokeWidth)}
            start={0}
            end={360}
          />
        </Paint>
      </Path>
      <Circle
        color="black"
        c={vec(size / 2, size / 2)}
        r={size / 3 - strokeWidth}
      />
    </Canvas>
  );
};

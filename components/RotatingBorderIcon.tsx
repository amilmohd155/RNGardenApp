import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import {
  Skia,
  Paint,
  SweepGradient,
  vec,
  Canvas,
  Path,
  Vector,
  useSVG,
  ImageSVG,
  Group,
  DataSourceParam,
  fitbox,
  rect,
} from "@shopify/react-native-skia";
import { PropsWithChildren, useMemo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import {
  Easing,
  SharedValue,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const clampValue = (
  value: number,
  threshold: number,
  // minThreshold: number,
): number => {
  "worklet";
  const abs = Math.abs(value);
  const normalized = abs / threshold;

  return Math.min(normalized, 1);
};

const fromCircle = (center: Vector, r: number) => {
  "worklet";
  return Skia.XYWHRect(center.x, center.y, r, r);
};

type Props = {
  translateX: SharedValue<number>;
  layoutHeight?: number;
  svg?: DataSourceParam;
  rightThreshold?: number;
  leftThreshold?: number;
  right?: boolean;
  colors?: string[];
};

export const RotatingBorderIcon = ({
  layoutHeight: size = 140,
  translateX,
  rightThreshold = size,
  leftThreshold = size,
  svg: inputSVG = require("@/assets/icons/trash.svg"),
  colors = ["#FFC107", "#FF9800"],
  right = false,
  children,
}: PropsWithChildren<Props>) => {
  const percentage = useSharedValue(0);

  const x = size / 4;
  const y = size / 4;
  const radius = size / 2;
  const strokeWidth = radius * 0.05;

  const threshold = right ? rightThreshold : leftThreshold;

  useDerivedValue(() => {
    const value = translateX.value;

    percentage.value = withTiming(clampValue(value, threshold), {
      duration: 200,
      easing: Easing.ease,
    });
  });

  // SVG
  const svg = useSVG(inputSVG);
  const svgPaint = useSharedValue(Skia.Paint());
  useAnimatedReaction(
    () => {
      return percentage.value;
    },
    (opacity) => {
      svgPaint.value.setAlphaf(opacity);
    },
  );

  // Border Path
  const borderPath = useMemo(() => {
    const path = Skia.Path.Make();
    if (!right) {
      path.addArc(fromCircle(vec(x, y), radius), 0, 180);
    }
    path.addArc(fromCircle(vec(x, y), radius), 180, 360);
    return path;
  }, [radius, right, x, y]);

  return (
    <Canvas
      style={[
        {
          position: "absolute",
          width: size,
          height: size,
          alignItems: "center",
          // backgroundColor: "red",
        },
        right ? { right: 0 } : { left: 0 },
      ]}
    >
      <Path
        path={borderPath}
        color="transparent"
        style="stroke"
        strokeCap="round"
        strokeWidth={strokeWidth}
        end={percentage}
      >
        <Paint style="stroke" strokeWidth={strokeWidth} strokeCap="round">
          <SweepGradient
            colors={colors}
            c={vec(size / 2, size / 2)}
            start={0}
            end={360}
          />
        </Paint>
      </Path>
      {svg && (
        <Group layer={svgPaint}>
          <ImageSVG
            svg={svg}
            x={size / 2}
            y={size / 2}
            width={size / 4}
            height={size / 4}
          />
        </Group>
      )}
    </Canvas>
  );
};

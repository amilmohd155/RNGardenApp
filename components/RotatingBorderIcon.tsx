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

const TRANSLATE_X_THRESHOLD = SCREEN_WIDTH * 0.3;
const MIN_TRANSLATE_X = SCREEN_WIDTH * 0.1;

const clampValue = (value: number, threshold: number): number => {
  "worklet";
  const abs = Math.abs(value);
  const normalized = abs / threshold;
  const normalizedMinThreshold = MIN_TRANSLATE_X / threshold;

  if (normalized < normalizedMinThreshold) return 0;
  return Math.min(normalized - normalizedMinThreshold, 1);
};

const fromCircle = (center: Vector, r: number) => {
  "worklet";
  return Skia.XYWHRect(center.x, center.y, r, r);
};

type Props = {
  translateX: SharedValue<number>;
  layoutHeight?: number;
  svg?: DataSourceParam;
  right?: boolean;
};

export const RotatingBorderIcon = ({
  layoutHeight: size = 140,
  translateX,
  svg: inputSVG = require("@/assets/icons/trash.svg"),

  right = false,
  children,
}: PropsWithChildren<Props>) => {
  const percentage = useSharedValue(0);

  const x = size / 4;
  const y = size / 4;
  const radius = size / 2;
  const strokeWidth = radius * 0.05;

  useDerivedValue(() => {
    const value = translateX.value;

    percentage.value = withTiming(clampValue(value, TRANSLATE_X_THRESHOLD), {
      duration: 200,
      easing: Easing.linear,
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
    path.addArc(fromCircle(vec(x, y), radius), 180, 360);
    return path;
  }, [radius, x, y]);

  return (
    <Canvas
      style={[
        {
          position: "absolute",
          width: size,
          height: size,
          alignItems: "center",
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
            colors={["#FF0000", "#00FF00", "#0000FF", "#FF0000"]}
            c={vec(size / 2, size / 2)}
            start={0}
            end={360}
          />
        </Paint>
      </Path>
      {svg && (
        <Group
          layer={svgPaint}
          // transform={fitbox(
          //   "contain",
          //   rect(0, 0, 32, 40),
          //   rect(0, 0, size, size),
          // )}
        >
          <ImageSVG
            svg={svg}
            x={size / 3}
            y={size / 3}
            width={size / 3}
            height={size / 3}
          />
        </Group>
      )}
    </Canvas>
  );
};

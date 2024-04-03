module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["react-native-worklets-core/plugin"],
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind",
        },
      ],
      "nativewind/babel",
    ],
  };
};

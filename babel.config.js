module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          lazyImports: true,
          jsxImportSource: "nativewind",
        },
      ],
      "nativewind/babel",
    ],
    plugins: [
      "react-native-worklets-core/plugin",
      ["inline-import", { extensions: [".sql"] }],
    ],
  };
};

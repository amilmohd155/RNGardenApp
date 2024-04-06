module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      "react-native-worklets-core/plugin",
      ["inline-import", { extensions: [".sql"] }],
    ],
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
  };
};

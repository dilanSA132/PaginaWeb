self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [
    "static/chunks/webpack.js",
    "static/chunks/main-app.js"
  ],
  "pages": {
    "/": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/index.js"
    ],
    "/_app": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
    ],
    "/categories": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/categories.js"
    ],
    "/marketing": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/marketing.js"
    ],
    "/menu": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/menu.js"
    ],
    "/orders": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/orders.js"
    ],
    "/products": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/products.js"
    ],
    "/saleMaintenance": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/saleMaintenance.js"
    ],
    "/userMaintenance": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/userMaintenance.js"
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];
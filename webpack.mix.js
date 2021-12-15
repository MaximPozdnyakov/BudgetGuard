const mix = require("laravel-mix");

mix.webpackConfig({ devtool: "inline-source-map" });

mix.react("resources/js/app.js", "public/js")
    .sass("resources/sass/app.scss", "public/css")
    .sourceMaps();

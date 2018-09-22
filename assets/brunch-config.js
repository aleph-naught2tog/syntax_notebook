exports.config = {
    files: {
        stylesheets: {
            joinTo: "css/app.css"
        }
    },

    conventions: {
        assets: /^(static)/
    },

    // Phoenix paths configuration
    paths: {
        watched: [
            "static",
            "css",
            "vendor"
        ],
        public: "../priv/static"
    }
};

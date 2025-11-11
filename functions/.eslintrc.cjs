module.exports = {
    env: { node: true, es2021: true },
    overrides: [
        {
            files: ["**/*.js"],
            rules: {
                "no-constant-condition": "off" // or keep on and see Step 4
            }
        }
    ]
};

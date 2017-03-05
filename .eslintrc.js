module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 2],
        "linebreak-style": ["error", "unix"],
        "no-console": ["error", { allow: ["warn", "error"] }],
        "quotes": ["error", "single"],
        "semi": ["error", "always"]
    }
};

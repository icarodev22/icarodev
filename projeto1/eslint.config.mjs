import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", "coverage/**"] },
  {
    rules: {
      // Defesa contra XSS: proíbe HTML bruto em componentes.
      "react/no-danger": "error",
      "no-restricted-syntax": [
        "error",
        { selector: "MemberExpression[property.name='innerHTML']", message: "Não use innerHTML (risco de XSS)." },
      ],
    },
  },
];
export default config;

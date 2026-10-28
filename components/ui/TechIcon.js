import {
  siApple, siSwift, siXcode, siApplepay, siAndroid, siKotlin, siJetpackcompose, siGoogleplay, siReact, siTypescript,
  siExpo, siJavascript, siFlutter, siDart, siFirebase, siAnthropic, siGooglegemini, siGithubactions, siFigma,
  siUnity, siDotnet, siUnrealengine, siCplusplus, siPlaystation, siSteam, siMeta, siOculus, siBlender, siAutodeskmaya,
  siHoudini, siHuggingface, siPytorch, siLangchain, siPython, siN8n, siZapier, siHubspot, siTensorflow, siFastapi,
  siPostgresql, siNextdotjs, siShopify, siStripe, siVercel, siNodedotjs, siGraphql, siRedis, siThreedotjs, siPaypal,
  siGoogleads, siTiktok, siSnapchat, siAppstore, siGoogleanalytics, siSentry, siDatadog, siMixpanel, siGrafana, siJira,
} from 'simple-icons';

const ICONS = {
  apple: siApple, swift: siSwift, xcode: siXcode, applepay: siApplepay, android: siAndroid, kotlin: siKotlin,
  compose: siJetpackcompose, googleplay: siGoogleplay, react: siReact, typescript: siTypescript, expo: siExpo,
  javascript: siJavascript, flutter: siFlutter, dart: siDart, firebase: siFirebase, anthropic: siAnthropic,
  gemini: siGooglegemini, githubactions: siGithubactions, figma: siFigma, unity: siUnity, dotnet: siDotnet,
  unreal: siUnrealengine, cpp: siCplusplus, playstation: siPlaystation, steam: siSteam, meta: siMeta, oculus: siOculus,
  blender: siBlender, maya: siAutodeskmaya, houdini: siHoudini, huggingface: siHuggingface, pytorch: siPytorch,
  langchain: siLangchain, python: siPython, n8n: siN8n, zapier: siZapier, hubspot: siHubspot, tensorflow: siTensorflow,
  fastapi: siFastapi, postgresql: siPostgresql, nextjs: siNextdotjs, shopify: siShopify, stripe: siStripe, vercel: siVercel,
  nodejs: siNodedotjs, graphql: siGraphql, redis: siRedis, threejs: siThreedotjs, paypal: siPaypal, googleads: siGoogleads,
  tiktok: siTiktok, snapchat: siSnapchat, appstore: siAppstore, analytics: siGoogleanalytics, sentry: siSentry,
  datadog: siDatadog, mixpanel: siMixpanel, grafana: siGrafana, jira: siJira,
};

// near-black brand colours (Apple, Next.js, Unreal…) would vanish on the dark cards, so they glow white instead
const glow = (hex) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 70 ? '#ffffff' : `#${hex}`;
};

export function techIcon(key) {
  const icon = ICONS[key];
  return icon && { title: icon.title, color: glow(icon.hex), path: icon.path };
}

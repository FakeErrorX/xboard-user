// types
import { DefaultConfigProps } from "@/types/config";

export const drawerWidth = 260;

// ==============================|| THEME CONFIG  ||============================== //

const getGA = () => {
  if (import.meta.env.DEV) {
    return "";
  }

  switch (window.location.hostname) {
    case "proxybd.com":
      return "G-HSJEER5NF4";
    case "www.proxybd.com":
      return "G-D6GDYEWSQT";
    default:
      return "";
  }
};

const config: DefaultConfigProps = {
  defaultPath: "/",
  fontFamily: `'Public Sans', sans-serif`,
  miniDrawer: false,
  container: true,
  themeDirection: "ltr",
  title: "XBoard",
  title_split: " - ",
  background_url: "https://unsplash.com/random",
  description: "Fast and Secure VPN Service",
  logo: "",
  api: "https://api.proxybd.com",
  languages: ["en"],
  googleAnalytics: {
    measurementId: getGA()
  },
  emojiEndpoint: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/{{code}}.png",
  startYear: 2021
};

export default config;

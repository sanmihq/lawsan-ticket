import { Poppins, Space_Mono } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

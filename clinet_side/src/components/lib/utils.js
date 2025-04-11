import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const steps = [
  { key: "INITIATED", label: "Order Placed", icon: "order-placed.png" },
  { key: "PLACED", label: "Packaging", icon: "order-packaging.png" },
  { key: "DELIVERED", label: "On The Road", icon: "order-road.png" },
  { key: "COMPLETED", label: "Delivered", icon: "order-delivered.png" },
];

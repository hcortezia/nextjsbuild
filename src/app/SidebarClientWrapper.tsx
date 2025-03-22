"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { FormBuild } from "./components_build/FormBuild/FormBuild";
import { ComponentConfig } from "./components_build/FormBuild/types";

export default function SidebarClientWrapper() {
  const pathname = usePathname();
  const hiddenRoutes = ["/docs"];

  if (hiddenRoutes.includes(pathname)) return null; // Oculta o sidebar

  const [selectedVersion, setSelectedVersion] = useState("1.0.0");

  const sidebarConfig: ComponentConfig = {
    xtype: "sidebarProvider",
    items: [
      {
        xtype: "sidebar",
        // ... restante da configuração
      },
    ],
  };

  return <FormBuild config={sidebarConfig} />;
}

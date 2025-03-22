"use client";

// app/app-sidebar-example/page.tsx
import React, { useState } from 'react';
import { FormBuild } from './components_build/FormBuild/FormBuild';
import { ComponentConfig } from './components_build/FormBuild/types';

export default function AppSidebarExample() {
  // Dados para o sidebar
  const sidebarData = {
    versions: ["1.0.0", "1.1.0-beta", "2.0.0-alpha"],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: "home",
        isActive: true,
      },
      {
        title: "Settings",
        url: "#",
        icon: "settings",
      },
      {
        title: "Users",
        url: "#",
        icon: "users",
      },
    ],
    navSections: [
      {
        title: "Getting Started",
        url: "#",
        items: [
          {
            title: "Installation",
            url: "#",
          },
          {
            title: "Project Structure",
            url: "#",
          },
        ],
      },
      {
        title: "Features",
        url: "#",
        items: [
          {
            title: "Authentication",
            url: "#",
          },
          {
            title: "Data Management",
            url: "#",
            isActive: true,
          },
          {
            title: "Notifications",
            url: "#",
          },
          {
            title: "Analytics",
            url: "#",
          },
        ],
      },
      {
        title: "Resources",
        url: "#",
        items: [
          {
            title: "Documentation",
            url: "#",
          },
          {
            title: "API Reference",
            url: "#",
          },
        ],
      },
    ],
  };

  // Estado local
  const [selectedVersion, setSelectedVersion] = useState(sidebarData.versions[0]);

  // Função para lidar com a seleção de versão
  const handleVersionSelect = (version: string) => {
    setSelectedVersion(version);
  };

  // Criar configuração do AppSidebar usando nossa abordagem declarativa
  const sidebarConfig: ComponentConfig = {
    xtype: 'sidebarProvider',
    items: [
      {
        xtype: 'sidebar',
        items: [
          // Header da Sidebar
          {
            xtype: 'sidebarHeader',
            items: [
              // Menu superior com dropdown de versões
              {
                xtype: 'sidebarMenu',
                items: [
                  {
                    xtype: 'sidebarMenuItem',
                    items: [
                      {
                        xtype: 'dropdownMenu',
                        items: [
                          {
                            xtype: 'dropdownMenuTrigger',
                            items: [
                              {
                                xtype: 'sidebarMenuButton',
                                size: 'lg',
                                className: 'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground',
                                items: [
                                  {
                                    xtype: 'container',
                                    className: 'flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground',
                                    items: [
                                      {
                                        xtype: 'icon',
                                        name: 'gallery-vertical-end',
                                        className: 'size-4'
                                      }
                                    ]
                                  },
                                  {
                                    xtype: 'container',
                                    className: 'flex flex-col gap-0.5 leading-none',
                                    items: [
                                      {
                                        xtype: 'content',
                                        variant: 'span',
                                        text: 'AppName',
                                        className: 'font-semibold'
                                      },
                                      {
                                        xtype: 'content',
                                        variant: 'span',
                                        text: `v${selectedVersion}`,
                                        className: 'text-xs'
                                      }
                                    ]
                                  },
                                  {
                                    xtype: 'icon',
                                    name: 'chevrons-up-down',
                                    className: 'ml-auto size-4'
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            xtype: 'dropdownMenuContent',
                            className: 'w-[--radix-dropdown-menu-trigger-width]',
                            align: 'start',
                            items: sidebarData.versions.map((version) => ({
                              xtype: 'dropdownMenuItem',
                              key: version,
                              text: `v${version}`,
                              onSelect: () => handleVersionSelect(version),
                              items: version === selectedVersion ? [
                                {
                                  xtype: 'icon',
                                  name: 'check',
                                  className: 'ml-auto size-4'
                                }
                              ] : []
                            }))
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              // Campo de pesquisa
              {
                xtype: 'container',
                tag: 'form',
                items: [
                  {
                    xtype: 'sidebarGroup',
                    className: 'py-0',
                    items: [
                      {
                        xtype: 'sidebarGroupContent',
                        className: 'relative',
                        items: [
                          {
                            xtype: 'label',
                            htmlFor: 'search',
                            className: 'sr-only',
                            text: 'Search'
                          },
                          {
                            xtype: 'sidebarInput',
                            id: 'search',
                            placeholder: 'Search...',
                            className: 'pl-8'
                          },
                          {
                            xtype: 'icon',
                            name: 'search',
                            className: 'pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50'
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          // Conteúdo da Sidebar
          {
            xtype: 'sidebarContent',
            items: [
              // Navegação principal
              {
                xtype: 'sidebarGroup',
                items: [
                  {
                    xtype: 'sidebarGroupLabel',
                    text: 'Main'
                  },
                  {
                    xtype: 'sidebarGroupContent',
                    items: [
                      {
                        xtype: 'sidebarMenu',
                        items: sidebarData.navMain.map((item) => ({
                          xtype: 'sidebarMenuItem',
                          key: item.title,
                          items: [
                            {
                              xtype: 'sidebarMenuButton',
                              isActive: item.isActive,
                              href: item.url,
                              items: [
                                {
                                  xtype: 'icon',
                                  name: item.icon,
                                  className: 'size-4'
                                },
                                {
                                  xtype: 'content',
                                  variant: 'span',
                                  text: item.title
                                }
                              ]
                            }
                          ]
                        }))
                      }
                    ]
                  }
                ]
              },
              // Separador
              {
                xtype: 'sidebarSeparator'
              },
              // Seções
              ...sidebarData.navSections.map((section) => ({
                xtype: 'sidebarGroup',
                key: section.title,
                items: [
                  {
                    xtype: 'sidebarGroupLabel',
                    text: section.title
                  },
                  {
                    xtype: 'sidebarGroupContent',
                    items: [
                      {
                        xtype: 'sidebarMenu',
                        items: section.items.map((item) => ({
                          xtype: 'sidebarMenuItem',
                          key: item.title,
                          items: [
                            {
                              xtype: 'sidebarMenuButton',
                              isActive: item.isActive,
                              href: item.url,
                              text: item.title
                            }
                          ]
                        }))
                      }
                    ]
                  }
                ]
              }))
            ]
          },
          // Rail da Sidebar
          {
            xtype: 'sidebarRail'
          }
        ]
      },
      // Conteúdo principal
      {
        xtype: 'sidebarInset',
        items: [
          // Header
          {
            xtype: 'container',
            className: 'flex h-16 shrink-0 items-center gap-2 border-b px-4',
            tag: 'header',
            items: [
              {
                xtype: 'sidebarTrigger',
                className: '-ml-1'
              },
              {
                xtype: 'separator',
                orientation: 'vertical',
                className: 'mr-2 h-4'
              },
              {
                xtype: 'breadcrumb',
                items: [
                  {
                    xtype: 'breadcrumbList',
                    items: [
                      {
                        xtype: 'breadcrumbItem',
                        className: 'hidden md:block',
                        items: [
                          {
                            xtype: 'breadcrumbLink',
                            href: '#',
                            text: 'Features'
                          }
                        ]
                      },
                      {
                        xtype: 'breadcrumbSeparator',
                        className: 'hidden md:block'
                      },
                      {
                        xtype: 'breadcrumbItem',
                        items: [
                          {
                            xtype: 'breadcrumbPage',
                            text: 'Data Management'
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          // Conteúdo
          {
            xtype: 'container',
            className: 'flex flex-1 flex-col gap-4 p-4',
            items: [
              {
                xtype: 'container',
                className: 'grid auto-rows-min gap-4 md:grid-cols-3',
                items: [
                  {
                    xtype: 'container',
                    className: 'aspect-video rounded-xl bg-muted/50'
                  },
                  {
                    xtype: 'container',
                    className: 'aspect-video rounded-xl bg-muted/50'
                  },
                  {
                    xtype: 'container',
                    className: 'aspect-video rounded-xl bg-muted/50'
                  }
                ]
              },
              {
                xtype: 'container',
                className: 'min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'
              }
            ]
          }
        ]
      }
    ]
  };

  return (
    <FormBuild config={sidebarConfig} />
  );
}
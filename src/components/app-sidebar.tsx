import { SearchForm } from "@/components/search-form";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Vitor Brito",
    email: "vitoraraujo1694@gmail.com",
    avatar: "https://avatars.githubusercontent.com/vitoraraujo1694",
  },
  navMain: [
    {
      title: "Relatórios",
      url: "#",
      items: [
        {
          title: "Transações",
          url: "/transactions",
        },
      ],
    },
    {
      title: "Configurações",
      url: "#",
      items: [
        {
          title: "Formas de Pagamento",
          url: "/methods",
        },
        {
          title: "Contas",
          url: "/accounts",
          isActive: true,
        },
        {
          title: "Classificações",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

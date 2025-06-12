import { SearchForm } from "@/components/search-form";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Logo } from "./logo";

const data = {
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
          url: "/paymentMethods",
        },
        {
          title: "Contas",
          url: "/accounts",
        },
        {
          title: "Categorias",
          url: "/categories",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Logo />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        item.url !== "#" && pathname.startsWith(item.url)
                      }
                    >
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        {/* {userData && <NavUser user={userData} />} */}
        <div onClick={() => console.log("Falta pegar os dados de usuario")}>
          Usuario
        </div>
        {/* <div onClick={() => signOut()}>Sair</div> */}
      </SidebarFooter>
    </Sidebar>
  );
}

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, Box, Briefcase, Mail, Settings, Users, LogOut, Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { getSiteSettings } from "@/lib/settings";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Posts do Blog", href: "/admin/posts", icon: FileText, badge: "3" },
  { name: "Serviços", href: "/admin/services", icon: Box, badge: "6" },
  { name: "Portfólio", href: "/admin/portfolio", icon: Briefcase, badge: "6" },
  { name: "Contatos", href: "/admin/contacts", icon: Mail, badge: "2" },
  { name: "Usuários", href: "/admin/users", icon: Users },
  { name: "Configurações", href: "/admin/settings", icon: Settings },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const settings = await getSiteSettings();

  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "EDITOR")) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 z-40">
        <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:pl-64">
          <div className="flex items-center gap-4">
            <button
              id="sidebar-toggle"
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700"
              aria-label="Toggle sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/admin" className="flex items-center gap-2">
              <img src={settings.logo} alt="" className="h-8 w-auto" />
              <span className="font-bold text-xl text-primary hidden sm:block">Suprema TI Admin</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Link href="/" target="_blank">Ver Site</Link>
            </Button>
            
            <div className="relative">
              <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <span className="hidden md:block text-sm font-medium text-foreground">{session.user.name || "Admin"}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700 shadow-lg py-2 hidden group-hover:block">
                <Link href="/admin/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-gray-100 dark:hover:bg-slate-700">
                  <Settings className="h-4 w-4" />
                  Configurações
                </Link>
                <Link href="/api/auth/signout" className="flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-gray-100 dark:hover:bg-slate-700">
                  <LogOut className="h-4 w-4" />
                  Sair
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <aside
        id="sidebar"
        className="fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-slate-800 border-r border-gray-100 dark:border-slate-700 z-30 lg:translate-x-0 -translate-x-full transition-transform duration-300 ease-in-out"
        aria-label="Navegação administrativa"
      >
        <nav className="p-4 space-y-1" aria-label="Menu principal">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-foreground transition-colors group"
            >
              <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{item.name}</span>
              {item.badge && (
                <span className="ml-auto px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 dark:border-slate-700">
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
            Sair
          </Link>
        </div>
      </aside>

      <div
        id="sidebar-overlay"
        className="fixed inset-0 bg-black/50 z-20 lg:hidden opacity-0 invisible transition-all duration-300"
        aria-hidden="true"
      ></div>

      <main
        id="main-content"
        className="lg:pl-64 pt-16 min-h-screen transition-all duration-300"
        style={{ paddingLeft: "16rem" }}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const toggle = document.getElementById('sidebar-toggle');
              const sidebar = document.getElementById('sidebar');
              const overlay = document.getElementById('sidebar-overlay');
              
              if (toggle && sidebar && overlay) {
                toggle.addEventListener('click', function() {
                  sidebar.classList.toggle('-translate-x-full');
                  overlay.classList.toggle('opacity-0');
                  overlay.classList.toggle('invisible');
                  document.body.style.overflow = sidebar.classList.contains('-translate-x-full') ? '' : 'hidden';
                });
                
                overlay.addEventListener('click', function() {
                  sidebar.classList.add('-translate-x-full');
                  overlay.classList.add('opacity-0', 'invisible');
                  document.body.style.overflow = '';
                });
              }
            })();
          `,
        }}
      />
    </div>
  );
}
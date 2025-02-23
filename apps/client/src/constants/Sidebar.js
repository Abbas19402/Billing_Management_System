import Icons from "../components/Icons";

export const sidebarItems = [
    {
        key: "dashboard",
        label: "Dashboard",
        route: '/dashboard',
        icon: <Icons.dashboard className="w-5 h-5 fill-sky-900"/>
    },
    {
        key: "invoice",
        label: "Invoice",
        route: '/dashboard/invoice',
        icon: <Icons.invoice className="w-5 h-5 fill-sky-900"/>
    },
    {
        key: "client",
        label: "Client",
        route: '/dashboard/clients',
        icon: <Icons.client className="w-5 h-5 fill-sky-900"/>
    },
    {
        key: "report",
        label: "Reports",
        route: '/dashboard/reports',
        icon: <Icons.report className="w-5 h-5 fill-sky-900"/>
    },
];
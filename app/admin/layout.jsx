import { AdminAuthProvider } from "@/context/AdminAuthContext";

export const metadata = {
    title: "Admin Dashboard — Kids Katha",
};

export default function AdminLayout({ children }) {
    return (
        <AdminAuthProvider>
            <div className="min-h-screen bg-slate-950">{children}</div>
        </AdminAuthProvider>
    );
}

import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth protection is handled by proxy.ts (middleware)
  return (
    <div className="admin-layout" style={{ fontFamily: 'var(--font-body)' }}>
      <AdminSidebar />
      <div className="admin-main">
        {children}
      </div>
    </div>
  );
}

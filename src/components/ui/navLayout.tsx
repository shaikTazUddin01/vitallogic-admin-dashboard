"use client";

import React, { ReactNode, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Layout, Menu, Avatar, Space } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "@/src/redux/features/auth/authSlice";

const { Header, Content, Footer, Sider } = Layout;

interface NavLayoutProps {
  children: ReactNode;
}

const NavLayout: React.FC<NavLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  // Determine active menu key based on pathname
  const selectedKey = useMemo(() => {
    if (pathname.startsWith("/newOrder")) return "New Order";
    if (pathname.startsWith("/createProduct")) return "Create Product";
    if (pathname.startsWith("/manageProduct")) return "Manage Product";
    return "dashboard";
  }, [pathname]);

  // Sidebar menu items
  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link href="/">Dashboard</Link>,
    },
    {
      key: "newOrder",
      icon: <UserOutlined />,
      label: <Link href="/newOrder">New Order</Link>,
    },
    {
      key: "productManagement",
      icon: <UserOutlined />,
      label: "Product Management",
      children:[
        {
          key:"createProduct",
          icon: <UserOutlined />,
          label:<Link href="/createProduct">Create Product</Link>
        },
         {
          key:"manageProduct",
          icon: <UserOutlined />,
          label:<Link href="/manageProduct">ManageProduct</Link>
        }
      ]
    },
  ];

  // Logout handler
  const handleLogout = () => {
    // Clear Redux state
    dispatch(logout());

    // Remove access token cookie
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Redirect to login page
    router.push("/login");
  };

  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <Sider
        breakpoint="lg"
        collapsedWidth={80}
        className="!bg-slate-900"
      >
        <div className="h-16 flex items-center gap-3 px-6 text-white font-semibold text-lg">
          <DashboardOutlined />
          <span className="hidden lg:inline">Admin</span>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          className="border-r-0"
        />
      </Sider>

      {/* Main Layout */}
      <Layout className="flex flex-col">
        {/* Header */}
        <Header className="bg-white px-6 flex items-center justify-between shadow-sm shrink-0">
          <h1 className="text-sm font-medium text-slate-700 capitalize">
            {selectedKey}
          </h1>

          <Space>
            <span className="text-sm text-slate-600">Admin</span>
            <Avatar size="small" icon={<UserOutlined />} />
            <button
              className="!text-red-600 font-medium ml-2 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </Space>
        </Header>

        {/* Content */}
        <Content className="flex-1 p-6 bg-slate-100">
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-full">
            {children}
          </div>
        </Content>

        {/* Footer */}
        <Footer className="text-center text-xs text-slate-500 shrink-0">
          © {new Date().getFullYear()} Admin Dashboard
        </Footer>
      </Layout>
    </Layout>
  );
};

export default NavLayout;

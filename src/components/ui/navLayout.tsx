"use client";

import React, { ReactNode, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Avatar, Space } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const NavLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  const selectedKey = useMemo(() => {
    if (pathname.startsWith("/newOrder")) return "newOrder";

    return "dashboard";
  }, [pathname]);

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link href="/">Dashboard</Link>,
    },
    {
      key: "newOrder",
      icon: <UserOutlined />,
      label: <Link href="/newOrder">Users</Link>,
    },
  ];

  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <Sider breakpoint="lg" collapsedWidth={80} className="!bg-slate-900">
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

      {/* Main */}
      <Layout className="flex flex-col">
        {/* Header */}
        <Header className="bg-white px-6 flex items-center justify-between shadow-sm shrink-0">
          <h1 className="text-sm font-medium text-slate-700 capitalize">
            {selectedKey}
          </h1>

          <Space>
            <span className="text-sm text-slate-600">Admin</span>
            <Avatar size="small" icon={<UserOutlined />} />
          </Space>
        </Header>

        {/* Content */}
        <Content className="flex-1 p-6 bg-slate-100">
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-full ">
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

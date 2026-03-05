import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

interface PageContentProps {
  children: React.ReactNode;
}

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
      <Content style={{ margin: 16, padding: 16 }}>{children}</Content>
    </Layout>
  );
};

export default PageContent;

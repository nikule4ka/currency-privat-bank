import React from "react";
import { Layout } from "antd";
import Footer from "./features/footer/Footer";
import Header from "./features/header/Header";
import Main from "./pages/Main";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

const { Content } = Layout;

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    },
    queryCache: new QueryCache({})
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Layout style={{ background: "#fff", minHeight: "100vh" }}>
        <Header />
        <Content style={{ padding: 80 }}>
          <Main />
        </Content>
        <Footer />
      </Layout>
    </QueryClientProvider>
  );
};

export default App;

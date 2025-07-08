import Writer from "./components/home/writer";
import Layout from "./components/layout/layout";
import { Toaster } from "./components/ui/sonner";
import ThemeProvider from "./provider/theme-provider";

const App = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Writer />
      </Layout>
      <Toaster />
    </ThemeProvider>
  );
};

export default App;

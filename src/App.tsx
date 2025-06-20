import ThemeProvider from "./theme/theme-provider";
import Write from "./components/home/write";
import Layout from "./components/layout/layout";
import { Toaster } from "sonner";

const App = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Write />
      </Layout>
      <Toaster />
    </ThemeProvider>
  );
};

export default App;

import Writer from "./components/home/writer";
import Layout from "./components/layout/layout";
import ThemeProvider from "./provider/theme-provider";

const App = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Writer />
      </Layout>
    </ThemeProvider>
  );
};

export default App;

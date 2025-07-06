import Layout from "./components/layout/layout";
import ThemeProvider from "./provider/theme-provider";

const App = () => {
  return (
    <ThemeProvider>
      <Layout>
        <h1>Hello</h1>
      </Layout>
    </ThemeProvider>
  );
};

export default App;

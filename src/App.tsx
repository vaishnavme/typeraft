import ThemeProvider from "./theme/theme-provider";
import Write from "./components/home/write";
import Layout from "./components/layout/layout";

const App = () => {
  return (
    <ThemeProvider>
      <Layout>
        <Write />
      </Layout>
    </ThemeProvider>
  );
};

export default App;

import "@mdxeditor/editor/style.css";
import ThemeProvider from "./theme/theme-provider";
import Write from "./components/home/write";

const App = () => {
  return (
    <ThemeProvider>
      <Write />
    </ThemeProvider>
  );
};

export default App;

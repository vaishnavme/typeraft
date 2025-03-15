import Editor from "@/components/editor/editor";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Typeraft – WYSIWYG Editor Built with Tiptap</title>
        <meta
          name="description"
          content="Typeraft is a modern WYSIWYG editor powered by Tiptap, offering a seamless and customizable writing experience."
        />
        <meta
          name="keywords"
          content="Typeraft, WYSIWYG editor, Tiptap, rich text editor, collaborative editing, markdown support"
        />

        <meta
          property="og:title"
          content="Typeraft – WYSIWYG Editor Built with Tiptap"
        />
        <meta
          property="og:description"
          content="A modern, feature-rich WYSIWYG editor built with Tiptap, perfect for content creation."
        />
        <meta property="og:image" content="/typeraft-og.png" />
        <meta property="og:url" content="https://typeraft.vercel.app" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Typeraft – WYSIWYG Editor Built with Tiptap"
        />
        <meta
          name="twitter:description"
          content="Experience a powerful WYSIWYG editor with seamless markdown support and real-time collaboration."
        />
        <meta name="twitter:image" content="/typeraft-og.png" />
        <meta name="twitter:site" content="@vaishnavs0" />

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <div>
        <Editor />
      </div>
    </>
  );
};

export default Home;

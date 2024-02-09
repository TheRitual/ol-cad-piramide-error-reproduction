import { FC, Suspense, lazy, useState } from 'react';
import "ol/ol.css";
import * as CSS from './style';

const V1 = lazy(() => import("./v1"));
const V2 = lazy(() => import("./v2"));
const V3 = lazy(() => import("./v3"));
const V4 = lazy(() => import("./v4"));
const App: FC = () => {
  const [version, setVersion] = useState<"v1" | "v2" | "v3" | "v4">("v1");

  return (
    <main style={CSS.mainCSS}>
      <nav style={CSS.navigationCSS}>
        <button style={CSS.navigationButtonCSS} onClick={() => setVersion("v1")}>Version 1</button>
        <button style={CSS.navigationButtonCSS} onClick={() => setVersion("v2")}>Version 2</button>
        <button style={CSS.navigationButtonCSS} onClick={() => setVersion("v3")}>Version 3</button>
        <button style={CSS.navigationButtonCSS} onClick={() => setVersion("v4")}>Version 4</button>
      </nav>
      <section style={CSS.contentCSS}>
        <Suspense>
          {version === "v1" && < V1 />}
          {version === "v2" && < V2 />}
          {version === "v3" && < V3 />}
          {version === "v4" && < V4 />}
        </Suspense>
      </section>
    </main>
  )
}

export default App

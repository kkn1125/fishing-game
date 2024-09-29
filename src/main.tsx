import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router.tsx";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")!).render(
  <>
    <RecoilRoot>
      <BrowserRouter>
        {/* <StrictMode> */}
        <Router />
        {/* </StrictMode> */}
      </BrowserRouter>
    </RecoilRoot>
  </>
);

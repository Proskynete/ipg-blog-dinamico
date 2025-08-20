import "./assets/css/main.css";
import "./assets/css/markdown.css";

import { createRoot } from "react-dom/client";
import App from "./app.tsx";

const app = document.getElementById("root")!;
createRoot(app).render(<App />);

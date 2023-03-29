import Layout from "./components/Layouts/Layouts";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/Layouts/ProtectedRoutes";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/register";
import Translator from "./pages/Translator";
import Text2Image from "./pages/Text2Image";

function App() {
  return (
    <Layout className="App">
      <Routes>
        <Route index element={<div>Home</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/translator" element={<ProtectedRoutes><Translator /></ProtectedRoutes>} />
        <Route path="/text2img" element={<ProtectedRoutes><Text2Image /></ProtectedRoutes>} />

      </Routes>
    </Layout>
  );
}

export default App;

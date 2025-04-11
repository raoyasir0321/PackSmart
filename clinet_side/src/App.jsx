import { useState } from "react";
import Header from "./components/Header/Index";
import Footer from "./components/Footer";
import AppRoutes from "./Routes/index";
function App() {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;

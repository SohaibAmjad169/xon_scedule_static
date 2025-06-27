import { Fragment } from "react";
import Navbar from "./component/Layout/Navbar";
import Footer from "./component/Layout/Footer";
import RoutesComponents from "./routes/route";
import './App.css'

function App() {
  return (
    <Fragment>
      <Navbar />
      <RoutesComponents />
      <Footer />
    </Fragment>
  );
}

export default App;



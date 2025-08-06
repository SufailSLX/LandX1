import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import AddProperty from "./pages/AddProperty";
import Bookings from "./pages/Bookings";
import Favourites from "./pages/Favourites";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/listing" element={<Listing/>}/>
      <Route path="/addproperty" element={<AddProperty/>}/>
      <Route path="/bookings" element={<Bookings/>}/>
      <Route path="/favourites" element={<Favourites/>}/>
    </Routes>
    <Footer />
    </BrowserRouter>
  )
}
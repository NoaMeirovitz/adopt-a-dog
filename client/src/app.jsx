import { useEffect, useState } from "react";
import Home from "./components/home/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import TopBar from "./components/topBar/topBar";
import "./app.scss";
import SignUp from "./components/signup/signup";
import Pets from "./components/pets/pets";
import { AddPet } from "./components/addPet/addPet";
import { EditPet } from "./components/editPet/editPet";
import About from "./components/about/about";
import Footer from "./components/footer/footer";
import Favorites from "./components/favorites/favorites";
import { fetcher } from "./helpers/fetcher";
import { useAuth } from "./contexts/auth/authProvider";
import { ForgotPassword } from "./components/forgot-password/forgot-password";
import PageNotFound from "./components/page-not-found/page-not-found";

function App() {
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const { refreshUser } = useAuth();

  const getPets = async () => {
    const pets = await fetcher("/pets", "GET");
    setPets(pets);
  };

  useEffect(() => {
    fetcher("/auth/refresh").then((result) => {
      if (result.username) {
        refreshUser(result);
      }
    });
    getPets();
  }, []);

  const selectedPet = pets.find((pet) => pet._id === selectedPetId);

  return (
    <div className="AppRoot">
      <BrowserRouter>
        <TopBar />
        <div id="main">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/pets"
              element={
                <Pets
                  pets={pets}
                  setPets={setPets}
                  selectedPet={selectedPet}
                  setSelectedPetId={setSelectedPetId}
                />
              }
            />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/add-pet" element={<AddPet setPets={setPets} />} />
            <Route
              path="/edit-pet"
              element={<EditPet pet={selectedPet} setPets={setPets} />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

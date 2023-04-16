import "./pet-page.scss";
import Button from "@mui/material/Button";
import { useAuth } from "../../../contexts/auth/authProvider";
import { fetcher } from "../../../helpers/fetcher";
import { useNavigate } from "react-router";
import { useFavorites } from "../../../contexts/favorites/favoritesProvider";

const PetPage = ({ pet, setSelectedPetId, setPets }) => {
  const auth = useAuth();
  const { addToFavorites } = useFavorites();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    await fetcher(`/pets/${id}`, "DELETE");
    setPets((prevPets) => prevPets.filter((p) => p._id !== id));
    setSelectedPetId(null);
  };

  const handleEdit = () => {
    navigate("/edit-pet");
  };
  const handleEditButton = () => {
    navigate("/login");
  };

  const isMyPet = auth?.user?.userId === pet.creatorId;
  return (
    <div id="pet">
      <div className="root">
        <div className="card">
          <div className="backButton">
            <Button
              sx={{ color: "#01579B" }}
              onClick={() => setSelectedPetId(null)}
            >
              Go Back
            </Button>
            {isMyPet && (
              <>
                <Button sx={{ color: "#01579B" }} onClick={handleEdit}>
                  Edit
                </Button>
                <Button
                  sx={{ color: "#01579B" }}
                  onClick={() => handleDelete(pet._id)}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
          <div className="container">
            <div
              className="imgContainer"
              onClick={() => setSelectedPetId(pet._id)}
            >
              <img src={pet.imgUrl} alt={pet.name} />
            </div>
            <div className="details">
              <h1 className="title">{pet.name}</h1>

              <br />

              <div className="description">{pet.description}</div>
              <div className="age">Age: {pet.age}</div>
              <br />
            </div>
          </div>

          <br />

          <div className="buttons">
            {auth.user ? (
              <Button
                sx={{ color: "#01579B" }}
                onClick={() => addToFavorites(pet)}
              >
                Add to Favorites
              </Button>
            ) : (
              <Button sx={{ color: "#01579B" }} onClick={handleEditButton}>
                Please login to favorite this pet
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetPage;

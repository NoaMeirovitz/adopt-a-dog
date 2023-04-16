import "./favorites.scss";
import { useFavorites } from "../../contexts/favorites/favoritesProvider";
import { useAuth } from "../../contexts/auth/authProvider";
import { Button } from "@mui/material";

const Favorites = () => {
  const { favorites, deleteFromFavorites } = useFavorites();
  const auth = useAuth();

  if (!auth?.user) {
    return (
      <div style={{ color: "white" }}>
        You must be logged in to view your favorites
      </div>
    );
  }

  return (
    <div id="favorites">
      {favorites.map((pet, index) => {
        return (
          <div key={index} className="favoriteRow">
            <img src={pet.imgUrl} alt={pet.name} />
            <div>{pet.name}</div>
            <div>Age: {pet.age}</div>
            <Button
              onClick={() => deleteFromFavorites(pet._id)}
              variant="contained"
            >
              Remove
            </Button>
          </div>
        );
      })}

      <br />
    </div>
  );
};

export default Favorites;

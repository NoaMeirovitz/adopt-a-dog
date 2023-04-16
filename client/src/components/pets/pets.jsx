import Grid from "./grid/grid";
import PetPage from "./pet-page/pet-page";

const Pets = ({ setPets, pets, selectedPet, setSelectedPetId }) => {
  return (
    <>
      {!selectedPet ? (
        <Grid pets={pets} setSelectedPetId={setSelectedPetId} />
      ) : (
        <PetPage
          setPets={setPets}
          pet={selectedPet}
          setSelectedPetId={setSelectedPetId}
        />
      )}
    </>
  );
};

export default Pets;

import "./gridItem.scss";

export const GridItem = ({ pet, setSelectedPetId }) => {
  return (
    <div className="board">
      <div className="card">
        <div className="imgContainer" onClick={() => setSelectedPetId(pet._id)}>
          <img className="img" src={pet.imgUrl} alt={pet.name} />
        </div>
        <h1 className="name">{pet.name}</h1>
        <p className="description ellipsis">{pet.description}</p>
        <p className="age">Age: {pet.age}</p>
        <span className="directionalSpan">
          Click on the image to view the pet page.
        </span>
      </div>
    </div>
  );
};

import { useState } from "react";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import { fetcher } from "../../helpers/fetcher";
import "./editPet.scss";
import { useNavigate } from "react-router";
import { toasts } from "../../helpers/toasts";

export const EditPet = ({ pet, setPets }) => {
  const [name, setName] = useState(pet.name);
  const [description, setDescription] = useState(pet.description);
  const [imgUrl, setImgUrl] = useState(pet.imgUrl);
  const [age, setAge] = useState(pet.age);
  const navigate = useNavigate();

  const handleEditPet = async () => {
    try {
      const result = await fetcher(`/pets`, "PUT", {
        _id: pet._id,
        name,
        description,
        imgUrl,
        age,
      });
      if (result) {
        toasts.success("Edited successfully");
        setPets((prevPets) => {
          const updatedPets = [...prevPets];
          const petIndex = updatedPets.findIndex((p) => p._id === pet._id);
          updatedPets[petIndex] = {
            ...updatedPets[petIndex],
            name,
            description,
            imgUrl,
            age,
          };
          return updatedPets;
        });

        navigate("/pets");
      }
    } catch (err) {
      toasts.error(err.message);
    }
  };

  return (
    <div id="editPet">
      <h1 className="title">Edit Pet</h1>
      <TextField
        label="Pet Name"
        className="input"
        InputProps={{
          name: "name",
          id: "name",
          value: name,
          onChange: (e) => setName(e.target.value),
        }}
      />
      <br></br>

      <TextField
        label="Age"
        type="number"
        className="input"
        InputProps={{
          name: "amount",
          id: "amount",
          value: age,
          onChange: (e) => setAge(e.target.value),
        }}
      />
      <br></br>
      <TextField
        label="Image url"
        type="text"
        className="input"
        InputProps={{
          name: "image",
          id: "image",
          value: imgUrl,
          onChange: (e) => setImgUrl(e.target.value),
        }}
      />
      <br></br>
      <TextareaAutosize
        minRows={3}
        className="input"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br></br>
      <br></br>
      <Button onClick={handleEditPet} variant="contained">
        Edit pet
      </Button>
    </div>
  );
};

import { useState } from "react";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import { fetcher } from "../../helpers/fetcher";
import "./addPet.scss";
import { toasts } from "../../helpers/toasts";
import { useAuth } from "../../contexts/auth/authProvider";

export const AddPet = ({ setPets }) => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [age, setAge] = useState(0);

  const handleAddPet = async () => {
    try {
      const newPet = {
        name,
        description,
        imgUrl,
        age,
        breed,
        creatorId: user.userId,
      };
      const result = await fetcher(`/pets`, "POST", newPet);
      if (result) {
        toasts.success("Added successfully");
        setPets((prevPets) => [...prevPets, result]);
      }
    } catch (err) {
      toasts.error(err.message);
      console.log(err);
    }
  };

  return (
    <div id="addPet">
      <h1 className="title">Add Pet</h1>
      <div className="form">
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
        <TextField
          label="Pet Breed"
          className="input"
          InputProps={{
            name: "breed",
            id: "breed",
            value: breed,
            onChange: (e) => setBreed(e.target.value),
          }}
        />

        <br></br>
        <br></br>
        <Button onClick={handleAddPet} variant="contained">
          Add pet
        </Button>
      </div>
    </div>
  );
};

import { GridItem } from "./gridItem/gridItem";
import "./grid.scss";
import { Box, Slider, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Grid = ({ pets, setSelectedPetId }) => {
  const [name, setName] = useState("");
  const [ageRange, setAgeRange] = useState([0, 15]);

  const filteredPets = pets.filter((pet) => {
    return (
      pet.name.toLowerCase().includes(name.toLowerCase()) &&
      pet.age >= ageRange[0] &&
      pet.age <= ageRange[1]
    );
  });

  return (
    <div id="grid">
      <Box
        sx={{ width: 500, margin: "0 auto" }}
        display="flex"
        gap={3}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <TextField
          label="Pet Name"
          className="input"
          sx={{ width: 300 }}
          InputProps={{
            name: "name",
            id: "name",
            value: name,
            onChange: (e) => setName(e.target.value),
          }}
        />
        <Box sx={{ width: 300 }}>
          <Typography id="input-slider" gutterBottom>
            Age
          </Typography>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={ageRange}
            max={15}
            onChange={(event, newValue) => {
              setAgeRange(newValue);
            }}
            valueLabelDisplay="auto"
          />
        </Box>
      </Box>
      <div className="grid">
        {filteredPets.map((pet, index) => {
          return (
            <GridItem
              key={index}
              pet={pet}
              setSelectedPetId={setSelectedPetId}
            />
          );
        })}
      </div>
      <br />
    </div>
  );
};

export default Grid;

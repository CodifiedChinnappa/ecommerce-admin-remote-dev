import { ChangeEvent, useState, SyntheticEvent } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";

type Variation = {
  variations: {
    name: string;
    price: number;
  }[];
};

type VariationFormProps = {
  data: Variation;
  updateFields: (fields: Partial<Variation>) => void;
};

const VariationInfo = ({ data, updateFields }: VariationFormProps) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => {
    return (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  };

  const handleAddClick = () => {
    const newVariation: Variation = {
      variations: [...data.variations, { name: "", price: 0 }],
    };
    updateFields(newVariation);
  };

  const handleDeleteClick = (index: number) => {
    const updatedVariations = data.variations.filter((_, i) => {
      return i !== index;
    });
    updateFields({ variations: updatedVariations });
  };

  return (
    <div className="flex flex-col gap-[4rem] w-[70%] m-auto justify-center">
      Variation Info
      {data.variations.map((variation, index) => {
        return (
          <div key={variation.name}>
            <Accordion
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
              <AccordionSummary
                expandIcon={<GridExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {variation.name}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {variation.price.toString()}
                </Typography>
                <button
                  type="button"
                  onClick={() => {
                    return handleDeleteClick(index);
                  }}
                >
                  Delete
                </button>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  label="Enter name"
                  variant="outlined"
                  fullWidth
                  autoFocus
                  required
                  type="text"
                  value={variation.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const updatedVariations = [...data.variations]; // Create a copy of the variations array
                    updatedVariations[index] = {
                      ...updatedVariations[index], // Copy the existing variation
                      name: e.target.value, // Update the name property
                    };
                    updateFields({ variations: updatedVariations }); // Update the whole variations array
                  }}
                />
                <TextField
                  label="Enter price"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={variation.price.toString()}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const updatedVariations = [...data.variations];
                    updatedVariations[index] = {
                      ...updatedVariations[index],
                      price: parseFloat(e.target.value) || 0,
                    };
                    updateFields({ variations: updatedVariations });
                  }}
                />
              </AccordionDetails>
            </Accordion>
          </div>
        );
      })}
      <button type="button" onClick={handleAddClick}>
        Add Variation
      </button>
    </div>
  );
};

export default VariationInfo;

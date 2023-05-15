import React, { useState, useContext } from "react";
import { getRaceImage } from "../utils/getImage";
import ImagePaper from "./ImagePaper";
import TraitAccordions from "./TraitAccordions";
import { CenteredColumn } from "./CustomBoxes";
import { CustomModal } from "./CustomModal";
import { useCharacter } from "../context/CharacterContext";
import { SnackbarContext } from "../context/SnackbarContext";
import { RaceTable } from "./RaceTable";

export default function RaceModal({
  race,
  url,
  fetchRaceInfo,
  fetchTraitInfo,
}) {
  const [open, setOpen] = useState(false);
  const [raceInfo, setRaceInfo] = useState(null); // state variable for race information
  const [raceInfoItems, setRaceInfoItems] = useState([]);
  const { openSnackbar } = useContext(SnackbarContext);

  const handleOpen = async () => {
    const info = await fetchRaceInfo(url); // Fetch race information by using race.url
    setRaceInfo(info); // Store the race  information in the state variable

    //fetch trait information for each trait and store it in an array
    const fetchedTraitsWithInfo = await Promise.all(
      info.traits.map(async (trait) => {
        const traitInfo = await fetchTraitInfo(trait.url);
        return { ...trait, ...traitInfo };
      })
    );

    // store the race info in an array so that it can be easily displayed later
    const raceInfoItems = [
      { key: "Alignment", value: info.alignment },
      { key: "Age", value: info.age },
      { key: "Speed", value: info.speed },
      { key: "Size", value: info.size },
      { key: "Language", value: info.languageDesc },
      { key: "Bonus", value: info.abilityBonuses },
      {
        key: "Traits",
        value: (
          <ul>
            {fetchedTraitsWithInfo.map((trait, i) => (
              <li key={i} style={{ listStyleType: "none" }}>
                <TraitAccordions traitInfo={trait} />
              </li>
            ))}
          </ul>
        ),
      },
    ];
    console.log(raceInfoItems);
    setOpen(true);
    setRaceInfoItems(raceInfoItems);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { updateCharacter } = useCharacter();

  const handleAddRace = () => {
    // Update the character context with the new race and its details
    updateCharacter({ race: race, raceDetails: raceInfo });

    //open the Snackbar with a success message
    openSnackbar(`${race} selected!`, "success");
    handleClose();
  };

  const raceImageUrl = getRaceImage(race);

  const RaceImagePaper = (props) => (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <ImagePaper {...props} sx={{ height: 300, width: 300 }} />
    </div>
  );

  return (
    <CenteredColumn>
      <RaceImagePaper
        src={raceImageUrl}
        alt={race}
        onClick={handleOpen}
        title={race}
      />
      <CustomModal
        open={open}
        onClose={handleClose}
        title={race}
        image={raceImageUrl}
        buttonName={"Add Race"}
        buttonOnClick={handleAddRace}
        aria-labelledby="race-modal-title"
        aria-describedby="race-modal-description"
      >
        {raceInfo && <RaceTable raceInfoItems={raceInfoItems} />}
      </CustomModal>
    </CenteredColumn>
  );
}

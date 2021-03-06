import React from "react";
import styled from "styled-components";
import RenderList from "./RenderList";
function Typeahead(props) {
  const [value, setValue] = React.useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState(
    0
  );
  const { suggestions, handleSelect } = props;
  let refinedSuggestions = [];
  let returnedSuggestions = false;
  if (value.length > 1) {
    refinedSuggestions = suggestions.filter((Element) => {
      return Element.title.toLowerCase().includes(value.toLowerCase());
    });
    returnedSuggestions = refinedSuggestions.length > 0;
  }

  return (
    <InputData>
      <BookInput
        value={value}
        placeholder="The designs"
        onChange={(ev) => {
          setValue(ev.target.value);
        }}
        onKeyDown={(ev) => {
          switch (ev.key) {
            case "Enter": {
              handleSelect(ev.target.value);
              return;
            }
            case "ArrowUp": {
              if (selectedSuggestionIndex !== 0) {
                setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                return;
              }
              break;
            }
            case "ArrowDown": {
              if (selectedSuggestionIndex !== refinedSuggestions.length - 1) {
                setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
                return;
              }
              break;
            }
          }
        }}
      />
      <ClearBtn
        onClick={() => {
          setValue("");
        }}
      >
        Clear
      </ClearBtn>
      <RenderList
        returnedSuggestions={returnedSuggestions}
        refinedSuggestions={refinedSuggestions}
        handleSelect={handleSelect}
        value={value}
        selectedSuggestionIndex={selectedSuggestionIndex}
        setValue={setValue}
        setSelectedSuggestionIndex={setSelectedSuggestionIndex}
      />
    </InputData>
  );
}

const InputData = styled.div`
  height: 30px;
`;

const BookInput = styled.input`
  width: 300px;
  height: 100%;
`;
const ClearBtn = styled.button`
  background-color: blue;
  color: white;
  height: 100%;
  width: 75px;
`;

export default Typeahead;

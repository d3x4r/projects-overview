import React from 'react';
import FilterButton from './FilterButton';
import { ButtonGroup  } from 'react-bootstrap';



const FiltersGroup = (props) => {
  const { buttons, onClickHandler } = props;

  const renderButtons = () => {
    if (buttons instanceof Array) {
      return buttons.map(button => <FilterButton key={button.name} data={button} onClickHandler={onClickHandler} />)
    }
    return <FilterButton key={buttons.name} data={buttons} onClickHandler={onClickHandler} />
  };

  return (
    <ButtonGroup className="ml-2">
      {renderButtons()}
    </ButtonGroup>
  );
};

export default FiltersGroup;


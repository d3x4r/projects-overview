import React from 'react';
import { Button  } from 'react-bootstrap';

const FilterButton = (props) => {
  const { onClickHandler, data: { id, name, state, type } } = props;
  return <Button 
          onClick={onClickHandler(id, type)} 
          variant={state === 'active' ? 'primary' : 'secondary'}
          >
          {name}
          </Button>
};

export default FilterButton;
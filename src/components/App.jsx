import React from 'react';
import axios from 'axios';
import FiltersGroup from './FiltersGroup';
import { Row, Col, Card, Spinner, Image } from 'react-bootstrap';

export default class App extends React.Component {
  state = {};

  getState = async () => {
    const response = await axios.get('./data/data.json');
    this.setState(response.data);
  }

  componentDidMount() {
    this.getState();
  }

  getFilteredIdList = (idList, filters) => {
    const [ firstFilter, ...otherFilters ] = filters;
    const { type, id } = firstFilter;
    const { data: { byId } } = this.state;

    const filteredIdList = idList.filter((cardId) => {
      const cardData = byId[cardId];
      return cardData[type] === id;
    });

    if (otherFilters.length > 0) {
      return this.getFilteredIdList(filteredIdList, otherFilters);
    }
    return filteredIdList;
  }

  updateState = () => {
    const { filters: { byId, allIds }, data } = this.state;
    const cardIds = data.allIds;
    const cardsData = data.byId;

    const activeFilters = allIds.reduce((acc, filterType) => {
      const filters = byId[filterType];
      const activeFilters = filters.filter(filter => filter.state === 'active');
      return activeFilters.length > 0 ? [ ...acc , ...activeFilters] : acc;
    }, []);

    const filteredIdList = this.getFilteredIdList(data.allIds, activeFilters);
    const uiState = cardIds.reduce((acc, cardId) => filteredIdList.includes(cardId) ? { ...acc, [cardId]: { state: 'visible'} } : { ...acc, [cardId]: { state: 'hidden'} }, {});

    const updatedState = {
      data: {
        byId: cardsData,
        allIds: cardIds,
        uiState,
      }
    };

    this.setState(updatedState);
  }

  onChangeFilter = (selectedFilterId, selectedFilterType) => () => {
    const { filters: { byId, allIds,  resetButton } } = this.state;
    const selectedFiltersGroup = byId[selectedFilterType];
    const changedFilters = selectedFiltersGroup.map((filter) => {
      const { id } = filter;
      return { ...filter, state: selectedFilterId === id ? 'active' : 'inactive' };
    });
    const updatedFiltersState = { [selectedFilterType]: changedFilters };
    const resetButtonState = resetButton.state === 'active' ? { ...resetButton, state: 'inactive' } : resetButton;

    const updatedState = {
      filters: {
        byId: { ...byId, ...updatedFiltersState },
        allIds,
        resetButton: resetButtonState,
      },
    };
    this.setState(updatedState, this.updateState);
  }

  resetFilterState = () => {
    const { filters: { byId, allIds, resetButton } } = this.state;

    const cleanFiltersState = allIds.reduce((acc, id) => {
      const currentFilters = byId[id];
      const cleanFilters = currentFilters.map(filter => ({ ...filter, state: 'inactive' }));
      return { ...acc, [id]: cleanFilters };
    }, {});

    const resetButtonState = resetButton.state === 'inactive' ? { ...resetButton, state: 'active' } : resetButton;

    const updatedState = {
      filters: {
        byId: { ...cleanFiltersState },
        allIds,
        resetButton: resetButtonState,
      },
    };

    this.setState(updatedState);
  };

  resetUiState = () => {
    const { data: { byId, allIds } } = this.state;
    const cleanData = allIds.reduce((acc, id) => ({ ...acc, [id]: { state: 'visible' } }), {});

    const updatedState = {
      data: {
        byId,
        allIds,
        uiState: cleanData,
      },
    };

    this.setState(updatedState);
  }

  renderFilters = () => {
    const { filters: { allIds, byId } } = this.state;

    const filtersGroups = allIds.map(id => ({ id, filters: byId[id] }));

    return filtersGroups.map((filterGroup) => {
      const { id, filters } = filterGroup;
      return <FiltersGroup key={id} onClickHandler={this.onChangeFilter} buttons={filters} />;
    });
  }

  resetState = () => () => {
    this.resetFilterState();
    this.resetUiState();
  }

  renderResetButton = () => {
    const { filters: { resetButton } } = this.state;
    return <FiltersGroup onClickHandler={this.resetState} buttons={resetButton} />;
  }

  getCard = (cardId) => {
    const { data: { byId } } = this.state;
    
    const card = byId[cardId];

    const { 
      title,
      preview,
      keyWords,
      kind,
      github,
      web,
    } = card;

    return (
      <Col className="d-flex mb-4" xs={3} key={title}>
          <Card className="flex-grow-1">
            <Card.Header className="text-center">{title}</Card.Header>
            <Card.Img variant="top" src={preview} alt="title" />
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted text-right">{kind}</Card.Subtitle>
              <Card.Text>Keywords:
                <span className="d-block">{keyWords.join(', ')}.</span>
              </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
              { github ?  <Card.Link target="_blank" href={github}>on github</Card.Link> :  <Card.Link><s>on github</s></Card.Link> }
              { web ?  <Card.Link target="_blank" href={web}>watch online</Card.Link> :  <Card.Link><s>watch online</s></Card.Link> }
            </Card.Footer>
          </Card>
      </Col>
    );
  }

  renderCards = () => {
    const { data: { allIds, uiState } } = this.state;

    const currentCards = allIds.filter(currentCardId => uiState[currentCardId].state === 'visible' ? currentCardId : false);
    return currentCards.map(this.getCard);
  }

  renderSpinner = () => {
    const spinnerWrapperStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };

    return (
      <div className='spinnerWrapper' style={spinnerWrapperStyle}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  renderGitHubLink = () => {
    return (
      <a className="mr-auto" href="https://github.com/d3x4r">
        <Image width="35px" src="data/img/github-logo.svg" />
      </a>
    );
  }

  render() {
    const { filters } = this.state;
    if (!filters) {
      return this.renderSpinner();
    }
    return (
      <React.Fragment>
        <Row className="d-flex justify-content-end mt-4 mb-5 pr-3 pl-3 align-items-start">
          {this.renderGitHubLink()}
          {this.renderResetButton()}
          {this.renderFilters()}
        </Row>
        <Row>
          {this.renderCards().length > 0 ? this.renderCards() : <p className="font-italic">Match not found</p>}
        </Row>
      </React.Fragment>
    );
  }
}
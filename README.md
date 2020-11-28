# React Pinterest

## Motivation

The motivation behind this project was to make a mock version of pinterest to practice crud functionality in React

## Build status

MVP

## Code Style

React, Javascript ES6,
Bootstrap, Firebase, axios

[https://upbeat-mahavira-a8e825.netlify.app/](https://upbeat-mahavira-a8e825.netlify.app/)

## Screenshots:

![](boards.png)

![](pins.png)

## Features

This site has a way to do crud functionality on Boards and Pins: Create, read, update and delete. I can also add pins to boards.

Not implemented (to do):

- Search
- Hiding Edit controls on logout
- Making delete Pin from Board different from delete pin

## Code Example

```
ccomponentDidMount() {
    // 1. Pull boardId from URL params
    const boardId = this.props.match.params.id;
    // 2. Make a call to the API that gets the board info
    this.getBoardInfo(boardId);

    // 3. Make a call to the API that returns the pins associated with this board and set to state.
    this.findPinsForBoard(boardId)
      .then(resp => {
        this.setState({
          pins: resp,
          show: false
        });
      })
      .catch(error => console.warn(error));

    // Fetch all the pins ahead of time to allow users to choose to add them:
    this.getterAllPins();
  }
```

## Team

Will Kotheimer

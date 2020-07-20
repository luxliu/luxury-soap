import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button>Normal</Button>
        <Button size={ButtonSize.Small} disabled>
          Small
        </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Large
        </Button>
        <Button btnType={ButtonType.Danger}>Danger</Button>
        <Button
          btnType={ButtonType.Link}
          href="https://www.google.com"
          target="_blank"
        >
          Link
        </Button>
        <Button
          btnType={ButtonType.Link}
          href="https://www.google.com"
          disabled
        >
          Disabled Link
        </Button>
        <Menu defaultIndex={0} onSelect={(index) => console.log(index)}>
          <MenuItem index={0} disabled>
            link 1
          </MenuItem>
          <MenuItem index={1}>link 2</MenuItem>
          <MenuItem index={2}>link 3</MenuItem>
        </Menu>
      </header>
    </div>
  );
};

export default App;

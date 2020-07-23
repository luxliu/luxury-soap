import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

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
        <Menu onSelect={(index) => console.log(index)} mode="vertical">
          <MenuItem disabled>link 1</MenuItem>
          <MenuItem>link 2</MenuItem>
          <MenuItem>link 3</MenuItem>
          <SubMenu title="sub menu">
            <MenuItem disabled>link 1</MenuItem>
            <MenuItem>link 2</MenuItem>
            <MenuItem>link 3</MenuItem>
            <SubMenu title="sub menu">
              <MenuItem disabled>link 1</MenuItem>
              <MenuItem>link 2</MenuItem>
              <MenuItem>link 3</MenuItem>
            </SubMenu>
          </SubMenu>
        </Menu>
      </header>
    </div>
  );
};

export default App;

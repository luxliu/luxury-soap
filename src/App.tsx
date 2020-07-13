import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button';

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
      </header>
    </div>
  );
};

export default App;

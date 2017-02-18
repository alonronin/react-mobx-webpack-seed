import React from 'react';
import { observer } from 'mobx-react';
import './app.scss';

function App({ store }) {
  return (
    <div>
      <button onClick={store.resetTimer}>
        Seconds passed: {store.timer}
      </button>
    </div>
  );
}

export default observer(App);

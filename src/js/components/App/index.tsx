import { h, Fragment } from 'preact';
import * as styles from './App.module.sass';

const App = () => {
  return (
    <Fragment>
      <div className={styles.title}>Hello, World!</div>
    </Fragment>
  );
};

export default App;

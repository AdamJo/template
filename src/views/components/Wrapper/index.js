import { h, Component } from 'preact';
import style from './style.css';

export default class Wrapper extends Component {
  render({ children }) {
    return (
      <main class={style.wrapper}>
        {children}
      </main>
    );
  }
}

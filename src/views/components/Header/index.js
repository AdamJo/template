import { h } from 'preact';
import { Link } from 'preact-router';
import style from './style';

export default () => (
  <div className={style.header}>
    <div>
      <h3>Template</h3>
    </div>
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/resources">Resources</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  </div>
);

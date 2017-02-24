import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style';

export default class Header extends Component {
  componentDidMount() {
    const hamburger = document.querySelector(`.${style.hamburger}`);
    const links = document.querySelector(`.${style.links}`);
    hamburger.addEventListener('click', function() {
      links.classList.toggle(`${style.active}`);
    });
  }

  render() {
    return (
      <div className={style.header}>
        <h3>Template</h3>
        <nav role="navigation" className={style.menu}>
          <ul className={style.links}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/resources">Resources</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
          <a className={style.hamburger} href="#nav">Menu</a>
        </nav>
      </div>
    );
  }
}

import { h, Component } from 'preact';
import Header from '../Header';
import Footer from '../Footer';

import Wrapper from '../Wrapper';

import style from './style';

export default class Content extends Component {
  render(
    {
      children,
      ...props
    }
  ) {
    return (
      <div className={style.app} {...props}>
        <Header />
        <div className={style.content}>
          <Wrapper>
            {children}
          </Wrapper>
        </div>
        {/*<Footer />*/}
      </div>
    );
  }
}

import { h, Component } from 'preact';
import PreactCSSTransitionGroup from 'preact-css-transition-group';
import style from './style';
import Main from '../Main';

export default props => // <Main>
(
  <PreactCSSTransitionGroup
    class={style.transWrap}
    transitionName="example"
    component="div"
    transitionEnterTimeout={600}
    transitionLeaveTimeout={500}
    transitionEnter={true}
    transitionLeave={true}
  >
    <props.component key={props.path} />
  </PreactCSSTransitionGroup>
);
// </Main>

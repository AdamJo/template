import Router from 'preact-router';
import { h, Component } from 'preact';

import About from 'containers/About';
import Contact from 'containers/Contact';
import Home from 'containers/Home';
import Resources from 'containers/Resources';

import Content from 'components/Content';
import PageTransition from 'components/PageTransition';

import './global-style';

export default class App extends Component {
  render() {
    return (
      <Content>
        <Router>
          {/* HOME */}
          <PageTransition num="01" component={Home} path="/" />

          {/* ABOUT */}
          <PageTransition num="02" component={About} path="/about" />

          {/* CONTACT */}
          <PageTransition num="03" component={Contact} path="/contact" />

          {/* RESOUCRES */}
          <PageTransition num="04" component={Resources} path="/resources" />
        </Router>
      </Content>
    );
  }
}

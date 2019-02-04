import React from 'react';
import { Location, WindowLocation } from '@reach/router';

let scrollPositions = {};

type Props = {
  location: WindowLocation;
};

class ManageScrollImpl extends React.Component<Props> {
  componentDidMount() {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    try {
      const storage = sessionStorage.getItem('scrollPositions');

      if (storage) {
        scrollPositions = JSON.parse(storage) || {};
        const { key } = this.props.location;

        if (key && scrollPositions[key]) {
          // setTimeout(() => {
          window.scrollTo(0, scrollPositions[key]);
          // }, 0);
        }
      }
    } catch (e) {
      // session storage will throw for a few reasons
      // - user settings
      // - in-cognito/private browsing
      // - who knows...
    }

    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate() {
    const { key } = this.props.location;

    if (!key) {
      return;
    }

    if (!scrollPositions[key]) {
      // never seen this location before
      window.scrollTo(0, 0);
    } else {
      // seen it
      window.scrollTo(0, scrollPositions[key]);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { key } = this.props.location;

    if (!key) {
      return;
    }

    scrollPositions[key] = window.scrollY;

    try {
      sessionStorage.setItem('scrollPositions', JSON.stringify(scrollPositions));
    } catch (e) {
      // session storage will throw for a few reasons
      // - user settings
      // - in-cognito/private browsing
      // - who knows...
    }
  };

  render() {
    return null;
  }
}

export default () => (
  <Location>{({ location }) => <ManageScrollImpl location={location} />}</Location>
);

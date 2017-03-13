import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';

import Home from '../src/pages/Home.jsx';

describe('Home', () => {
  let home;
  
  beforeEach(() => {
    home = shallow(<Home />);
  });

  it('should renders nested components', () => {
    expect(home.find('NavBar').length).toEqual(1);
    expect(home.find('SearchBox').length).toEqual(1);
    expect(home.find('Footer').length).toEqual(1);
  });
});

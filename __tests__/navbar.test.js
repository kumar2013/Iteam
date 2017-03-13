import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import NavBar from '../src/components/NavBar.jsx';

describe('NavBar', () => {
  it('should renders a link', () => {
    const navbar = shallow(<NavBar />);
    expect(navbar.find('h4').first().text()).toEqual('<Link />');
  });
});
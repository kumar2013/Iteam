import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Footer from '../src/components/Footer.jsx';

describe('Footer', () => {
  it('should renders Made with ♥ in Örnsköldsvik', () => {
    const footer = shallow(<Footer />);
    expect(footer.find('p').text()).toEqual('Made with ♥ in Örnsköldsvik');
  });
});
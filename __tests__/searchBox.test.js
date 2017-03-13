import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import ReactTestUtils from 'react-addons-test-utils';

import SearchBox from '../src/components/SearchBox.jsx';

describe('SearchBox', () => {
  let home;
  let findMovies;

  beforeEach(() => {
    findMovies = expect.createSpy();
    home = mount(<SearchBox findMovies={findMovies} />);
  });
    
  it('should requires fetchMovies on props', () => {
    expect(home.props().findMovies).toExist();
  });
    
  it('should renders form on home page', () => {
    const form = home.find('form');
    expect(form).toExist();
  });

  it('should call findMovies on form submit', () => {
    const form = home.find('form').first();
    const input = home.find('input').first();
    input.simulate('change', { target: { value: 'Iron man' } });
    form.simulate('submit');
    expect(findMovies).toHaveBeenCalledWith('Iron man');
  });
});
import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react';

import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
};

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
};

const testMenu = (props: MenuProps) => (
  <Menu {...props}>
    <MenuItem>active</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem>last item</MenuItem>
    <li>hello</li>
  </Menu>
);

let wrapper: RenderResult,
  menuItem: HTMLElement,
  activeItem: HTMLElement,
  disabledItem: HTMLElement;

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(testMenu(testProps));
    menuItem = wrapper.getByTestId('test-menu');
    activeItem = wrapper.getByText('active');
    disabledItem = wrapper.getByText('disabled');
  });

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuItem).toBeInTheDocument();
    expect(menuItem).toHaveClass('luxury-menu test');
    expect(menuItem.getElementsByTagName('li').length).toEqual(3);
    expect(activeItem).toHaveClass('menu-item is-active');
    expect(disabledItem).toHaveClass('menu-item is-disabled');
  });

  it('click items should change active and call the right callback', () => {
    fireEvent.click(disabledItem);
    expect(disabledItem).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalled();

    const lastItem = wrapper.getByText('last item');
    fireEvent.click(lastItem);
    expect(lastItem).toHaveClass('is-active');
    expect(activeItem).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
  });

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();

    const wrapper = render(testMenu(testVerticalProps));
    const menuItem = wrapper.getByTestId('test-menu');
    expect(menuItem).toHaveClass('menu-vertical');
  });
});

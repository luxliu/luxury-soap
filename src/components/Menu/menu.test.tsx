import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  wait,
} from '@testing-library/react';

import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

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
    <SubMenu title="dropdown">
      <MenuItem>drop1</MenuItem>
    </SubMenu>
  </Menu>
);

const createStyleFile = () => {
  const cssFile: string = `
    .luxury-submenu {
      display:none;
    }
    .luxury-submenu.menu-opened {
      display:block;
    }
  `;
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;

  return style;
};

let wrapper: RenderResult,
  menuItem: HTMLElement,
  activeItem: HTMLElement,
  disabledItem: HTMLElement;

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    wrapper = render(testMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuItem = wrapper.getByTestId('test-menu');
    activeItem = wrapper.getByText('active');
    disabledItem = wrapper.getByText('disabled');
  });

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuItem).toBeInTheDocument();
    expect(menuItem).toHaveClass('luxury-menu test');
    expect(menuItem.querySelectorAll(':scope > li').length).toEqual(4);
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

  it('should show dropdown items when hover on submenu of horizontal menu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    await wait(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible();
    });
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);
    await wait(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible();
    });
  });
});

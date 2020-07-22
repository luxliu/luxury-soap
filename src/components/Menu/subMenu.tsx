import React, { useContext, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  className,
  children,
}) => {
  const context = useContext(MenuContext);
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
  });

  const renderChildren = () => {
    const childrenComponent = React.Children.map(
      children,
      (child, insideIndex) => {
        const childElement = child as React.FunctionComponentElement<
          MenuItemProps
        >;
        const { displayName } = childElement.type;
        if (displayName === 'MenuItem' || displayName === 'SubMenu') {
          return React.cloneElement(childElement, {
            index: `${index}-${insideIndex}`,
          });
        } else {
          console.error(
            'Warning: SubMenu has a child which is not a MenuItem or a SubMenu'
          );
        }
      }
    );

    return <ul className="luxury-submenu">{childrenComponent}</ul>;
  };

  return (
    <li key={index} className={classes}>
      <div className="submenu-title">{title}</div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;

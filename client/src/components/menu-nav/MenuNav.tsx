import "./MenuNav.css";

import type { ReactElement } from "react";
import React from "react";
import type { IconType } from "react-icons";

interface MenuItem {
  badge?: number;
  icon?: ReactElement<IconType>;
  id: number | string;
  label: string;
  onClick?: () => void;
}

interface MenuNavProps {
  className?: string;
  items: MenuItem[];
}

const MenuNav: React.FC<MenuNavProps> = ({ className = "", items }) => {
  const handleItemClick = (callback?: () => void) => {
    return () => {
      if (callback) {
        callback();
      }
    };
  };

  return (
    <nav className={`menu-nav ${className}`}>
      <ul className="menu-list">
        {/* Iteration over menu items */}
        {items.map(item => (
          <li
            className="menu-item"
            key={item.id}
            onClick={handleItemClick(item.onClick)}>
            <div className="menu-item-content">
              {item.icon ? (
                <span className="menu-item-icon">{item.icon}</span>
              ) : null}
              <span className="menu-item-label">{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MenuNav;

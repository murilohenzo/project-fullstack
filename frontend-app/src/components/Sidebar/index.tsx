import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar';
import { IconBaseProps } from 'react-icons';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from 'react-router-dom';

import "./styles.scss";
import { useState } from 'react';

interface menuItemsProps {
  Icon?: React.ComponentType<IconBaseProps>;
  title: string,
  href: string
}

interface SideBarProps {
  collapsed: boolean,
  headerLogoIcon: React.ComponentType<IconBaseProps>,
  ClickHandlerCollapsed: (event: React.MouseEvent<HTMLDivElement>) => void,
  headerTitle: string, 
  footerTitle: string,
  menuItems: menuItemsProps[],
}

export const SideBar: React.FC<SideBarProps> = (
  {
    collapsed,
    ClickHandlerCollapsed,
    headerLogoIcon: Icon,
    headerTitle,
    menuItems,
    footerTitle,
    children
  }) => {

  const [hasFocus, setFocus] = useState(false);

  return (
    <>
      <div id='header'>
        <ProSidebar collapsed={collapsed}>
          <SidebarHeader >
            <div className="logotext" onClick={ClickHandlerCollapsed}>
              {
                collapsed ? (
                  <p>
                    { Icon && <Icon size={26}/>}
                  </p>
                ) : (
                  <p>
                    {headerTitle}
                  </p>
                )
              }
            </div>
          </SidebarHeader>
        <SidebarContent>
        <Menu iconShape="square">
          {
            menuItems.map((item, index) => (
              <MenuItem key={index} icon={item.Icon && <item.Icon size={20}></item.Icon>}>
                {item.title}
                <Link to={item.href}/>
              </MenuItem>
            ))
          }
        </Menu>
        </SidebarContent>
        <SidebarFooter>
          {collapsed ? "Devs" : footerTitle}
        </SidebarFooter>
      </ProSidebar>
      <div className='children'>
        {children}
      </div>
    </div>
    </>
  )
};
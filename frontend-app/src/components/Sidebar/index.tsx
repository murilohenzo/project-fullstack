import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar';
import { IconBaseProps } from 'react-icons';
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import 'react-pro-sidebar/dist/css/styles.css';

interface menuItemsProps {
  Icon?: React.ComponentType<IconBaseProps>;
  colorIcon?: string;
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
    footerTitle
  }) => {
  return (
    <div className='header'>
        <ProSidebar collapsed={collapsed}>
          <SidebarHeader >
            <div className="logotext">
              {
                collapsed ? (
                  <p>
                    { Icon && <Icon size={20}/>}
                  </p>
                ) : (
                  <p>
                    {headerTitle}
                  </p>
                )
              }
            </div>
            <div className="closemenu" onClick={ClickHandlerCollapsed}>
                {collapsed ? (
                  <FiArrowRightCircle size={20}/>
                ) : (
                  <FiArrowLeftCircle size={20}/>
                )}
            </div>
          </SidebarHeader>
        <SidebarContent>
        <Menu iconShape="square">
          {
            menuItems.map((item, index) => (
              <MenuItem key={index} icon={item.Icon && <item.Icon size={20} color={item.colorIcon}></item.Icon>}>
                {item.title}
                {item.href}
              </MenuItem>
            ))
          }
        </Menu>
        </SidebarContent>
        <SidebarFooter>
          {footerTitle}
        </SidebarFooter>
      </ProSidebar>
    </div>
  )
};
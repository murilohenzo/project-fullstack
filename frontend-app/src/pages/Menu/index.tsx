import { useState } from "react"
import { SideBar } from "../../components/Sidebar"
import { FiUsers, FiBarChart } from "react-icons/fi";

export const Menu: React.FC = ({ children }) => {

  const [collapsed, setCollapsed] = useState(false);

  const ClickHandlerCollapsed = () => {
    setCollapsed(!collapsed);
  }


  return(
    <>
      <SideBar 
        collapsed={collapsed}
        ClickHandlerCollapsed={ClickHandlerCollapsed}
        headerLogoIcon={FiUsers}
        headerTitle={"Devs Manager"}
        menuItems={items}
        footerTitle={"Devs Manager"}
        children={children}
      />
    </>
  )
}

const items = [
  {
    title: "Devs",
    href: "/devs",
    Icon: FiUsers
  },
  {
    title: "Levels",
    href: "/levels",
    Icon: FiBarChart,
  },
]
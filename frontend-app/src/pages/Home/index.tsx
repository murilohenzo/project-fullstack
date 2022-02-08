import { useState } from "react"
import { SideBar } from "../../components/Sidebar"
import { FiUsers, FiBarChart } from "react-icons/fi";

export const Home = () => {

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
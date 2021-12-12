import PostIcon from "@material-ui/icons/Book";
import DashboardIcon from "@material-ui/icons/Dashboard";
import UserIcon from "@material-ui/icons/Group";
import { Layout, Menu, MenuItemLink } from "react-admin";

export const MyMenu = (props: any) => (
  <Menu {...props}>
    {/* <DashboardMenuItem /> */}
    <MenuItemLink
      to="/"
      primaryText="Estadísticas"
      leftIcon={<DashboardIcon />}
    />
    <MenuItemLink to="/users" primaryText="Usuarios" leftIcon={<UserIcon />} />
    <MenuItemLink
      to="/challenges"
      primaryText="Desafíos"
      leftIcon={<PostIcon />}
    />
  </Menu>
);

export const MyLayout = (props: any) => <Layout {...props} menu={MyMenu} />;

import { DashboardMenuItem, Menu, MenuItemLink, Layout } from "react-admin";
import UserIcon from "@material-ui/icons/Group";
import PostIcon from "@material-ui/icons/Book";

export const MyMenu = (props: any) => (
  <Menu {...props}>
    <DashboardMenuItem />
    <MenuItemLink to="/users" primaryText="Usuarios" leftIcon={<UserIcon />} />
    <MenuItemLink
      to="/challenges"
      primaryText="Desafios"
      leftIcon={<PostIcon />}
    />
  </Menu>
);

export const MyLayout = (props: any) => <Layout {...props} menu={MyMenu} />;

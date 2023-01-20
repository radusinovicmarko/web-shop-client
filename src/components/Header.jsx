import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { authenticated } = useSelector((state) => state.user);

  const pages = [
    {
      link: "/proizvodi",
      title: "Proizvodi",
      auth: false,
      nonAuth: false,
      key: 1
    },
    {
      link: "/profil",
      title: "Profil",
      auth: true,
      nonAuth: false,
      key: 2
    },
    {
      link: "/korisnicka-podrska",
      title: "Korisnička podrška",
      auth: true,
      nonAuth: false,
      key: 3
    },
    {
      link: "/prijava",
      title: "Prijava",
      auth: false,
      nonAuth: true,
      key: 4
    },
    {
      link: "/registracija",
      title: "Registracija",
      auth: false,
      nonAuth: true,
      key: 5
    },
    {
      link: "/odjava",
      title: "Odjava",
      auth: true,
      nonAuth: false,
      key: 6
    }
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none"
            }}
          >
            IP WebShop
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              {pages.map((page) => (
                ((page.auth && authenticated) || (!page.auth && !authenticated) || (!page.auth && !page.nonAuth)) && <MenuItem key={page.key} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component={Link}
                    to={page.link}
                    sx={{ textDecoration: "none", color: "text.main" }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none"
            }}
          >
            IP WebShop
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.slice(0, 3).map((page) => (
              ((page.auth && authenticated) || (!page.auth && !authenticated) || (!page.auth && !page.nonAuth)) && <Link
                to={page.link}
                key={page.key}
                style={{ textDecoration: "none" }}
              >
                <Button sx={{ my: 2, color: "text.main", display: "block" }}>
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" }, position: "absolute", right: "10px" }}>
            {pages.slice(3, 6).map((page) => (
              ((page.auth && authenticated) || (!page.auth && !authenticated) || (!page.auth && !page.nonAuth)) && <Link
                to={page.link}
                key={page.key}
                style={{ textDecoration: "none" }}
              >
                <Button sx={{ my: 2, color: "text.main", display: "block" }}>
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    /* <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none"
            }}
          >
            IP WebShop
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {pages.map((page) => (
              <Link to={page.link} key={page.key} style={{ textDecoration: "none" }}>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, display: "flex", position: "absolute", right: "10px" }}>
            <Link to={"/prijava"} key={1} style={{ textDecoration: "none" }}>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {"Prijava"}
              </Button>
            </Link>
            <Link to={"/registracija"} key={2} style={{ textDecoration: "none" }}>
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {"Registracija"}
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar> */
  );
};

export default Header;

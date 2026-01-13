import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Collapse,
} from "@mui/material";
import {
  Logout,
  Store,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { storeStaffMenu } from "./configStoreStaffSidebar";

const sideBtn = {
  justifyContent: "flex-start",
  color: "text.primary",
  textTransform: "none",
};

const StoreStaffSidebar = () => {
  const navigate = useNavigate();
  const [openStock, setOpenStock] = useState(false);

  return (
    <Box
      sx={{
        width: 240,
        bgcolor: "background.default",
        p: 2,
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      <Typography variant="h6" fontWeight="bold" mb={3} textAlign="center">
        <Store sx={{ mr: 1 }} />
        Store Staff
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <List>
        {storeStaffMenu.map((item, index) => (
          <Box key={index}>
            {item.subMenu ? (
              <>
                <Button
                  fullWidth
                  sx={sideBtn}
                  startIcon={item.icon}
                  endIcon={openStock ? <ExpandLess /> : <ExpandMore />}
                  onClick={() => setOpenStock(!openStock)}
                >
                  {item.label}
                </Button>

                <Collapse in={openStock} timeout="auto" unmountOnExit>
                  <Box sx={{ pl: 4 }}>
                    {item.subMenu.map((sub, i) => (
                      <Button
                        key={i}
                        fullWidth
                        sx={sideBtn}
                        startIcon={sub.icon}
                        onClick={() => navigate(sub.path)}
                      >
                        {sub.name}
                      </Button>
                    ))}
                  </Box>
                </Collapse>
              </>
            ) : (
              <Button
                fullWidth
                sx={sideBtn}
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            )}
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <ListItemButton
          sx={{ color: "error.main" }}
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          <ListItemIcon sx={{ color: "error.main" }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default StoreStaffSidebar;

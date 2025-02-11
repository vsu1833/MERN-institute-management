// src/Footer.js
import React from "react";
import { Box, Container, Grid, Typography, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.grey[900],
        color: theme.palette.common.white,
        py: 6,
        borderTop: `4px solid ${theme.palette.primary.main}`,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* School Info Column */}
          <Grid item xs={12} md={5}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 700,
                letterSpacing: 1.2,
                color: theme.palette.primary.light,
              }}
            >
              School Management System
            </Typography>
            <Typography
              variant="body2"
              sx={{ mb: 2, color: theme.palette.grey[400] }}
            >
              Comprehensive school administration solution for modern
              educational institutions
            </Typography>
          </Grid>

          {/* Contact Column */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 700,
                letterSpacing: 1.2,
                color: theme.palette.primary.light,
              }}
            >
              Open Source
            </Typography>
            <Link
              href="https://github.com/your-username/school-management-system"
              target="_blank"
              rel="noopener"
              color="inherit"
              sx={{
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  color: theme.palette.primary.light,
                  textDecoration: "none",
                },
              }}
            >
              <GitHubIcon sx={{ mr: 1.5, color: theme.palette.grey[400] }} />
              <Typography variant="body2">Contribute on GitHub</Typography>
            </Link>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box
          sx={{
            mt: 4,
            pt: 4,
            borderTop: `1px solid ${theme.palette.divider}`,
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ letterSpacing: 1.1, color: theme.palette.grey[400] }}
          >
            © {currentYear} School Management System |
            <Link
              href="https://github.com/your-username/school-management-system"
              target="_blank"
              rel="noopener"
              color="inherit"
              sx={{
                ml: 1,
                "&:hover": {
                  color: theme.palette.primary.light,
                  textDecoration: "none",
                },
              }}
            >
              View Source Code
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;

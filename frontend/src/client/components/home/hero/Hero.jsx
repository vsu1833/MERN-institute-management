import { Box, Typography } from "@mui/material";

import('./Hero.css')

export default function Hero() {

    return (
        <>
            <Box className="container-hero" sx={{ display: 'flex', justifyContent: "center", alignItems: "center", minHeight: '90vh' }} component={'div'}>
                <Typography className="text-beautify hero-text">SCHOOL MANAGEMENT SYSTEM</Typography>
            </Box>
        </>
    )
}
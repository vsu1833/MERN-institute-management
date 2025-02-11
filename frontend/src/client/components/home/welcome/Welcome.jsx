import { Box, Typography } from "@mui/material";

export default function Welcome() {

    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "300px", background: 'rgb(85, 87, 88)',padding:"20px" }}>
                <Typography className="text-beautify" variant="h2">Welcome To Movie Casting</Typography>
                <Typography className="text-beautify" variant="p">Movie Casting is India's leading casting agency with  over a decade of experience in providing
                    productions with the artists.
                </Typography>

            </Box>

        </>
    )
}
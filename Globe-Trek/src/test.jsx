import { Routes, Route } from "react-router-dom";
import { Box, Stack, TextField, Button, Paper, Typography } from "@mui/material";




function Test() {
    return(
        <Box sx={{ p: 4 }}>
            <TextField    
                label="Search for a city"
                variant="outlined"
                fullWidth
            />
        </Box>
    )
}

export default Test;
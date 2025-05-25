
"use client";

import Layout from "@/components/layout";
import { Box, Typography } from "@mui/material";


const DashboardPage = () => {
    return (
        <Layout>
            <Box sx={{ width: "100%", height: "100%" }}>
                <Typography variant="h2" sx={{ mt: "400px" }}>Welcome to your Dashboard!</Typography>
            </Box>
        </Layout>
    );
};

export default DashboardPage;

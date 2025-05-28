export const renderContent = (loading, error, carsInfo, t ) => {
    if (loading) {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
                <CircularProgress color="success" />
                <Typography mt={2}>{t("carsPage.loadingCars")}</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" variant="h6" mt={10} textAlign="center">
                {t("carsPage.errorLoadingCars", { error })}
            </Typography>
        );
    }

    if (carsInfo.length === 0) {
        return (
            <Typography variant="h6" mt={10} textAlign="center">
                {t("carsPage.noCarsFound")}
            </Typography>
        );
    }
}
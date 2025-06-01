import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import useCarStore from "@/stores/useCarStore";
import { useEffect, useCallback } from "react";
import api from '@/lib/axios';

const CarsListComponent = () => {
  const { t } = useTranslation("translation");

  const {
    carsInfo,
    selectedCars,
    toggleCarSelection,
    loading,
    error,
    fetchCars,
  } = useCarStore();


  const isSelected = useCallback(
    (id) => selectedCars.some((c) => c.id === id),
    [selectedCars]
  );

  const selectedCarAvlIds = useCarStore((state) => state.selectedCarAvlIds);

  useEffect(() => {
    console.log("selectedCarAvlIds:", selectedCarAvlIds.join(","));  //....................

    if (!selectedCarAvlIds || selectedCarAvlIds.length === 0) return;

    const fetchInitialPosition = async () => {
        console.log(selectedCarAvlIds.join(","))
      try {
        const { data } = await api.get("v2/points", {
          params: {
            avlIds: selectedCarAvlIds.join(","),
            convertedToLocal: true,
          },
        });
        console.log(" response: ", data) //....................

        data.forEach((item) => {

          const avlId = `${item.avlID}`;
          const newPosition = [item.latitude, item.longitude];
          const vehiclePositions = useCarStore.getState().vehiclePositions;


          if (
            !vehiclePositions[avlId] ||
            !vehiclePositions[avlId].some(
              (pos) => pos[0] === newPosition[0] && pos[1] === newPosition[1]
            )
          ) {
            useCarStore.getState().addVehiclePosition(avlId, newPosition);
          }
        });
      } catch (error) {
        console.log("خطا در دریافت موقعیت خودرو.");
      }
    };

    fetchInitialPosition();

    const interval = setInterval(fetchInitialPosition, 5000);
    return () => clearInterval(interval);
  }, [selectedCarAvlIds]);



  useEffect(() => {
    if (!carsInfo || carsInfo.length === 0) {
      fetchCars();
    }
  }, []);


  const renderContent = () => {
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
        <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
          <Typography color="error" variant="h6" mt={10} textAlign="center">
            {t("carsPage.errorLoadingCars", { error })}
          </Typography>
        </Box>
      );
    }

    if (carsInfo.length === 0) {
      return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
          <CircularProgress color="success" />
          <Typography variant="h6" mt={10} textAlign="center">
            {t("carsPage.noCarsFound")}
          </Typography>
        </Box>
      );
    }

    return (
      <List
        subheader={
          <Typography align="center" variant="h6" sx={{ my: 1 }}>
            {t("drawer.myVehicles")}
          </Typography>
        }
      >
        {carsInfo.map((item) => (
          <ListItem disablePadding key={item.id}>
            <ListItemButton
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#2b76d0",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#2b76d0cc",
                  },
                },
              }}
              onClick={() => { toggleCarSelection(item) }}
              selected={isSelected(item.id)}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        p: 3,
        transform: {
          xs: "scale(0.7)",
          sm: "scale(1)",
        },
      }}
    >
      {renderContent()}
    </Box>
  );
};
export default CarsListComponent;

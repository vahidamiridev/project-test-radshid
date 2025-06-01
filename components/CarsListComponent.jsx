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
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const CarsListComponent = () => {
  const intervalRef = useRef(null);
  const { t } = useTranslation("translation");
  const {
    vehiclePositions,
    addVehiclePosition,
    carsInfo,
    selectedCars,
    toggleCarSelection,
    selectedCarAvlIds,
    loading,
    error,
    fetchCars,
  } = useCarStore();

  const isSelected = (id) => selectedCars.some((c) => c.id === id);

  useEffect(() => {
    // console.log(selectedCars);
    // console.log(selectedCarAvlIds);

    if (!carsInfo || carsInfo.length === 0) {
      console.log(carsInfo);
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
              onClick={() => {
                toggleCarSelection(item, (selectedCarAvlIds) => {
                  if (selectedCarAvlIds.length === 0) return;
                  const fetchInitialPosition = async () => {
                    try {
                      const { data } = await api.get("v2/points", {
                        params: {
                          avlIds: selectedCarAvlIds.join(","),
                          convertedToLocal: true,
                        },
                      });
                      console.log("Fetched vehicle positions:", data);
                      data.forEach((item) => {
                        const avlId = `${item.avlId}`;
                        const newPosition = [item.latitude, item.longitude];
                        // اگر موقعیت جدید وجود ندارد یا متفاوت است، اضافه کن
                        if (
                          !vehiclePositions[avlId] ||
                          !vehiclePositions[avlId].some(
                            (pos) =>
                              pos[0] === newPosition[0] &&
                              pos[1] === newPosition[1]
                          )
                        ) {
                          addVehiclePosition(avlId, newPosition);
                        }
                      });
                    } catch (error) {
                      console.error("Error fetching vehicle position:", error);
                      toast.error(
                        "خطا در دریافت موقعیت خودرو. لطفاً اتصال دستگاه را بررسی کنید."
                      );
                    }
                  };
                  // ⬅️ این اجرا میشه بلافاصله بعد از انتخاب خودرو
                  if (intervalRef.current) clearInterval(intervalRef.current);
                  fetchInitialPosition();
                  const interval = setInterval(fetchInitialPosition, 5000);
                });
              }}
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

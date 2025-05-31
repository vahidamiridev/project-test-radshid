import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useTranslation } from 'react-i18next';
import useCarStore from '@/stores/useCarStore';

const CarsListComponent = () => {
    const { t } = useTranslation('translation');
    const { carsInfo, selectedCars, toggleCarSelection } = useCarStore();

    const isSelected = (id) => selectedCars.some(c => c.id === id);

    return (
        <Box sx={{
            height: "100%", width: "100%", p: 3,
            transform: {
                xs: 'scale(0.7)',
                sm: 'scale(1)',
            },
        }}>
            <List
                subheader={
                    <Typography align="center" variant="h6" sx={{ my: 1 }}>
                        {t('drawer.myVehicles')}
                    </Typography>
                }
            >
                {carsInfo.map((item) => (
                    <ListItem disablePadding key={item.id}>
                        <ListItemButton
                            sx={{
                                '&.Mui-selected': {
                                    backgroundColor: '#2b76d0',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#2b76d0cc',
                                    },
                                },
                            }}
                            onClick={() => toggleCarSelection(item)}
                            selected={isSelected(item.id)}
                        >
                            <ListItemText primary={item.title} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}
export default CarsListComponent;

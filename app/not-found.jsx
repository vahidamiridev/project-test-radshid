'use client'
import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';
function Notfound() {
  const { t } = useTranslation('translation');
  return (
    <Box sx={{ textAlign: 'center', padding: '5rem' }}>
      <Typography variant='h1' sx={{ mb: 8 }}>{t("not_found.title")}</Typography>
      <Typography>{t("not_found.description")} </Typography>
    </Box>
  )
}
export default Notfound 
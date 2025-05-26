import { Box, Typography } from '@mui/material'
function Notfound() {
  return (
    <Box sx={{ textAlign: 'center', padding: '5rem' }}>
      <Typography variant='h1' sx={{ mb: 8 }}>صفحه مورد نظر پیدا نشد</Typography>
      <Typography>لطفا آدرس را بررسی کنید یا به صفحه اصلی بازگردید.</Typography>
    </Box>
  )
}
export default Notfound
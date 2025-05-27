// app/map/page.tsx

'use client'
import dynamic from 'next/dynamic'
import { Box, Typography } from '@mui/material'

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
})

const MapPage = () => {
  let carSelected = "آذرخش" 
  return (
    <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>

        <MapComponent />

    </Box>
  )
}

export default MapPage

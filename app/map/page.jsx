// app/map/page.tsx

'use client'
import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { useEffect } from 'react'
import  useCarStore  from '@/stores/useCarStore'

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
})

const MapPage = () => {


const {carsInfo} = useCarStore()
  useEffect(() => {
    console.log(carsInfo)

  })
  return (
    <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <MapComponent />
    </Box>
  )
}

export default MapPage

import React from 'react'

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>
}

const IndividualHousePage = async ({ params }: PropertyDetailPageProps) => {
  const { id } = await params

  return (
    <div>IndividualHousePage — {id}</div>
  )
}

export default IndividualHousePage

'use client'
import React from 'react'
import EditCreateCarDetails, {
  EditCreateCarDetailsProps,
} from '@/app/components/EditCreateCarDetails/EditCreateCarDetails'

const CreateNewCar: React.FC = () => {
  const editCreateCarDetailProps: EditCreateCarDetailsProps = {
    postValues: (values) => console.log(values),
  }

  return (
    <div>
      <title>Create new car</title>
      <EditCreateCarDetails postValues={editCreateCarDetailProps.postValues} />
    </div>
  )
}

export default CreateNewCar

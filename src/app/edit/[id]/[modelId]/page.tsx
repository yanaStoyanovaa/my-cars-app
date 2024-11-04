'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import EditCreateCarDetails, {
  EditCreateCarDetailsProps,
} from '@/app/components/EditCreateCarDetails/EditCreateCarDetails'
import { CarModification } from '@/lib/_generated/graphql_sdk'
import { GraphQLBackend } from '@/lib/api/graphql'

const EditCarModification: React.FC = () => {
  const { id, modelId } = useParams()
  const [car, setCar] = useState<unknown>({})

  const { data, isLoading } = useQuery<CarModification[]>({
    queryKey: ['carModifications', modelId],
    retry: false,
    queryFn: async () => {
      const response = await GraphQLBackend.GetCarModificationsByModel({
        modelId: modelId as string,
      })
      return response.carModifications
    },
    enabled: !!modelId,
  })

  useEffect(() => {
    const filteredModifications = data && data.find((car) => car.id == id)
    console.log(data, filteredModifications)

    setCar(filteredModifications as {})
  }, [data])

  console.log(car)

  const editCreateCarDetailProps: EditCreateCarDetailsProps = {
    postValues: (values) => console.log(values),
    car: car as CarModification,
  }

  return (
    <div>
      {!isLoading && (
        <EditCreateCarDetails
          postValues={editCreateCarDetailProps.postValues}
          car={editCreateCarDetailProps.car}
        />
      )}
    </div>
  )
}

export default EditCarModification

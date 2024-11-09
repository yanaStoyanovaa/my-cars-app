'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import EditCreateCarDetails, {
  EditCreateCarDetailsProps,
} from '@/app/components/EditCreateCarDetails/EditCreateCarDetails'
import {
  CarCoupe,
  CarModification,
  CarModificationData,
  EditCarModificationMutation,
} from '@/lib/_generated/graphql_sdk'
import { GraphQLBackend } from '@/lib/api/graphql'
import Loader from '@/app/components/Loader/Loader'

const EditCarModification: React.FC = () => {
  const { id, modelId } = useParams()
  const [car, setCar] = useState<CarModification>({
    name: '',
    coupe:  CarCoupe.Convertible,
    horsePower: 0,
    weight: 0,
    id: "",
    model: {
      id: "0",
      name: "",
      brand: {
        id: "0",
        name: "Audi"
      }
    }

  
  
  })
  const [isSubmitting, setIsSubmitting] = useState(false) 
  const [error, setError] = useState<Error | null>(null) 



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



  const editCarModification = async (values: CarModification) => {
    setIsSubmitting(true)
    setError(null)


    console.log("Sending payload to EditCarModification:", values)

    try {
      const updatedCar: EditCarModificationMutation = await GraphQLBackend.EditCarModification({
        data: values, 
      })
      console.log('Successfully updated:', updatedCar)
    } catch (err) {
      setError(err as Error)
      console.error('Error updating car modification:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const filteredModifications = data && data.find((car) => car.id == id)

    setCar(filteredModifications as CarModification)
  }, [data])




  const editCreateCarDetailProps: EditCreateCarDetailsProps = {
    postValues: (values) =>
    editCarModification({
      id : car.id,
      name: values.modification,
      coupe: car.coupe,
      horsePower: values.horsePower,
      weight: values.weight,
      model : {
        id : values.model,
        name: "",
        brand : {
          name: "",
          id : values.brand
        }
      }
    }),
    car: car as CarModification,
  }

  if (isLoading) return <Loader message="Loading car details..." />
  if (isSubmitting) return <Loader message="Submitting changes..." />
  if (error) return <p>Error updating car modification: {error.message}</p>

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

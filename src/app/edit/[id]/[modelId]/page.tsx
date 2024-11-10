'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
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
  const router = useRouter()
  const [car, setCar] = useState<CarModification>({
    name: '',
    coupe: CarCoupe.Convertible,
    horsePower: 0,
    weight: 0,
    id: '',
    model: {
      id: '0',
      name: '',
      brand: {
        id: '0',
        name: 'Audi',
      },
    },
  })
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

  const editCarModification = async (values: CarModificationData) => {
    setError(null)

    try {
      const res = await GraphQLBackend.EditCarModification({
        data: values,
      })
      console.log('response edit', res)
    } catch (err) {
      setError(err as Error)
    } finally {
      router.push('/')
    }
  }

  useEffect(() => {
    const filteredModifications = data && data.find((car) => car.id == id)

    setCar(filteredModifications as CarModification)
  }, [data])

  const editCreateCarDetailProps: EditCreateCarDetailsProps = {
    //why no put/post for carModification?
    //how to update all?
    postValues: (values) =>
      editCarModification({
        id: car.id,
        name: values.modification,
        coupe: car.coupe,
        horsePower: values.horsePower,
        weight: values.weight,
        // model : {
        //   id : values.model,
        //   name: value.modelName,
        //   brand : {
        //     name: value.brandName,
        //     id : values.brand
        //   }
        // }
      }),
    car: car as CarModification,
  }

  if (isLoading) return <Loader message="Loading car details..." />
  if (error) return <p>Error updating car modification: {error.message}</p>

  return (
    <div style={{backgroundColor : "#121212"}}>
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

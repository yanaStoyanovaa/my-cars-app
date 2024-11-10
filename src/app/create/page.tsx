'use client'
import React, { useState } from 'react'
import EditCreateCarDetails, {
  EditCreateCarDetailsProps,
} from '@/app/components/EditCreateCarDetails/EditCreateCarDetails'
import { GraphQLBackend } from '@/lib/api/graphql'
import { CarModification } from '@/lib/_generated/graphql_sdk'
import { useRouter } from 'next/navigation'

const CreateNewCar: React.FC = () => {
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()

  const createCarModification = async (values: CarModification) => {
    setError(null)

    try {
     const res = await GraphQLBackend.CreateCarModification({
        modelId: values.model.id,
        name: values.name,
      })
      console.log("response", res)
    } catch (err) {
      setError(err as Error)
    } finally {
       router.push('/')
    }
  }

  const editCreateCarDetailProps: EditCreateCarDetailsProps = {
    //why no put/post for carModification?
    //how to update all?
    postValues: (values) =>
      createCarModification({
        id: values.id,
        name: values.modification,
        coupe: values.coupe,
        horsePower: values.horsePower,
        weight: values.weight,
        model: {
          id: values.model,
          name: values.modelName,
          brand: {
            name: values.brandName,
            id: values.brand,
          },
        },
      }),
  }

  if (error) return <p>Error creating car modification: {error.message}</p>


  return (
    <div>
      <title>Create new car</title>
      <EditCreateCarDetails postValues={editCreateCarDetailProps.postValues} />
    </div>
  )
}

export default CreateNewCar

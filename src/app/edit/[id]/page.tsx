'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import EditableSearchableSelect from '@/app/components/SearchSelectCreate/SearchSelectCreate'
import EditCreateCarDetails, { EditCreateCarDetailsProps } from '@/app/components/EditCreateCarDetails/EditCreateCarDetails'

const EditCarModification: React.FC = () => {
  const { id } = useParams()
  const editCreateCarDetailProps: EditCreateCarDetailsProps = {
    postValues: (values) => console.log(values),
    id: id
  }


  return (
    <div>
      <EditCreateCarDetails postValues={editCreateCarDetailProps.postValues} id={id}/>
    </div>
  )
}

export default EditCarModification

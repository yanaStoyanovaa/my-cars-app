'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import EditableSearchableSelect from '@/app/components/EditableSearchableSelect/EditableSearchableSelect'
import EditCreateCarDetails, { EditCreateCarDetailsProps } from '@/app/components/EditCreateCarDetails/EditCreateCarDetails'

const CreateNewCar: React.FC = () => {
  const editCreateCarDetailProps: EditCreateCarDetailsProps = {
    postValues: (values) => console.log()
  }
    
  return (
    <div>
      <EditCreateCarDetails postValues={editCreateCarDetailProps.postValues}/>
    </div>
  )
}

export default CreateNewCar

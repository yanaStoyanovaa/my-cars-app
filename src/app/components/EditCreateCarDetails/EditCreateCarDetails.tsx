'use client'
import React, { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import EditableSearchableSelect from '@/app/components/SearchSelectCreate/SearchSelectCreate'
import styles from './EditCreateCarDetails.module.scss'
import { useQuery } from '@tanstack/react-query'
import { GraphQLBackend } from '@/lib/api/graphql'
import { CarModification } from '@/lib/_generated/graphql_sdk'

export interface EditCreateCarDetailsProps {
  postValues: (values: any) => void
  id?: any
}

const EditCreateCarDetails = (props: EditCreateCarDetailsProps) => {
  const { id } = props
  const router = useRouter()
  const title = props.id
    ? `Edit Car Modification ${props.id}`
    : 'Create new Car Modification'

  const { data, isLoading, error } = useQuery<CarModification[]>({
    queryKey: ['carModifications', id],
    retry: false,
    queryFn: async () => {
      const response = await GraphQLBackend.GetCarModificationsByModel({
        modelId: id as string,
      })
      return response.carModifications
    },
    enabled: !!id, // Ensure the query only runs if modelId is provided
  })

  console.log(data)

  const initialValues = {
    brand:  '',
    model: '',
    modification: '',
    horsePower: 0,
    weight: 0,
  }

  const handleSubmit = (values: typeof initialValues) => {
    props.postValues(values)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => (
          <Form>
            <div className={styles.form}>
              <div className={styles.fieldContainer}>
                <label>Brand</label>
                <EditableSearchableSelect
                  name="brand"
                  placeholder="Select or create brand"
                  queryKey="brands"
                  onChange={(value) => setFieldValue('brand', value)}
                />
                <ErrorMessage
                  name="brand"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              <div className={styles.fieldContainer}>
                <label>Model</label>
                <EditableSearchableSelect
                  name="model"
                  placeholder="Select or create model"
                  queryKey="models"
                  selectedId={values.brand}
                  onChange={(value) => setFieldValue('model', value)}
                />
                <ErrorMessage
                  name="model"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              <div className={styles.fieldContainer}>
                <label>Modification</label>
                <EditableSearchableSelect
                  name="modification"
                  placeholder="Select or create modification"
                  queryKey="modifications"
                  selectedId={values.model}
                  onChange={(value) => setFieldValue('modification', value)}
                />
                <ErrorMessage
                  name="modification"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              <div className={styles.fieldContainer}>
                <label>Horse Power</label>
                <Field
                  name="horsePower"
                  type="number"
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                  }}
                />
                <ErrorMessage
                  name="horsePower"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              <div className={styles.fieldContainer}>
                <label>Weight</label>
                <Field
                  name="weight"
                  type="number"
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                  }}
                />
                <ErrorMessage
                  name="weight"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.primaryButton}>
                Save Car
              </button>
              <button
                onClick={() => router.back()}
                className={styles.secondaryButton}
              >
                Go Back
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditCreateCarDetails

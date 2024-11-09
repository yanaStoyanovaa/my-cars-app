'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import EditableSearchableSelect from '@/app/components/EditableSearchableSelect/EditableSearchableSelect'
import styles from './EditCreateCarDetails.module.scss'
import { CarModification } from '@/lib/_generated/graphql_sdk'
import { validationSchema } from './validationSchema'
import Loader from '../Loader/Loader'

export interface EditCreateCarDetailsProps {
  postValues: (values: any) => void
  car?: CarModification
}

const EditCreateCarDetails = (props: EditCreateCarDetailsProps) => {
  const { postValues, car } = props
  const router = useRouter()


  const title = car
    ? `Edit Car Modification ${car.model.id}`
    : 'Create new Car Modification'

  const initialValues = {
    brand: car ? car.model.brand.id : '',
    model: car ? car.model.id : '',
    modification: car ? car.id : '',
    horsePower: car ? car.horsePower : 0,
    weight: car ? car.weight : 0,
  }

  const handleSubmit = (values: typeof initialValues) => {
    postValues(values)
  }


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize={true}
        validationSchema={validationSchema}
      >
        {({ setFieldValue, values, isValid, dirty }) => (
          <Form>
            <div className={styles.form}>
              {/* Brand Field */}
              <div className={styles.fieldContainer}>
                <label>Brand</label>
                <EditableSearchableSelect
                  name="brand"
                  placeholder="Select or create brand"
                  queryKey="brands"
                  selectedId={values.brand} // Initial value from `car` if provided
                  onChange={(value) => {
                    setFieldValue('brand', value)
                    setFieldValue('model', '') // Clear model when brand changes
                    setFieldValue('modification', '') // Clear modification when brand changes
                  }}
                />
                <ErrorMessage
                  name="brand"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              {/* Model Field */}
              <div className={styles.fieldContainer}>
                <label>Model</label>
                <EditableSearchableSelect
                  name="model"
                  placeholder="Select or create model"
                  queryKey="models"
                  selectedId={values.brand} // Model depends on selected brand
                  onChange={(value) => {
                    setFieldValue('model', value)
                    setFieldValue('modification', '') // Clear modification when model changes
                  }}
                  disabled={!values.brand}
                />
                <ErrorMessage
                  name="model"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              {/* Modification Field */}
              <div className={styles.fieldContainer}>
                <label>Modification</label>
                <EditableSearchableSelect
                  name="modification"
                  placeholder="Select or create modification"
                  queryKey="modifications"
                  selectedId={car ? car.model.id : values.model} // Modification depends on selected model
                  selectedModificationID={car ? car.id : ''}
                  onChange={(value) => setFieldValue('modification', value)}
                  disabled={!values.model}
                />
                <ErrorMessage
                  name="modification"
                  component="div"
                  className={styles.errorMessage}
                />
              </div>

              {/* Horse Power Field */}
              <div className={styles.fieldContainer}>
                <label>Horse Power</label>
                <Field
                  name="horsePower"
                  type="number"
                  className={styles.numberInput}
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

              {/* Weight Field */}
              <div className={styles.fieldContainer}>
                <label>Weight</label>
                <Field
                  name="weight"
                  type="number"
                  className={styles.numberInput}
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

            {/* Buttons */}
            <div className={styles.buttonContainer}>
              <button
                type="submit"
                className={styles.primaryButton}
                disabled={!isValid || !dirty} 
              >
                Save Car
              </button>
              <button
                type="button"
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

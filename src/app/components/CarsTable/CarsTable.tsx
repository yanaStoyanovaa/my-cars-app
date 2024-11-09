'use client'
import { CarModification } from '@/lib/_generated/graphql_sdk'
import { GraphQLBackend } from '@/lib/api/graphql'
import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons'
import { Button, Table, Text } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from "next/navigation";
import React from 'react'
import './CarsTable.scss'
import Loader from '../Loader/Loader'

const CarsDataTable: React.FC = () => {
  const router = useRouter();
  const { data, isLoading, error } = useQuery<CarModification[]>({
    queryKey: ['carModifications'],
    retry: false,
    queryFn: async () => {
      const response = await GraphQLBackend.FetchCarModifications()
      return response.allCarModifications
    },
  })

  if (isLoading) return <Loader message='Loading cars table'/>
  if (error) return <p className="error">Error loading data</p>

  
  return (
    <div className="table-container">
      <div className="table-header">
        <Text className="table-title">Cars Table</Text>
        <Button className="create-button" onClick={() => router.push('create')}>
          <PlusIcon className="button-icon" />
          Add New Car
        </Button>
      </div>

      <div className="table-wrapper">
      <Table.Root className="table-root">
        <Table.Header>
          <Table.Row className="table-row header-row">
            <Table.ColumnHeaderCell className="table-cell">Brand</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="table-cell">Model</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="table-cell">Modification</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="table-cell">Horse Power</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="table-cell">Weight</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="table-cell">Edit</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data &&
            data.map((car) => (
              <Table.Row key={car.id} className="table-row">
                <Table.RowHeaderCell className="table-cell">{car.model.brand.name}</Table.RowHeaderCell>
                <Table.Cell className="table-cell">{car.model.name}</Table.Cell>
                <Table.Cell className="table-cell">{car.name}</Table.Cell>
                <Table.Cell className="table-cell">{car.horsePower}</Table.Cell>
                <Table.Cell className="table-cell">{car.weight}</Table.Cell>
                <Table.Cell className="table-cell">
                  <Button className="edit-button" onClick={() => router.push(`/edit/${car.id}/${car.model.id}`)}>
                    <Pencil1Icon className="button-icon" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
      </div>
    </div>
  )
}

export default CarsDataTable

'use client'
import { CarModification } from '@/lib/_generated/graphql_sdk'
import { GraphQLBackend } from '@/lib/api/graphql'
import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons'
import { Button, Table } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'

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



  if (isLoading) return <p>Loading data...</p>
  if (error) return <p>Error loading data</p>

  return (
    <>
    <Button onClick={() => router.push(`create`)}>
    <PlusIcon />
  </Button>
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Brand</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Model</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Modification</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Horse Power</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Weight</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Edit</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data &&
          data.map((car) => (
            <Table.Row key={car.id}>
              <Table.RowHeaderCell>{car.model.brand.name}</Table.RowHeaderCell>
              <Table.Cell>{car.model.name}</Table.Cell>
              <Table.Cell>{car.name}</Table.Cell>
              <Table.Cell>{car.horsePower}</Table.Cell>
              <Table.Cell>{car.weight}</Table.Cell>
              <Table.Cell>
              <Button onClick={() => router.push(`/edit/${car.id}/${car.model.id}`)}>
                  <Pencil1Icon />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
    </>
  )
}

export default CarsDataTable

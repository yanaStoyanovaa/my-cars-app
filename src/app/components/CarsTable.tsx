import { Table } from '@radix-ui/themes'
import React from 'react'

const mockData = [
  {
    brand: { name: 'Toyota' },
    model: { name: 'Corolla' },
    modification: { name: 'XLE' },
    horsePower: 132,
    weight: 2800,
  },
  {
    brand: { name: 'Honda' },
    model: { name: 'Civic' },
    modification: { name: 'Sport' },
    horsePower: 158,
    weight: 2750,
  },
  {
    brand: { name: 'Ford' },
    model: { name: 'Focus' },
    modification: { name: 'Titanium' },
    horsePower: 160,
    weight: 2900,
  },
  // Add more mock entries if needed
]

export const CarsDataTable: React.FC = () => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Brand</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Model</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Modification</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Horse Power</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Weight</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {mockData.map((car, index) => (
          <Table.Row key={index}>
            <Table.RowHeaderCell>{car.brand.name}</Table.RowHeaderCell>
            <Table.Cell>{car.model.name}</Table.Cell>
            <Table.Cell>{car.modification.name}</Table.Cell>
            <Table.Cell>{car.horsePower}</Table.Cell>
            <Table.Cell>{car.weight}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

'use client'
import React from 'react'
import { GraphQLBackend } from '@lib/api/graphql'
import { useQuery } from '@tanstack/react-query'
import { CarBrand } from '@lib/_generated/graphql_sdk'

interface Props {
  className?: string
  children?: React.ReactNode
}

const TestCors: React.FC<Props> = (props) => {
  const { data, isLoading } = useQuery<CarBrand[]>({
    queryKey: ["brands"],
    retry: false,
    queryFn: async () => {
      const response = await GraphQLBackend.GetBrands()
      return response.carBrands
    },
  })

  return <div>{isLoading ? "loading data" : data?.length ?? 0}</div>
}

export default TestCors

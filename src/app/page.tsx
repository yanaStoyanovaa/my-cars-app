import { GraphQLBackend } from '@lib/api/graphql'
import TestCors from '@/app/TestCors'
import  CarsDataTable from './components/CarsTable/CarsTable'

export default async function Home() {
  const brand = await GraphQLBackend.GetBrands()

  return (
    <div className="">
      <title>Cars Table</title>
      <CarsDataTable/>
    </div>
  )
}
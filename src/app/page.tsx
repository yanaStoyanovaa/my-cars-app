import { GraphQLBackend } from '@lib/api/graphql'
import TestCors from '@/app/TestCors'
import  CarsDataTable from './components/CarsTable/CarsTable'

export default async function Home() {

  return (
    <div style={{backgroundColor : "#121212"}}>
      <title>Cars Table</title>
      <CarsDataTable/>
    </div>
  )
}
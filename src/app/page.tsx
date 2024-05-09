import { GraphQLBackend } from '@lib/api/graphql'
import TestCors from '@/app/TestCors'

export default async function Home() {
  const brand = await GraphQLBackend.GetBrands()

  return (
    <div className="">
      <TestCors />
      <div className="text-xs font-bold">
        {brand.carBrands?.map((brand) => (
          <div key={brand.id}>{brand.name}</div>
        ))}
      </div>
    </div>
  )
}
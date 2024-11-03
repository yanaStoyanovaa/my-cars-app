import { GraphQLClient } from 'graphql-request'
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type CacheConfig = {
  customKey?: InputMaybe<Scalars['String']['input']>
  extraKeys?: InputMaybe<Array<Scalars['String']['input']>>
  ttlMin?: InputMaybe<Scalars['Int']['input']>
  useCache?: InputMaybe<Scalars['Boolean']['input']>
}

export type CarBrand = {
  __typename?: 'CarBrand'
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export type CarBrandData = {
  id: Scalars['ID']['input']
  name: Scalars['String']['input']
}

export enum CarCoupe {
  Convertible = 'CONVERTIBLE',
  Coupe = 'COUPE',
  Hatchback = 'HATCHBACK',
  Sedan = 'SEDAN',
  Suv = 'SUV',
  Truck = 'TRUCK',
  Van = 'VAN',
  Wagon = 'WAGON',
}

export type CarModel = {
  __typename?: 'CarModel'
  brand: CarBrand
  id: Scalars['ID']['output']
  name: Scalars['String']['output']
}

export type CarModelData = {
  id: Scalars['ID']['input']
  name: Scalars['String']['input']
}

export type CarModification = {
  __typename?: 'CarModification'
  coupe: CarCoupe
  horsePower: Scalars['Int']['output']
  id: Scalars['ID']['output']
  model: CarModel
  name: Scalars['String']['output']
  weight: Scalars['Float']['output']
}

export type CarModificationData = {
  coupe?: InputMaybe<CarCoupe>
  horsePower?: InputMaybe<Scalars['Int']['input']>
  id: Scalars['ID']['input']
  name?: InputMaybe<Scalars['String']['input']>
  weight?: InputMaybe<Scalars['Float']['input']>
}

export type ClearCacheConfig = {
  clear?: InputMaybe<Scalars['Boolean']['input']>
  extraKeys?: InputMaybe<Array<Scalars['String']['input']>>
}

export enum Constraint {
  Email = 'EMAIL',
  Max = 'MAX',
  Min = 'MIN',
  Numeric = 'NUMERIC',
  OneOf = 'ONE_OF',
  Password = 'PASSWORD',
  Required = 'REQUIRED',
}

export type EditExtraValidations = {
  afterSave?: InputMaybe<Array<Scalars['String']['input']>>
  beforeSave?: InputMaybe<Array<Scalars['String']['input']>>
}

export enum EntityFilterSort {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type EntityToModel = {
  enable?: InputMaybe<Scalars['Boolean']['input']>
  excludeFields?: InputMaybe<Array<Scalars['String']['input']>>
}

export type Filter = {
  Condition: Scalars['String']['input']
  value?: InputMaybe<Scalars['String']['input']>
}

export type Mutation = {
  __typename?: 'Mutation'
  _health?: Maybe<Scalars['Boolean']['output']>
  createCarBrand: CarBrand
  createCarModel: CarModel
  createCarModification: CarModification
  deleteCarBrand: Scalars['Boolean']['output']
  deleteCarModel: Scalars['Boolean']['output']
  deleteCarModification: Scalars['Boolean']['output']
  editCarBrand: CarBrand
  editCarModel: CarModel
  editCarModification: CarModification
}

export type MutationCreateCarBrandArgs = {
  name: Scalars['String']['input']
}

export type MutationCreateCarModelArgs = {
  brandId: Scalars['ID']['input']
  name: Scalars['String']['input']
}

export type MutationCreateCarModificationArgs = {
  modelId: Scalars['ID']['input']
  name: Scalars['String']['input']
}

export type MutationDeleteCarBrandArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteCarModelArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteCarModificationArgs = {
  id: Scalars['ID']['input']
}

export type MutationEditCarBrandArgs = {
  data: CarBrandData
}

export type MutationEditCarModelArgs = {
  data: CarModelData
}

export type MutationEditCarModificationArgs = {
  data: CarModificationData
}

export type Query = {
  __typename?: 'Query'
  _health?: Maybe<Scalars['Boolean']['output']>
  allCarModifications: Array<CarModification>
  carBrands: Array<CarBrand>
  carModels: Array<CarModel>
  carModifications: Array<CarModification>
}

export type QueryCarModelsArgs = {
  brandId: Scalars['ID']['input']
}

export type QueryCarModificationsArgs = {
  modelId: Scalars['ID']['input']
}

export type ResultsPager = {
  page?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  sortField: Scalars['String']['input']
  sortOrder?: EntityFilterSort
}

export type ValidationCheck = {
  check: Constraint
  value?: InputMaybe<Scalars['String']['input']>
}

export type CarBrandDataFragment = {
  __typename?: 'CarBrand'
  id: string
  name: string
}

export type GetBrandsQueryVariables = Exact<{ [key: string]: never }>

export type GetBrandsQuery = {
  __typename?: 'Query'
  carBrands: Array<{ __typename?: 'CarBrand'; id: string; name: string }>
}

export type FetchCarModificationsQueryVariables = Exact<{
  [key: string]: never
}>

export type FetchCarModificationsQuery = {
  __typename?: 'Query'
  allCarModifications: Array<{
    __typename?: 'CarModification'
    id: string
    name: string
    horsePower: number
    weight: number
    coupe: CarCoupe
    model: {
      __typename?: 'CarModel'
      id: string
      name: string
      brand: { __typename?: 'CarBrand'; id: string; name: string }
    }
  }>
}

export type FetchCarModelsQueryVariables = Exact<{
  brandId: Scalars['ID']['input']
}>

export type FetchCarModelsQuery = {
  __typename?: 'Query'
  carModels: Array<{ __typename?: 'CarModel'; id: string; name: string }>
}

export type FetchCarModificationsByModelQueryVariables = Exact<{
  modelId: Scalars['ID']['input']
}>

export type FetchCarModificationsByModelQuery = {
  __typename?: 'Query'
  carModifications: Array<{
    __typename?: 'CarModification'
    id: string
    name: string
    horsePower: number
    weight: number
    coupe: CarCoupe
  }>
}

export type CreateCarBrandMutationVariables = Exact<{
  name: Scalars['String']['input']
}>

export type CreateCarBrandMutation = {
  __typename?: 'Mutation'
  createCarBrand: { __typename?: 'CarBrand'; id: string; name: string }
}

export type CreateCarModelMutationVariables = Exact<{
  brandId: Scalars['ID']['input']
  name: Scalars['String']['input']
}>

export type CreateCarModelMutation = {
  __typename?: 'Mutation'
  createCarModel: {
    __typename?: 'CarModel'
    id: string
    name: string
    brand: { __typename?: 'CarBrand'; id: string; name: string }
  }
}

export type CreateCarModificationMutationVariables = Exact<{
  modelId: Scalars['ID']['input']
  name: Scalars['String']['input']
  coupe?: InputMaybe<CarCoupe>
  horsePower?: InputMaybe<Scalars['Int']['input']>
  weight?: InputMaybe<Scalars['Float']['input']>
}>

export type CreateCarModificationMutation = {
  __typename?: 'Mutation'
  createCarModification: {
    __typename?: 'CarModification'
    id: string
    name: string
    coupe: CarCoupe
    horsePower: number
    weight: number
    model: {
      __typename?: 'CarModel'
      id: string
      name: string
      brand: { __typename?: 'CarBrand'; id: string; name: string }
    }
  }
}

export type GetCarModificationsByModelQueryVariables = Exact<{
  modelId: Scalars['ID']['input']
}>

export type GetCarModificationsByModelQuery = {
  __typename?: 'Query'
  carModifications: Array<{
    __typename?: 'CarModification'
    id: string
    name: string
    coupe: CarCoupe
    horsePower: number
    weight: number
    model: {
      __typename?: 'CarModel'
      id: string
      name: string
      brand: { __typename?: 'CarBrand'; id: string; name: string }
    }
  }>
}

export const CarBrandDataFragmentDoc = gql`
  fragment CarBrandData on CarBrand {
    id
    name
  }
`
export const GetBrandsDocument = gql`
  query GetBrands {
    carBrands {
      ...CarBrandData
    }
  }
  ${CarBrandDataFragmentDoc}
`
export const FetchCarModificationsDocument = gql`
  query FetchCarModifications {
    allCarModifications {
      id
      name
      horsePower
      weight
      coupe
      model {
        id
        name
        brand {
          id
          name
        }
      }
    }
  }
`
export const FetchCarModelsDocument = gql`
  query FetchCarModels($brandId: ID!) {
    carModels(brandId: $brandId) {
      id
      name
    }
  }
`
export const FetchCarModificationsByModelDocument = gql`
  query FetchCarModificationsByModel($modelId: ID!) {
    carModifications(modelId: $modelId) {
      id
      name
      horsePower
      weight
      coupe
    }
  }
`
export const CreateCarBrandDocument = gql`
  mutation CreateCarBrand($name: String!) {
    createCarBrand(name: $name) {
      id
      name
    }
  }
`
export const CreateCarModelDocument = gql`
  mutation CreateCarModel($brandId: ID!, $name: String!) {
    createCarModel(brandId: $brandId, name: $name) {
      id
      name
      brand {
        id
        name
      }
    }
  }
`
export const CreateCarModificationDocument = gql`
  mutation CreateCarModification(
    $modelId: ID!
    $name: String!
    $coupe: CarCoupe
    $horsePower: Int
    $weight: Float
  ) {
    createCarModification(modelId: $modelId, name: $name) {
      id
      name
      coupe
      horsePower
      weight
      model {
        id
        name
        brand {
          id
          name
        }
      }
    }
  }
`
export const GetCarModificationsByModelDocument = gql`
  query GetCarModificationsByModel($modelId: ID!) {
    carModifications(modelId: $modelId) {
      id
      name
      coupe
      horsePower
      weight
      model {
        id
        name
        brand {
          id
          name
        }
      }
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    GetBrands(
      variables?: GetBrandsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetBrandsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetBrandsQuery>(GetBrandsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetBrands',
        'query'
      )
    },
    FetchCarModifications(
      variables?: FetchCarModificationsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<FetchCarModificationsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FetchCarModificationsQuery>(
            FetchCarModificationsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'FetchCarModifications',
        'query'
      )
    },
    FetchCarModels(
      variables: FetchCarModelsQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<FetchCarModelsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FetchCarModelsQuery>(
            FetchCarModelsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'FetchCarModels',
        'query'
      )
    },
    FetchCarModificationsByModel(
      variables: FetchCarModificationsByModelQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<FetchCarModificationsByModelQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FetchCarModificationsByModelQuery>(
            FetchCarModificationsByModelDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'FetchCarModificationsByModel',
        'query'
      )
    },
    CreateCarBrand(
      variables: CreateCarBrandMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<CreateCarBrandMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateCarBrandMutation>(
            CreateCarBrandDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'CreateCarBrand',
        'mutation'
      )
    },
    CreateCarModel(
      variables: CreateCarModelMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<CreateCarModelMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateCarModelMutation>(
            CreateCarModelDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'CreateCarModel',
        'mutation'
      )
    },
    CreateCarModification(
      variables: CreateCarModificationMutationVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<CreateCarModificationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateCarModificationMutation>(
            CreateCarModificationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'CreateCarModification',
        'mutation'
      )
    },
    GetCarModificationsByModel(
      variables: GetCarModificationsByModelQueryVariables,
      requestHeaders?: GraphQLClientRequestHeaders
    ): Promise<GetCarModificationsByModelQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetCarModificationsByModelQuery>(
            GetCarModificationsByModelDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'GetCarModificationsByModel',
        'query'
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>

import { GraphQLDefinitionsFactory } from '@nestjs/graphql'
import { join } from 'path'

const definitionsFactory = new GraphQLDefinitionsFactory()
definitionsFactory.generate({
  typePaths: ['./app/models/graphQL/**/*.graphql'],
  path: join(process.cwd(), 'app/models/graphql.schema.ts'),
  outputAs: 'class',
})

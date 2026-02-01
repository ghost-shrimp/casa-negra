import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [], 
}: {
  query: string;
  params?: any;
  tags?: string[];
}) {
  return sanityClient.fetch<QueryResponse>(query, params, {
    next: {
      revalidate: 3600,
      tags,
    },
  });
}
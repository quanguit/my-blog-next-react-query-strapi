import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';

import { DEFAULT_PAGE, PAGE_SIZE } from '@/constants';
import {
  useArticlesQuery,
  useInfiniteArticlesQuery,
} from '@/generated/graphql';

import { Blogs } from './ui/blogs';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'This is Blog Page',
};

export default async function BlogsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: useInfiniteArticlesQuery.getKey({
      sort: ['views:desc'],
      pagination: {
        page: DEFAULT_PAGE,
        pageSize: PAGE_SIZE,
      },
    }),
    queryFn: ({ pageParam }) => useArticlesQuery.fetcher(pageParam)(),
    initialPageParam: {
      sort: ['views:desc'],
      pagination: {
        page: DEFAULT_PAGE,
        pageSize: PAGE_SIZE,
      },
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Blogs />
    </HydrationBoundary>
  );
}

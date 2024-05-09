import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';

const useInfiniteScroll = (api, movieId) => {
  const loader = useRef(null);

  const { data, fetchNextPage, hasNextPage, isLoading, isError, refetch } =
    useInfiniteQuery(
      ['infinityQuery', movieId],
      ({ pageParam = 0 }) => api(movieId, pageParam, 9),
      {
        getNextPageParam: (page, pages) => {
          const nextPage = pages.length;
          return nextPage <= pages[0].data.result.totalPageNum
            ? nextPage
            : undefined;
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false,
      }
    );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isLoading) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '10px',
        threshold: 0.1,
      }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isLoading, fetchNextPage]);

  return {
    data,
    isLoading,
    isError,
    loader,
    refetch,
  };
};

export default useInfiniteScroll;

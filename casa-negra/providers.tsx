"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, ReactNode } from "react";

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        staleTime: 1000 * 60 * 5,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient} >
            {children}
            < ReactQueryDevtools buttonPosition="bottom-right" initialIsOpen={false} />
        </QueryClientProvider>
    );
}
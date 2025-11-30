const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

async function appClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  if (!API_URL) {
    throw new Error('API_URL is not defined');
  }

  const { headers, ...customConfig } = options;

  const config: RequestInit = {
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (typeof window === 'undefined') {
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = cookies();
      const cookieHeader = cookieStore.toString();

      if (cookieHeader) {
        config.headers = {
          ...config.headers,
          Cookie: cookieHeader,
        } as Record<string, string>;
      }
    } catch (error) {
      // Ignore errors when not in a request context (e.g. static generation)
    }
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Something went wrong');
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export { appClient };

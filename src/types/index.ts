export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export type Params<T = unknown> = Promise<T>;

export type PageProps<T = unknown> = Readonly<{
  params: Params<T>;
  searchParams: SearchParams;
}>;

export type LayoutProps<T = unknown> = Readonly<
  { children: React.ReactNode } & T
>;

export type SVGAttributes = Partial<React.SVGProps<SVGSVGElement>>;

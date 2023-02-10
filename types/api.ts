export type InputType<T extends (...args: any[]) => any> = Parameters<T>[0]
export type OutputType<T extends (...args: any[]) => any> = Awaited<ReturnType<T>>

export type ErrorResponse = {
  name: string
  traceId: string
  message: string
  details: {
    field: string
    issue: string
    location: string
  }
}

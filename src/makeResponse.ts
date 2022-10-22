import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { MockResponse } from './types'

const copyData = (data?: any) =>
  data && typeof data !== 'string' ? JSON.parse(JSON.stringify(data)) : data
const arrayToObj = (mockRes: MockResponse) =>
  Array.isArray(mockRes) ? { status: mockRes[0], data: mockRes[1], headers: mockRes[2] } : mockRes

export default (mockRes: MockResponse, config: AxiosRequestConfig): AxiosResponse => {
  const { status, data, headers } = arrayToObj(mockRes)

  return {
    status,
    statusText: `${status}`,
    data: copyData(data),
    headers: headers || {},
    config
  }
}

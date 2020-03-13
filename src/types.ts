export type IUsers ={
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address?: {
    streetAddress: string
    city:string 
    state: string 
    zip: string
  }
  description?: string
}
export type NaviType ={ 
  theme: 'dark' | 'light' | string 
  setTheme?: any
}
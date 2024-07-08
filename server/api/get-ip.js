import { $fetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch('https://api.ipify.org?format=json')
    return { ip: response.ip }
  } catch (error) {
    console.error('Error fetching IP:', error)
    return { ip: 'unknown' }
  }
})
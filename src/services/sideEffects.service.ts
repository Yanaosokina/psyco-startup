import { SideEffectsRequest, SideEffectsResponse } from '@/types/sideEffects'
import { mockSideEffects } from '@/api/sideEffects.mock'

export const analyzeSideEffects = async (
  data: SideEffectsRequest
): Promise<SideEffectsResponse> => {
  // ⛔ пока без реального бэка
  return mockSideEffects()

  // ✅ потом будет так:
  // const res = await fetch('/api/side-effects', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // })
  // return res.json()
}

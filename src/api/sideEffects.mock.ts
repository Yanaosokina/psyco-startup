import { SideEffectsResponse } from "@/types/sideEffects";

export const mockSideEffects = (): Promise<SideEffectsResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        interactionLabel: "Взаимодействие лекарств",
        interaction: {
          contraindications: ["Совместный приём с ИМАО противопоказан"],
          risks: [
            "Повышение седативного эффекта",
            "Риск серотонинового синдрома",
          ],
          recommendations: [
            "Коррекция дозировки",
            "Наблюдение врача в первые 14 дней",
          ],
        },
        commonEffectsLabel:
          "Наиболее распространённые побочные эффекты психофармакотерапии",
        commonEffects: [
          "Сонливость",
          "Тошнота",
          "Головокружение",
          "Снижение концентрации внимания",
        ],
      });
    }, 1200);
  });

import { Chip } from "@mui/material";
import { InfoBlock } from "./InfoBlock";
import { SideEffectsResponse } from "@/types/sideEffects";

type Props = {
  data: SideEffectsResponse;
};

export function AnalysisResult({ data }: Props) {
  return (
    <>
      <InfoBlock
        title={data.interactionLabel}
        footer="*Генерируется ИИ на основе базы РСЛ"
      >
        <strong>Противопоказания</strong>
        <ul>
          {data.interaction.contraindications.map((i, idx) => (
            <li key={idx}>{i}</li>
          ))}
        </ul>

        <strong>Риски</strong>
        <ul>
          {data.interaction.risks.map((i, idx) => (
            <li key={idx}>{i}</li>
          ))}
        </ul>

        <strong>Рекомендации</strong>
        <ul>
          {data.interaction.recommendations.map((i, idx) => (
            <li key={idx}>{i}</li>
          ))}
        </ul>
      </InfoBlock>

      <InfoBlock
        title={data.commonEffectsLabel}
        footer="*Генерируется ИИ на основе базы SIDER"
      >
        <ul>
          {data.commonEffects.map((e, idx) => (
            <li key={idx}>{e}</li>
          ))}
        </ul>
      </InfoBlock>
    </>
  );
}

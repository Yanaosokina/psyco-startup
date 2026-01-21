export type SideEffectsRequest = {
  gender: string;
  age: string;
  diagnosis: string;
  somatic: string;
  medications: string[];
};

export type InteractionBlock = {
  contraindications: string[];
  risks: string[];
  recommendations: string[];
};

export type SideEffectsResponse = {
  interactionLabel: string;
  interaction: InteractionBlock;
  commonEffectsLabel: string;
  commonEffects: string[];
};

export type DiagnosisOption = {
  label: string;
  value: string;
};

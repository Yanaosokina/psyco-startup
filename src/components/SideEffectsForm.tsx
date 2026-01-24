import { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  InputLabel,
  Autocomplete,
  FormControl,
} from "@mui/material";

import { analyzeSideEffects } from "@/services/sideEffects.service";
import { DiagnosisOption, SideEffectsResponse } from "@/types/sideEffects";
import { AnalysisResult } from "./AnalysisResult";

const diagnosisOptions: DiagnosisOption[] = [
  { label: "Депрессия", value: "depression" },
  { label: "БАР", value: "bipolar" },
  { label: "Шизофрения", value: "schizophrenia" },
  { label: "Тревожное расстройство", value: "anxiety" },
];

export function SideEffectsForm() {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [somatic, setSomatic] = useState("");
  const [medications, setMedications] = useState<string[]>([""]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SideEffectsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addMedication = () => {
    setMedications((prev) => [...prev, ""]);
  };

  const updateMedication = (index: number, value: string) => {
    const copy = [...medications];
    copy[index] = value;
    setMedications(copy);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await analyzeSideEffects({
        gender,
        age,
        diagnosis,
        somatic,
        medications: medications.filter(Boolean),
      });

      setResult(response);
    } catch {
      setError("Не удалось выполнить анализ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        maxWidth={700}
        mx="auto"
        p={3}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <img src="/logo.png" alt="logo" width={48} height={48} />
          <Typography variant="h5" fontWeight={600}>
            Проверка побочных эффектов
          </Typography>
        </Box>

        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 5,
                "& fieldset": {
                  borderColor: "#49C2BB",
                },
                "&:hover fieldset": {
                  borderColor: "#49C2BB",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#49C2BB",
                },
              },
            }}
          >
            <InputLabel>Пол</InputLabel>
            <Select
              value={gender}
              label="Пол"
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="female">Женский</MenuItem>
              <MenuItem value="male">Мужской</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 5,
                "& fieldset": {
                  borderColor: "#49C2BB",
                },
                "&:hover fieldset": {
                  borderColor: "#49C2BB",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#49C2BB",
                },
              },
            }}
          >
            <InputLabel>Возраст</InputLabel>
            <Select
              value={age}
              label="Возраст"
              onChange={(e) => setAge(e.target.value)}
            >
              <MenuItem value="18-25">18–25</MenuItem>
              <MenuItem value="26-40">26–40</MenuItem>
              <MenuItem value="41-60">41–60</MenuItem>
              <MenuItem value="60+">60+</MenuItem>
            </Select>
          </FormControl>

          <FormControl
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 5,
                "& fieldset": {
                  borderColor: "#49C2BB",
                },
                "&:hover fieldset": {
                  borderColor: "#49C2BB",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#49C2BB",
                },
              },
            }}
          >
            <Autocomplete<DiagnosisOption, false, false, true>
              freeSolo
              options={diagnosisOptions}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.label
              }
              value={diagnosis}
              onChange={(_, value) =>
                setDiagnosis(
                  typeof value === "string" ? value : value?.label || "",
                )
              }
              onInputChange={(_, value) => setDiagnosis(value)}
              renderInput={(params) => (
                <TextField {...params} label="Диагноз" fullWidth />
              )}
            />
          </FormControl>
        </Box>

        <Box>
          <Typography mb={1}>Сопутствующие соматические патологии</Typography>
          <TextField
            fullWidth
            value={somatic}
            onChange={(e) => setSomatic(e.target.value)}
            placeholder="Например: гипертония, диабет"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 5,
                "& fieldset": {
                  borderColor: "#49C2BB",
                },
                "&:hover fieldset": {
                  borderColor: "#49C2BB",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#49C2BB",
                },
              },
            }}
          />
        </Box>

        <Box>
          <Typography mb={1}>Лекарственные препараты</Typography>

          {medications.map((med, i) => (
            <TextField
              key={i}
              fullWidth
              value={med}
              onChange={(e) => updateMedication(i, e.target.value)}
              placeholder="Введите препарат"
              sx={{
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 5,
                  "& fieldset": {
                    borderColor: "#49C2BB",
                  },
                  "&:hover fieldset": {
                    borderColor: "#49C2BB",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#49C2BB",
                  },
                },
              }}
            />
          ))}

          <Button
            onClick={addMedication}
            variant="outlined"
            size="small"
            sx={{
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#49C2BB",
              "&:hover": {
                borderColor: "#49C2BB",
              },
            }}
          >
            + Добавить ещё
          </Button>
        </Box>

        {error && <Typography color="error">{error}</Typography>}

        <Button
          size="large"
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          style={{ borderRadius: 20, background: "#49C2BB" }}
        >
          {loading ? "Анализ..." : "Оценить возможные побочные эффекты"}
        </Button>
      </Box>
      {result && (
        <Box mt={4}>
          <AnalysisResult data={result} />
        </Box>
      )}
    </>
  );
}

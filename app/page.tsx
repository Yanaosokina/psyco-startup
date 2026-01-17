"use client";

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

const options = [
  { label: "Депрессия", value: "depression" },
  { label: "БАР", value: "bipolar" },
  { label: "Шизофрения", value: "schizophrenia" },
  { label: "Тревожное расстройство", value: "anxiety" },
];

export default function Home() {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [somatic, setSomatic] = useState("");
  const [medications, setMedications] = useState<string[]>([""]);

  const addMedication = () => {
    setMedications((prev) => [...prev, ""]);
  };

  const updateMedication = (i: number, value: string) => {
    const copy = [...medications];
    copy[i] = value;
    setMedications(copy);
  };

  return (
    <Box
      maxWidth={700}
      mx="auto"
      p={3}
      display="flex"
      flexDirection="column"
      gap={3}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" gap={2}>
        <img src="/logo.png" alt="logo" width={48} height={48} />
        <Typography variant="h5" fontWeight={600}>
          Проверка побочных эффектов
        </Typography>
      </Box>

      {/* Row 1 */}
      <Box display="flex" gap={2} flexWrap="wrap">
        <FormControl fullWidth>
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

        <FormControl fullWidth>
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

        <FormControl fullWidth>
          <Autocomplete
            freeSolo
            options={options}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.label
            }
            value={diagnosis}
            onChange={(_, newValue) => {
              if (typeof newValue === "string") {
                setDiagnosis(newValue);
              } else if (newValue) {
                setDiagnosis(newValue.label);
              }
            }}
            onInputChange={(_, newInputValue) => {
              setDiagnosis(newInputValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Диагноз" fullWidth />
            )}
          />
        </FormControl>
      </Box>

      {/* Row 2 */}
      <Box>
        <Typography mb={1}>Сопутствующие соматические патологии</Typography>
        <TextField
          fullWidth
          value={somatic}
          onChange={(e) => setSomatic(e.target.value)}
          placeholder="Например: гипертония, диабет"
        />
      </Box>

      {/* Row 3 */}
      <Box>
        <Typography mb={1}>Лекарственные препараты</Typography>

        {medications.map((med, i) => (
          <TextField
            key={i}
            fullWidth
            value={med}
            onChange={(e) => updateMedication(i, e.target.value)}
            placeholder="Введите препарат"
            sx={{ mb: 1 }}
          />
        ))}

        <Button onClick={addMedication} variant="outlined">
          + Добавить ещё
        </Button>
      </Box>

      {/* Submit */}
      <Button size="large" variant="contained">
        Оценить возможные побочные эффекты
      </Button>
    </Box>
  );
}

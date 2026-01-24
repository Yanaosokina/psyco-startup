import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  title: string;
  footer: string;
  children: ReactNode;
};

export function InfoBlock({ title, footer, children }: Props) {
  return (
    <Box bgcolor="#e1fbfa" border="1px solid #49C2BB" borderRadius={5} p={2} m={4} >
      <Typography fontWeight={600} mb={1} >
        {title}
      </Typography>

      {children}

      <Typography mt={2} fontSize={12} color="text.secondary">
        {footer}
      </Typography>
    </Box>
  );
}

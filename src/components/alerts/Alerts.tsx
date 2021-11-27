import { Dialog } from "@material-ui/core";
import { Alert, AlertTitle, Collapse } from "@mui/material";
import React from "react";

interface Props {
  showError: boolean;
  setShowError(show: boolean): void;
  errorText: string;
}

export default function Alerts({ showError, setShowError, errorText }: Props) {
  return (
    <div>
      <Dialog
        open={showError}
        onClose={() => {
          setShowError(false);
        }}
      >
        <Collapse in={showError}>
          <Alert
            severity="error"
            onClose={() => {
              setShowError(false);
            }}
          >
            <AlertTitle>Error</AlertTitle>
            {errorText}
          </Alert>
        </Collapse>
      </Dialog>
    </div>
  );
}

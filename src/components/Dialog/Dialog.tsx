import { ReactNode } from "react";
import { Dialog as MuiDialog, DialogContent as MuiDialogContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Dialog.scss";

export const Dialog = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  return (
    <MuiDialog open onClose={() => navigate("/")} className="dialog">
      <MuiDialogContent>{children}</MuiDialogContent>
    </MuiDialog>
  );
};
